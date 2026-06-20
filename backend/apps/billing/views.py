"""
ViewSet биллинга — RetrieveAPIView для получения счёта по номеру.
"""

from rest_framework import generics
from .models import BillingAccount
from .serializers import BillingAccountSerializer


class BillingAccountDetailView(generics.RetrieveAPIView):
    """
    Получение данных лицевого счёта по номеру (account_number).
    Доступно без авторизации.
    """
    queryset = BillingAccount.objects.all()
    serializer_class = BillingAccountSerializer
    lookup_field = 'account_number'
    lookup_url_kwarg = 'account_number'