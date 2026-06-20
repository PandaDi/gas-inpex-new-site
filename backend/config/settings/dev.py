"""
Настройки для разработки (development) — SQLite для локальной разработки.
"""

from .base import *  # noqa: F401, F403

DEBUG = True

# SQLite для разработки (не требует PostgreSQL)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Разрешённые хосты для разработки
ALLOWED_HOSTS = ['*']

# Отключаем HTTPS-only для dev
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
SECURE_SSL_REDIRECT = False