"""
ViewSets для API приложения Pages — только чтение (ReadOnly).
"""

from rest_framework import viewsets
from .models import Service, Project, Partner, Certificate, HeroSlide
from .serializers import (
    ServiceSerializer, ProjectSerializer,
    PartnerSerializer, CertificateSerializer,
    HeroSlideSerializer
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


class HeroSlideViewSet(viewsets.ReadOnlyModelViewSet):
    """Просмотр слайдов главного баннера."""
    queryset = HeroSlide.objects.filter(is_active=True)
    serializer_class = HeroSlideSerializer