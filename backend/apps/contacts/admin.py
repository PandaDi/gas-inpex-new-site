"""
Админ-панель заявок с action для смены статуса.
"""

from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from config.admin import gas_inpex_admin_site
from .models import ContactRequest


@admin.action(description='Отметить как "В работе"')
def mark_in_progress(modeladmin, request, queryset):
    queryset.update(status='in_progress')


@admin.action(description='Отметить как "Завершена"')
def mark_completed(modeladmin, request, queryset):
    queryset.update(status='completed')


@admin.action(description='Отметить как "Новая"')
def mark_new(modeladmin, request, queryset):
    queryset.update(status='new')


class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'account_number', 'address', 'status', 'created_at')
    list_editable = ('status',)
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'phone', 'email', 'account_number', 'address', 'message')
    readonly_fields = ('created_at', 'updated_at')
    actions = [mark_new, mark_in_progress, mark_completed]


gas_inpex_admin_site.register(ContactRequest, ContactRequestAdmin)