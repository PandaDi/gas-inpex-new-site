"""
Утилита для оптимизации и сжатия изображений.
Конвертирует загруженные картинки в WebP с настраиваемым качеством.
"""

from io import BytesIO
import os
import hashlib

from PIL import Image
from django.core.files.base import ContentFile


COMPRESSION_QUALITY_MAP = {
    'high': 90,
    'medium': 70,
    'low': 50,
}

MAX_WIDTH_MAP = {
    'slider': 1920,
    'general': 1200,
    'thumb': 400,
}


def optimize_image(image_file, quality=85, max_width=1920, keep_format=False):
    """
    Оптимизирует изображение:
      - конвертирует в WebP (если keep_format=False)
      - ресайзит до max_width по ширине
      - сжимает до указанного quality
    Возвращает ContentFile для сохранения в Django ImageField.
    """
    img = Image.open(image_file)

    # Определяем исходный формат для сохранения прозрачности
    original_format = img.format or 'JPEG'

    # Конвертируем в RGB если нужно
    if img.mode in ('RGBA', 'P'):
        if keep_format:
            img = img.convert('RGBA')
        else:
            # WebP не поддерживает P, конвертируем
            img = img.convert('RGBA')

    if img.mode == 'RGBA' and not keep_format:
        # Оставляем как есть (WebP поддерживает альфа-канал)
        pass
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    # Ресайз если ширина больше max_width
    if img.width > max_width:
        ratio = max_width / img.width
        new_height = int(img.height * ratio)
        img = img.resize((max_width, new_height), Image.LANCZOS)

    # Сохраняем в буфер
    buffer = BytesIO()

    if keep_format:
        # Сохраняем в оригинальном формате с сжатием
        save_format = original_format
        if save_format.upper() == 'JPEG':
            img = img.convert('RGB')
            img.save(buffer, format='JPEG', quality=quality, optimize=True)
        elif save_format.upper() == 'PNG':
            img.save(buffer, format='PNG', optimize=True)
        else:
            img.save(buffer, format=save_format, quality=quality, optimize=True)
        ext = os.path.splitext(image_file.name)[1]
    else:
        # Конвертируем в WebP
        save_format = 'WEBP'
        if img.mode == 'RGBA':
            img.save(buffer, format='WEBP', quality=quality, optimize=True, lossless=False)
        else:
            img = img.convert('RGB')
            img.save(buffer, format='WEBP', quality=quality, optimize=True)
        ext = '.webp'

    # Генерируем имя файла
    base_name = os.path.splitext(os.path.basename(image_file.name))[0]
    # Удаляем мусорные суффиксы Django (типа _fPy4PIq_DR3Wp16_AjTPlIk)
    import re
    base_name = re.sub(r'_[A-Za-z0-9]{5,}(_[A-Za-z0-9]{5,})*$', '', base_name)
    # Очищаем от спецсимволов
    clean_name = ''.join(c if c.isalnum() or c in '._-' else '_' for c in base_name)
    filename = f'{clean_name}{ext}'

    return ContentFile(buffer.getvalue(), name=filename)


def get_image_hash(image_file):
    """Вычисляет MD5 хеш содержимого файла изображения."""
    if hasattr(image_file, 'read'):
        image_file.seek(0)
        data = image_file.read()
        image_file.seek(0)
    else:
        with open(image_file.path, 'rb') as f:
            data = f.read()
    return hashlib.md5(data).hexdigest()