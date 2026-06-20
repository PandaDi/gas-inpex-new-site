"""
URL-маршруты биллинга.
"""

from django.urls import path
from .views import BillingAccountDetailView

urlpatterns = [
    path('accounts/<str:account_number>/', BillingAccountDetailView.as_view(), name='billing-account-detail'),
]