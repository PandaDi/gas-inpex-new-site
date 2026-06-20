"""
Админ-панель биллинга — только чтение.
"""

from django.contrib import admin
from config.admin import gas_inpex_admin_site
from .models import BillingAccount


class BillingAccountAdmin(admin.ModelAdmin):
    list_display = ('account_number', 'full_name', 'address', 'balance', 'is_active', 'created_at')
    search_fields = ('account_number', 'full_name', 'address')
    list_filter = ('is_active',)
    readonly_fields = ('account_number', 'full_name', 'address', 'balance', 'is_active', 'created_at', 'updated_at')

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return True  # можно смотреть, но поля только для чтения


gas_inpex_admin_site.register(BillingAccount, BillingAccountAdmin)