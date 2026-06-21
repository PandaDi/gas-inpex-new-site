"""
Миксин для автоматического сжатия изображений при загрузке через админку.
"""

from django.db import models

from utils.image_processor import optimize_image, COMPRESSION_QUALITY_MAP, MAX_WIDTH_MAP


COMPRESSION_CHOICES = [
    ('high', 'Высокое (90%, макс. качество)'),
    ('medium', 'Среднее (70%, оптимально)'),
    ('low', 'Низкое (50%, макс. сжатие)'),
]


class CompressedImageMixin(models.Model):
    """
    Добавляет поле compression и автоматическую оптимизацию изображений.
    При сохранении модели все ImageField проверяются на изменения
    и автоматически сжимаются.
    Использование:
        class MyModel(CompressedImageMixin):
            image = models.ImageField(...)
            # поле compression добавится автоматически
    """

    compression = models.CharField(
        'Сжатие',
        max_length=10,
        choices=COMPRESSION_CHOICES,
        default='high',
        help_text='Высокое — макс. качество для слайдера. Среднее — оптимально для general. Низкое — макс. экономия места.',
    )

    class Meta:
        abstract = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Запоминаем оригинальные имена файлов изображений для отслеживания изменений
        self._original_image_names = {}
        for field in self._meta.fields:
            if isinstance(field, models.ImageField):
                f = getattr(self, field.name)
                self._original_image_names[field.name] = f.name if f else None

    def save(self, *args, **kwargs):
        quality = COMPRESSION_QUALITY_MAP.get(self.compression, 85)

        # Определяем max_width по типу контента
        max_width = MAX_WIDTH_MAP['general']
        if hasattr(self, '_meta'):
            model_name = self._meta.model_name
            if model_name in ('heroslide',):
                max_width = MAX_WIDTH_MAP['slider']

        # Обрабатываем все ImageField модели
        for field in self._meta.fields:
            if not isinstance(field, models.ImageField):
                continue

            current_file = getattr(self, field.name)
            if not current_file:
                continue

            # Определяем, изменился ли файл (новый или заменён)
            old_name = self._original_image_names.get(field.name)
            new_name = current_file.name

            # Если файл не менялся — пропускаем
            if old_name and new_name == old_name:
                continue

            # Проверяем, что файл действительно новый (а не загружен из fixtures)
            if hasattr(current_file, 'file') and hasattr(current_file.file, 'size'):
                if current_file.file.size == 0:
                    continue

            try:
                optimized = optimize_image(
                    current_file,
                    quality=quality,
                    max_width=max_width,
                    keep_format=False  # всегда конвертируем в WebP
                )
                setattr(self, field.name, optimized)
            except Exception as e:
                # Если оптимизация не удалась — сохраняем как есть
                import logging
                logger = logging.getLogger(__name__)
                logger.warning(f'Image optimization failed for {field.name}: {e}')

        super().save(*args, **kwargs)