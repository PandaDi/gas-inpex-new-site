"""
URL-маршруты для API приложения Pages.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, ProjectViewSet, PartnerViewSet, CertificateViewSet, HeroSlideViewSet

router = DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'partners', PartnerViewSet)
router.register(r'certificates', CertificateViewSet)
router.register(r'hero-slides', HeroSlideViewSet)

urlpatterns = [
    path('', include(router.urls)),
]