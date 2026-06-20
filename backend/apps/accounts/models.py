"""
Расширенная модель пользователя для Gas Inpex.
"""

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Кастомная модель пользователя с дополнительными полями."""

    phone = models.CharField('Телефон', max_length=50, blank=True)
    position = models.CharField('Должность', max_length=255, blank=True)
    department = models.CharField('Отдел', max_length=255, blank=True)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return self.get_full_name() or self.username