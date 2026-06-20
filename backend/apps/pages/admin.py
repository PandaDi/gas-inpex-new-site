"""
Админ-панель для приложения Pages.
"""

from django.contrib import admin
from config.admin import gas_inpex_admin_site
from .models import Service, Project, Partner, Certificate, HeroSlide


class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_active', 'created_at')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title',)
    list_filter = ('is_active',)


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'year', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'client')
    list_filter = ('is_active', 'year')


class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('name',)


class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'issue_date', 'expiry_date', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title', 'issued_by')


class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title',)


gas_inpex_admin_site.register(Service, ServiceAdmin)
gas_inpex_admin_site.register(Project, ProjectAdmin)
gas_inpex_admin_site.register(Partner, PartnerAdmin)
gas_inpex_admin_site.register(Certificate, CertificateAdmin)
gas_inpex_admin_site.register(HeroSlide, HeroSlideAdmin)