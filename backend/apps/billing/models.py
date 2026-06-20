"""
Модели биллинга — BillingAccount с уникальным номером счёта.
"""

from django.db import models


class BillingAccount(models.Model):
    """Модель лицевого счёта абонента Gas Inpex."""

    account_number = models.CharField(
        'Номер лицевого счёта',
        max_length=50,
        unique=True,
        db_index=True
    )
    full_name = models.CharField('ФИО', max_length=255)
    address = models.TextField('Адрес')
    balance = models.DecimalField(
        'Баланс',
        max_digits=12,
        decimal_places=2,
        default=0.00
    )
    is_active = models.BooleanField('Активен', default=True)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)

    class Meta:
        verbose_name = 'Лицевой счёт'
        verbose_name_plural = 'Лицевые счета'
        ordering = ['account_number']

    def __str__(self):
        return f'Счёт №{self.account_number} — {self.full_name}'