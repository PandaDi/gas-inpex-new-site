"""
Админ-панель для приложения Pages.
"""

from django.contrib import admin
from django.utils.html import format_html
from config.admin import gas_inpex_admin_site
from .models import Service, Project, Partner, Certificate, HeroSlide


class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_active', 'image_preview', 'created_at')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'short_description')
    list_filter = ('is_active',)
    readonly_fields = ('image_preview', 'created_at', 'updated_at')
    fieldsets = (
        ('Основное', {
            'fields': ('title', 'slug', 'icon', 'compression', 'order', 'is_active')
        }),
        ('Описание', {
            'fields': ('short_description', 'full_description')
        }),
        ('Изображение', {
            'fields': ('image', 'image_preview')
        }),
        ('Служебное', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 50px; border-radius: 4px;" />',
                obj.image.url
            )
        return '—'
    image_preview.short_description = 'Превью'


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'location', 'year', 'image_preview', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'client', 'location')
    list_filter = ('is_active', 'year')
    readonly_fields = ('image_preview', 'created_at', 'updated_at')
    fieldsets = (
        ('Основное', {
            'fields': ('title', 'slug', 'client', 'location', 'year', 'compression', 'order', 'is_active')
        }),
        ('Описание', {
            'fields': ('short_description', 'full_description')
        }),
        ('Изображение', {
            'fields': ('image', 'image_preview')
        }),
        ('Служебное', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 50px; border-radius: 4px;" />',
                obj.image.url
            )
        return '—'
    image_preview.short_description = 'Превью'


class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'logo_preview', 'website', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('name', 'description')
    readonly_fields = ('logo_preview', 'created_at')
    fieldsets = (
        ('Основное', {
            'fields': ('name', 'website', 'compression', 'description', 'order', 'is_active')
        }),
        ('Логотип', {
            'fields': ('logo', 'logo_preview')
        }),
        ('Служебное', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

    def logo_preview(self, obj):
        if obj.logo:
            return format_html(
                '<img src="{}" style="max-height: 50px; border-radius: 4px;" />',
                obj.logo.url
            )
        return '—'
    logo_preview.short_description = 'Превью'


class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'image_preview', 'issue_date', 'expiry_date', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title', 'issued_by')
    readonly_fields = ('image_preview', 'created_at')
    fieldsets = (
        ('Основное', {
            'fields': ('title', 'issued_by', 'compression', 'issue_date', 'expiry_date', 'order', 'is_active')
        }),
        ('Файл', {
            'fields': ('file',)
        }),
        ('Изображение', {
            'fields': ('image', 'image_preview')
        }),
        ('Служебное', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 50px; border-radius: 4px;" />',
                obj.image.url
            )
        return '—'
    image_preview.short_description = 'Превью'


class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'image_preview', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title', 'subtitle', 'description')
    readonly_fields = ('image_preview', 'created_at')
    fieldsets = (
        ('Основное', {
            'fields': ('title', 'subtitle', 'description', 'compression', 'order', 'is_active')
        }),
        ('Кнопка', {
            'fields': ('button_text', 'button_url')
        }),
        ('Фоновое изображение', {
            'fields': ('image', 'image_preview')
        }),
        ('Служебное', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 50px; border-radius: 4px;" />',
                obj.image.url
            )
        return '—'
    image_preview.short_description = 'Превью'


gas_inpex_admin_site.register(Service, ServiceAdmin)
gas_inpex_admin_site.register(Project, ProjectAdmin)
gas_inpex_admin_site.register(Partner, PartnerAdmin)
gas_inpex_admin_site.register(Certificate, CertificateAdmin)
gas_inpex_admin_site.register(HeroSlide, HeroSlideAdmin)