"""
Сериализаторы заявок.
"""

from rest_framework import serializers
from .models import ContactRequest


class ContactRequestSerializer(serializers.ModelSerializer):
    """Сериализатор заявок. POST — только основные поля, GET — все."""

    class Meta:
        model = ContactRequest
        fields = '__all__'
        read_only_fields = ('status', 'created_at', 'updated_at')

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')
        if request and request.method == 'GET':
            # GET возвращает все поля
            return fields
        # POST — только поля для заполнения клиентом
        fields.pop('status', None)
        fields.pop('created_at', None)
        fields.pop('updated_at', None)
        return fields