"""
Кастомная админ-панель Gas Inpex.
"""

from django.contrib import admin


class GasInpexAdminSite(admin.AdminSite):
    """Кастомный AdminSite с брендингом Gas Inpex."""

    site_title = 'Gas Inpex — Администрирование'
    site_header = 'Gas Inpex'
    index_title = 'Панель управления сайтом Gas Inpex'


gas_inpex_admin_site = GasInpexAdminSite(name='gas_inpex_admin')