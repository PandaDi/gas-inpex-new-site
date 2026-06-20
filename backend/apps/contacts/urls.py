"""
URL-маршруты заявок.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactRequestViewSet

router = DefaultRouter()
router.register(r'requests', ContactRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]