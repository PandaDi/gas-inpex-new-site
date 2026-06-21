"""
Модели каталога продукции Gas Inpex.
"""

from django.db import models
from django.utils.text import slugify
from utils.models import CompressedImageMixin


class Category(CompressedImageMixin, models.Model):
    """Модель категории продукции."""
    name = models.CharField('Название', max_length=255)
    slug = models.SlugField('Slug', max_length=255, unique=True, blank=True)
    description = models.TextField('Описание', blank=True)
    image = models.ImageField('Изображение', upload_to='categories/', blank=True, null=True)
    order = models.PositiveIntegerField('Порядок', default=0)
    is_active = models.BooleanField('Активно', default=True)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(CompressedImageMixin, models.Model):
    """Модель продукции/товара."""
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE,
        related_name='products',
        verbose_name='Категория'
    )
    name = models.CharField('Название', max_length=255)
    slug = models.SlugField('Slug', max_length=255, unique=True, blank=True)
    description = models.TextField('Описание', blank=True)
    characteristics = models.TextField('Характеристики', blank=True)
    image = models.ImageField('Изображение', upload_to='products/', blank=True, null=True)
    price = models.DecimalField('Цена', max_digits=12, decimal_places=2, null=True, blank=True)
    is_active = models.BooleanField('Активно', default=True)
    order = models.PositiveIntegerField('Порядок', default=0)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)

    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)