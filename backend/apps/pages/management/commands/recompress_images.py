"""
Management command для пережатия всех изображений в проекте.
Запуск: python manage.py recompress_images
         python manage.py recompress_images --compression medium
         python manage.py recompress_images --dry-run
"""

from django.core.management.base import BaseCommand
from django.core.files.storage import default_storage as storage
from pages.models import Service, Project, Partner, Certificate, HeroSlide
from catalog.models import Category, Product
from utils.image_processor import optimize_image, COMPRESSION_QUALITY_MAP
import os


# Все модели с картинками и их ImageField
MODELS_WITH_IMAGES = [
    (HeroSlide, ['image']),
    (Service, ['image']),
    (Project, ['image']),
    (Partner, ['logo']),
    (Certificate, ['image', 'file']),
    (Category, ['image']),
    (Product, ['image']),
]


class Command(BaseCommand):
    help = 'Пережимает все изображения в проекте с указанным качеством'

    def add_arguments(self, parser):
        parser.add_argument(
            '--compression',
            type=str,
            choices=['high', 'medium', 'low'],
            default=None,
            help='Принудительное качество для всех картинок'
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            default=False,
            help='Показать что будет сделано, без изменений'
        )
        parser.add_argument(
            '--model',
            type=str,
            default=None,
            help='Только одна модель'
        )

    def handle(self, *args, **options):
        force_compression = options.get('compression')
        dry_run = options.get('dry_run')
        only_model = options.get('model')

        total_processed = 0
        total_errors = 0
        total_skipped = 0

        for model_class, image_fields in MODELS_WITH_IMAGES:
            model_name = model_class._meta.model_name

            if only_model and model_name.lower() != only_model.lower():
                continue

            qs = model_class.objects.all()
            total = qs.count()
            self.stdout.write(f'\n--- {model_class._meta.verbose_name_plural} ({total} шт.) ---')

            for obj in qs:
                compression = force_compression or getattr(obj, 'compression', 'high')
                quality = COMPRESSION_QUALITY_MAP.get(compression, 85)

                for field_name in image_fields:
                    field = getattr(obj, field_name)
                    if not field:
                        continue

                    # Пропускаем PDF-файлы в сертификатах
                    if field_name == 'file' and model_name == 'certificate':
                        if not field.name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif')):
                            total_skipped += 1
                            continue

                    old_size = None

                    try:
                        old_size = field.size

                        if dry_run:
                            self.stdout.write(
                                f'  [DRY-RUN] {field.name}: compression={compression}, '
                                f'quality={quality}% ({old_size // 1024}Kb)'
                            )
                            continue

                        # Оптимизируем
                        optimized = optimize_image(
                            field,
                            quality=quality,
                            max_width=1920 if model_name == 'heroslide' else 1200,
                            keep_format=False
                        )

                        # Получаем upload_to из поля модели
                        upload_path = obj._meta.get_field(field_name).upload_to
                        if callable(upload_path):
                            upload_to = upload_path(obj, optimized.name)
                        else:
                            upload_to = (upload_path or '').rstrip('/')

                        clean_name = os.path.basename(optimized.name)
                        storage_path = f'{upload_to}/{clean_name}' if upload_to else clean_name

                        # Удаляем старый файл
                        old_path = field.name
                        if old_path and storage.exists(old_path) and old_path != storage_path:
                            storage.delete(old_path)

                        # Сохраняем новый (перезаписывает если уже есть)
                        storage.save(storage_path, optimized)

                        # Обновляем БД напрямую — без мусорных суффиксов
                        type(obj).objects.filter(pk=obj.pk).update(**{field_name: storage_path})

                        new_size = optimized.size
                        saved = old_size - new_size if old_size else 0
                        pct = (1 - new_size / old_size) * 100 if old_size else 0

                        self.stdout.write(
                            f'  \u2713 {storage_path}: {old_size // 1024}Kb \u2192 {new_size // 1024}Kb '
                            f'({pct:.0f}% сжато, {saved // 1024}Kb сохранено)'
                        )
                        total_processed += 1

                    except Exception as e:
                        self.stdout.write(self.style.ERROR(
                            f'  \u2717 {field.name}: ОШИБКА — {e}'
                        ))
                        total_errors += 1

        # Итог
        self.stdout.write('\n' + '=' * 50)
        if dry_run:
            self.stdout.write(self.style.WARNING(
                f'DRY-RUN: {total_processed} файлов будет обработано, {total_skipped} пропущено'
            ))
        else:
            self.stdout.write(self.style.SUCCESS(
                f'Готово: {total_processed} сжато, {total_errors} ошибок, {total_skipped} пропущено'
            ))