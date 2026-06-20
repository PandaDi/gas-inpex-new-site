#!/bin/bash
set -e

# Ждём, пока база данных станет доступна
echo "Ожидание базы данных..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done
echo "База данных готова."

# Применяем миграции
echo "Применение миграций..."
python manage.py migrate --noinput

# Собираем статику
echo "Сбор статических файлов..."
python manage.py collectstatic --noinput --clear

# Запускаем gunicorn
echo "Запуск Gunicorn..."
exec gunicorn config.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -