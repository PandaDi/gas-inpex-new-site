"""
ViewSets заявок — создание без авторизации, просмотр из админки.
"""

from rest_framework import viewsets, permissions
from .models import ContactRequest
from .serializers import ContactRequestSerializer


class ContactRequestViewSet(viewsets.ModelViewSet):
    """
    ViewSet для заявок.
    - Создание (POST) — доступно без авторизации.
    - Просмотр/редактирование — только для авторизованных пользователей.
    """
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    filterset_fields = ('status',)

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [p() for p in permission_classes]