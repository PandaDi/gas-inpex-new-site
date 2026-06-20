"""
ViewSets для API приложения Pages — только чтение (ReadOnly).
"""

from rest_framework import viewsets
from .models import Service, Project, Partner, Certificate
from .serializers import (
    ServiceSerializer, ProjectSerializer,
    PartnerSerializer, CertificateSerializer
)


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """Просмотр услуг."""
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    lookup_field = 'slug'


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """Просмотр проектов."""
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer
    lookup_field = 'slug'


class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    """Просмотр партнёров."""
    queryset = Partner.objects.filter(is_active=True)
    serializer_class = PartnerSerializer


class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    """Просмотр сертификатов."""
    queryset = Certificate.objects.filter(is_active=True)
    serializer_class = CertificateSerializer