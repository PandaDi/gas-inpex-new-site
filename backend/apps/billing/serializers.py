"""
Сериализаторы для API биллинга.
"""

from rest_framework import serializers
from .models import BillingAccount


class BillingAccountSerializer(serializers.ModelSerializer):
    """Сериализатор лицевого счёта (только чтение)."""

    class Meta:
        model = BillingAccount
        fields = ('account_number', 'full_name', 'address', 'balance', 'is_active', 'created_at', 'updated_at')
        read_only_fields = fields