# Gas Inpex — Новый сайт (Django + Next.js)

## Стек

- **Бэкенд:** Django 5 + Django REST Framework
- **Фронтенд:** Next.js 16 (React, TypeScript, Tailwind CSS)
- **БД:** PostgreSQL 16
- **Инфраструктура:** Docker, Nginx

## Быстрый старт (dev)

```bash
# 1. Клонировать и войти
cd ~/projects/gas-inpex/new-site

# 2. Настроить .env (скопировать из примера)
cp .env.example .env
# Отредактировать DB_PASSWORD, DJANGO_SECRET_KEY

# 3. Запустить Docker Compose
docker compose up -d

# 4. Выполнить миграции
docker compose exec backend python manage.py migrate

# 5. Создать суперпользователя
docker compose exec backend python manage.py createsuperuser

# 6. Открыть в браузере
# Фронтенд: http://localhost:3000
# Админка:  http://localhost:8000/admin/
# API:      http://localhost:8000/api/
```

## Структура проекта

```
new-site/
├── backend/          # Django (API + админка)
├── frontend/         # Next.js (SSR)
├── docker/           # Nginx, PostgreSQL
├── docker-compose.yml
├── .env
└── MIGRATION_PLAN.md # Полный план миграции
```

## Важно

Старый сайт продолжает работать на https://gas-inpex.kz/  
Новый сайт запускается локально, деплой — только после полного утверждения.
