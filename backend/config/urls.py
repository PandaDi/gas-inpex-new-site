"""
Главный URL-конфиг проекта Gas Inpex.
"""

from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from config.admin import gas_inpex_admin_site

urlpatterns = [
    path('admin/', gas_inpex_admin_site.urls),
    path('api/', include('pages.urls')),
    path('api/catalog/', include('catalog.urls')),
    path('api/contacts/', include('contacts.urls')),
    path('api/billing/', include('billing.urls')),
]

# Раздача медиа-файлов в режиме разработки
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)