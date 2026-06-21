"""
Админ-панель каталога.
"""

from django.contrib import admin
from django.utils.html import format_html
from config.admin import gas_inpex_admin_site
from .models import Category, Product


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_preview', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')
    readonly_fields = ('image_preview', 'created_at')
    fieldsets = (
        ('Основное', {
            'fields': ('name', 'slug', 'description', 'order', 'is_active')
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


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'image_preview', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description', 'characteristics')
    list_filter = ('category', 'is_active')
    readonly_fields = ('image_preview', 'created_at', 'updated_at')
    fieldsets = (
        ('Основное', {
            'fields': ('category', 'name', 'slug', 'price', 'order', 'is_active')
        }),
        ('Описание', {
            'fields': ('description', 'characteristics')
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


gas_inpex_admin_site.register(Category, CategoryAdmin)
gas_inpex_admin_site.register(Product, ProductAdmin)