"""
Админ-панель каталога.
"""

from django.contrib import admin
from config.admin import gas_inpex_admin_site
from .models import Category, Product


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)
    list_filter = ('category', 'is_active')


gas_inpex_admin_site.register(Category, CategoryAdmin)
gas_inpex_admin_site.register(Product, ProductAdmin)