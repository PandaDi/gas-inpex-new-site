"""
Модели приложения Pages — контентные страницы сайта Gas Inpex.
"""

from django.db import models
from django.utils.text import slugify


class Service(models.Model):
    """Модель услуги компании."""
    title = models.CharField('Название', max_length=255)
    slug = models.SlugField('Slug', max_length=255, unique=True, blank=True)
    short_description = models.TextField('Краткое описание', blank=True)
    full_description = models.TextField('Полное описание', blank=True)
    icon = models.CharField('Иконка (CSS-класс)', max_length=100, blank=True)
    image = models.ImageField('Изображение', upload_to='services/', blank=True, null=True)
    order = models.PositiveIntegerField('Порядок', default=0)
    is_active = models.BooleanField('Активно', default=True)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'
        ordering = ['order', 'title']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Project(models.Model):
    """Модель реализованного проекта."""
    title = models.CharField('Название', max_length=255)
    slug = models.SlugField('Slug', max_length=255, unique=True, blank=True)
    short_description = models.TextField('Краткое описание', blank=True)
    full_description = models.TextField('Полное описание', blank=True)
    client = models.CharField('Заказчик', max_length=255, blank=True)
    location = models.CharField('Местоположение', max_length=255, blank=True)
    year = models.PositiveIntegerField('Год реализации', null=True, blank=True)
    image = models.ImageField('Изображение', upload_to='projects/', blank=True, null=True)
    order = models.PositiveIntegerField('Порядок', default=0)
    is_active = models.BooleanField('Активно', default=True)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'
        ordering = ['order', '-year']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Partner(models.Model):
    """Модель партнёра компании."""
    name = models.CharField('Название', max_length=255)
    logo = models.ImageField('Логотип', upload_to='partners/', blank=True, null=True)
    website = models.URLField('Веб-сайт', blank=True)
    description = models.TextField('Описание', blank=True)
    order = models.PositiveIntegerField('Порядок', default=0)
    is_active = models.BooleanField('Активно', default=True)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)

    class Meta:
        verbose_name = 'Партнёр'
        verbose_name_plural = 'Партнёры'
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Certificate(models.Model):
    """Модель сертификата/лицензии компании."""
    title = models.CharField('Название', max_length=255)
    file = models.FileField('Файл', upload_to='certificates/', blank=True, null=True)
    image = models.ImageField('Изображение', upload_to='certificates/', blank=True, null=True)
    issue_date = models.DateField('Дата выдачи', null=True, blank=True)
    expiry_date = models.DateField('Срок действия', null=True, blank=True)
    issued_by = models.CharField('Кем выдан', max_length=255, blank=True)
    order = models.PositiveIntegerField('Порядок', default=0)
    is_active = models.BooleanField('Активно', default=True)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)

    class Meta:
        verbose_name = 'Сертификат'
        verbose_name_plural = 'Сертификаты'
        ordering = ['order', '-issue_date']

    def __str__(self):
        return self.title


class HeroSlide(models.Model):
    """Модель слайда для главного баннера (Hero Section)."""
    title = models.CharField('Заголовок', max_length=255)
    subtitle = models.CharField('Подзаголовок', max_length=500, blank=True)
    description = models.TextField('Описание', blank=True)
    image = models.ImageField('Фоновое изображение', upload_to='hero/', blank=True, null=True)
    button_text = models.CharField('Текст кнопки', max_length=100, blank=True)
    button_url = models.CharField('Ссылка кнопки', max_length=500, blank=True)
    order = models.PositiveIntegerField('Порядок', default=0)
    is_active = models.BooleanField('Активно', default=True)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)

    class Meta:
        verbose_name = 'Слайд главного баннера'
        verbose_name_plural = 'Слайды главного баннера'
        ordering = ['order']

    def __str__(self):
        return self.title