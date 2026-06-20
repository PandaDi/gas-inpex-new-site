"""
Модели заявок — ContactRequest с тремя статусами.
"""

from django.db import models


class ContactRequest(models.Model):
    """Модель заявки от клиента."""

    STATUS_CHOICES = [
        ('new', 'Новая'),
        ('in_progress', 'В работе'),
        ('completed', 'Завершена'),
    ]

    name = models.CharField('Имя', max_length=255)
    phone = models.CharField('Телефон', max_length=50, blank=True)
    email = models.EmailField('Email', blank=True)
    account_number = models.CharField('Номер лицевого счёта', max_length=100, blank=True)
    address = models.TextField('Адрес', blank=True)
    message = models.TextField('Сообщение')
    status = models.CharField(
        'Статус',
        max_length=20,
        choices=STATUS_CHOICES,
        default='new'
    )
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        ordering = ['-created_at']

    def __str__(self):
        return f'Заявка #{self.pk} — {self.name}'