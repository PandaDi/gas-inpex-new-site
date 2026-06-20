# План миграции корпоративного сайта Gas Inpex

## Flask + Jinja2 → Django + DRF + Next.js

**Дата:** 19 июня 2026
**Текущий стек:** Flask + Jinja2 + Frozen-Flask → статические HTML на хостинге gas-inpex.kz
**Новый стек:** Django + DRF (REST API) + Next.js (SSR) + PostgreSQL + Docker + Nginx
**Репозиторий старого сайта:** `~/projects/gas-inpex/site/` (GitHub: PandaDi/gas-inpex-site)
**Директория нового сайта:** `~/projects/gas-inpex/new-site/`
**Условие:** Старый сайт продолжает работать до полной готовности нового

---

## Инвентаризация текущего сайта

### Страницы (11 шт):

| # | Файл | Описание | Размер (строк) |
|---|---|---|---|
| 1 | `index.html` | Главная — Hero-слайдер (4 слайда), карточки, проекты, новости | 1315 |
| 2 | `services.html` | Услуги — 6 направлений с деталями | 439 |
| 3 | `service-detail.html` | Детальное описание услуг | 751 |
| 4 | `objects.html` | Портфолио проектов (4 кейса) | 256 |
| 5 | `certificates.html` | Сертификаты и лицензии (5 шт) | 190 |
| 6 | `partners.html` | Партнёры и клиенты (10+) | 271 |
| 7 | `contacts.html` | Контакты + форма обратной связи (WhatsApp) | 183 |
| 8 | `catalog-industrial.html` | Промышленное газовое оборудование (12 товаров) | 420 |
| 9 | `catalog-boilers.html` | Бытовые котлы (7 товаров) | 274 |
| 10 | `catalog-smarthome.html` | Системы «Умный дом» (8 товаров) | 275 |
| 11 | `catalog-kipia.html` | Оборудование КИПиА (8 товаров) | 369 |

### Статика:
- **Изображения:** ~48 файлов (webp) в `static/images/`
- **CSS:** `tailwind.min.css`, `style.css`, `input.css`
- **JS:** `main.js`, `fontawesome.js` (FontAwesome SVG sprite)
- **Шрифты:** FontAwesome (через unpkg.com)
- **Библиотеки:** Alpine.js (через unpkg.com)

### Доступные инструменты на сервере:
- Python 3.11.15, uv (менеджер пакетов)
- Node.js v22.22.3, npm 10.9.8
- Docker 29.1.3, Docker Compose 2.40.3
- PostgreSQL — **не установлен** (ставится в Docker)

---

## Структура нового проекта

```
~/projects/gas-inpex/new-site/
├── backend/                          # Django проект
│   ├── config/                       # Django settings (base, dev, prod)
│   │   ├── __init__.py
│   │   ├── settings/
│   │   │   ├── base.py
│   │   │   ├── dev.py
│   │   │   └── prod.py
│   │   ├── urls.py                   # Корневые URL
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── apps/
│   │   ├── pages/                    # Статические страницы (через FlatPages или API)
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   ├── urls.py
│   │   │   └── admin.py
│   │   ├── catalog/                  # Каталог оборудования
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   ├── urls.py
│   │   │   └── admin.py
│   │   ├── contacts/                 # Заявки с формы обратной связи
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   ├── urls.py
│   │   │   └── admin.py
│   │   └── accounts/                 # Пользователи админки (расширение)
│   │       ├── models.py
│   │       └── admin.py
│   ├── media/                        # Медиа-файлы (изображения, документы)
│   │   └── images/                   # Копия всех images со старого сайта
│   ├── static/                       # Статика Django (favicon, etc.)
│   ├── staticfiles/                  # Собранная статика (collectstatic)
│   ├── manage.py
│   ├── requirements/
│   │   ├── base.txt
│   │   ├── dev.txt
│   │   └── prod.txt
│   ├── Dockerfile
│   └── entrypoint.sh
├── frontend/                         # Next.js проект
│   ├── src/
│   │   ├── app/                      # App Router (SSR)
│   │   │   ├── page.tsx              # Главная
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # service-detail
│   │   │   ├── objects/
│   │   │   │   └── page.tsx
│   │   │   ├── certificates/
│   │   │   │   └── page.tsx
│   │   │   ├── partners/
│   │   │   │   └── page.tsx
│   │   │   ├── contacts/
│   │   │   │   └── page.tsx
│   │   │   └── catalog/
│   │   │       ├── industrial/
│   │   │       │   └── page.tsx
│   │   │       ├── boilers/
│   │   │       │   └── page.tsx
│   │   │       ├── smarthome/
│   │   │       │   └── page.tsx
│   │   │       └── kipia/
│   │   │           └── page.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx        # Навигация (десктоп + мобильная)
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── TopBar.tsx
│   │   │   │   ├── MobileMenu.tsx
│   │   │   │   └── ScrollToTop.tsx
│   │   │   ├── ui/
│   │   │   │   ├── HeroSlider.tsx    # Слайдер для главной
│   │   │   │   ├── ProductCard.tsx   # Карточка товара
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   ├── PartnerCard.tsx
│   │   │   │   ├── CertificateCard.tsx
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   └── ContactForm.tsx   # Форма обратной связи
│   │   │   └── sections/
│   │   │       ├── HeroSection.tsx
│   │   │       ├── QuickLinks.tsx
│   │   │       ├── AboutSection.tsx
│   │   │       ├── ProjectsSection.tsx
│   │   │       └── NewsSection.tsx
│   │   ├── lib/
│   │   │   ├── api.ts                # Клиент для Django API
│   │   │   └── constants.ts          # Контакты, ссылки, etc.
│   │   └── styles/
│   │       └── globals.css           # Tailwind CSS
│   ├── public/
│   │   └── images/                   # Статические изображения
│   │       ├── hero-industrial.webp (копия со старого)
│   │       ├── hero-supply.webp
│   │       ├── ...
│   │       └── og-preview.webp
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── package.json
│   ├── Dockerfile
│   └── .env.local
├── docker/                           # Docker файлы
│   ├── nginx/
│   │   ├── nginx.conf
│   │   └── sites/
│   │       └── gas-inpex.kz.conf
│   └── postgres/
│       └── init.sql
├── docker-compose.yml                # Основной compose-файл
├── docker-compose.prod.yml           # Замена для продакшена
├── .env                              # Переменные окружения (не в git)
├── .env.example                      # Шаблон .env
├── .gitignore
└── README.md
```

---

## Этап 1. Подготовка окружения

### 1.1. Создать директорию нового проекта

```bash
mkdir -p ~/projects/gas-inpex/new-site
cd ~/projects/gas-inpex/new-site
git init
```

### 1.2. Настроить Django бэкенд

```bash
# Установка Django в виртуальное окружение
cd ~/projects/gas-inpex/new-site
uv venv .venv
source .venv/bin/activate
uv pip install django djangorestframework django-cors-headers django-filter pillow psycopg2-binary python-dotenv gunicorn whitenoise

# Создание проекта
django-admin startproject config backend/
cd backend/
python manage.py startapp pages
python manage.py startapp catalog
python manage.py startapp contacts
python manage.py startapp accounts
cd ..

# requirements
mkdir -p backend/requirements
cat > backend/requirements/base.txt << 'EOF'
django>=5.0,<6.0
djangorestframework>=3.15
django-cors-headers>=4.0
django-filter>=24.0
pillow>=10.0
psycopg2-binary>=2.9
python-dotenv>=1.0
gunicorn>=22.0
whitenoise>=6.0
EOF

cp backend/requirements/base.txt backend/requirements/dev.txt
echo "django-extensions" >> backend/requirements/dev.txt

cp backend/requirements/base.txt backend/requirements/prod.txt
```

### 1.3. Настроить Next.js фронтенд

```bash
cd ~/projects/gas-inpex/new-site
npx create-next-app@latest frontend/ \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd frontend
npm install axios react-icons
```

### 1.4. Настроить Docker окружение

```bash
cd ~/projects/gas-inpex/new-site

# Проверка Docker
docker --version
docker compose version

# PostgreSQL будет подниматься в Docker Compose
```

### 1.5. Файлы конфигурации

Создать:
- `docker-compose.yml` (3 сервиса: backend, frontend, postgres)
- `backend/Dockerfile`
- `frontend/Dockerfile`
- `.env` с переменными окружения

**docker-compose.yml (dev):**

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: gasinpex
      POSTGRES_USER: gasinpex
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build: ./backend
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app
      - ./backend/media:/app/media
    ports:
      - "8000:8000"
    env_file: .env
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    command: npm run dev
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000/api
    depends_on:
      - backend

volumes:
  pgdata:
```

### 1.6. Подготовка .env

```bash
cat > .env << 'EOF'
# Django
DJANGO_SETTINGS_MODULE=config.settings.dev
DJANGO_SECRET_KEY=your-secret-key-dev-only
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

# PostgreSQL
DB_NAME=gasinpex
DB_USER=gasinpex
DB_PASSWORD=strong-password-here
DB_HOST=postgres
DB_PORT=5432

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:8000/api
EOF
```

---

## Этап 2. Модели БД и API (DRF)

### 2.1. Модели PostgreSQL

**contacts (заявки с диспетчерским учётом):**

```python
# backend/apps/contacts/models.py
class ContactRequest(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новая'),
        ('in_progress', 'В работе'),
        ('completed', 'Выполнена'),
    ]
    name = models.CharField('Имя', max_length=200)
    phone = models.CharField('Телефон', max_length=20)
    email = models.EmailField('Email', blank=True)
    message = models.TextField('Сообщение')
    account_number = models.CharField('Лицевой счёт', max_length=50, blank=True, help_text='Номер лицевого счёта абонента')
    address = models.CharField('Адрес выезда', max_length=200, blank=True, help_text='Адрес для выезда специалиста')
    status = models.CharField('Статус заявки', max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

**billing (лицевые счета — задел на будущее):**

```python
# backend/apps/billing/models.py
class BillingAccount(models.Model):
    account_number = models.CharField('Лицевой счёт', max_length=50, unique=True)
    full_name = models.CharField('ФИО', max_length=150, help_text='ФИО владельца счёта')
    address = models.CharField('Адрес', max_length=200, blank=True)
    balance = models.DecimalField('Текущий баланс', max_digits=10, decimal_places=2, default=0, help_text='Отрицательное значение = задолженность')
    created_at = models.DateTimeField('Дата регистрации', auto_now_add=True)
```

**catalog (категории + товары):**

```python
# backend/apps/catalog/models.py
class Category(models.Model):
    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField('Название', max_length=200)
    description = models.TextField('Описание', blank=True)
    icon = models.CharField('Иконка (FontAwesome)', max_length=50, help_text='например: fa-industry')
    order = models.IntegerField('Порядок', default=0)

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField('Название', max_length=300)
    description = models.TextField('Описание')
    features = models.JSONField('Характеристики', default=list, blank=True,
                                 help_text='Массив {key, value}')
    image = models.ImageField('Изображение', upload_to='catalog/')
    order = models.IntegerField('Порядок', default=0)
```

**pages (контент страниц — опционально):**

```python
# backend/apps/pages/models.py
class Service(models.Model):
    slug = models.SlugField(max_length=100, unique=True)
    title = models.CharField('Название услуги', max_length=200)
    short_description = models.TextField('Краткое описание', blank=True)
    content = models.TextField('Полное содержание (HTML)')
    icon = models.CharField('Иконка', max_length=50, blank=True)
    order = models.IntegerField('Порядок', default=0)

class Project(models.Model):
    title = models.CharField('Название проекта', max_length=200)
    location = models.CharField('Местоположение', max_length=200)
    year = models.IntegerField('Год')
    description = models.TextField('Описание')
    image = models.ImageField('Изображение', upload_to='projects/')
    order = models.IntegerField('Порядок', default=0)

class Partner(models.Model):
    name = models.CharField('Название', max_length=200)
    description = models.TextField('Описание', blank=True)
    icon = models.CharField('Иконка (FontAwesome)', max_length=50, blank=True)
    order = models.IntegerField('Порядок', default=0)

class Certificate(models.Model):
    title = models.CharField('Название', max_length=200)
    description = models.TextField('Описание', blank=True)
    image = models.ImageField('Изображение', upload_to='certificates/')
    order = models.IntegerField('Порядок', default=0)
```

**accounts (пользователи админки):**

```python
# backend/apps/accounts/models.py — используется стандартная User модель Django
# с дополнительным полем role для разграничения доступа
```

### 2.2. API Endpoints (DRF)

```
GET  /api/pages/services/          → список услуг
GET  /api/pages/services/{slug}/   → детально об услуге
GET  /api/pages/projects/          → список проектов
GET  /api/pages/partners/          → список партнёров
GET  /api/pages/certificates/      → список сертификатов
GET  /api/pages/hero-slides/       → слайды для Hero (содержимое главной)

GET  /api/catalog/categories/      → категории каталога
GET  /api/catalog/products/        → товары (с ?category=slug фильтром)
GET  /api/catalog/products/{id}/   → детально о товаре

POST /api/contacts/requests/       → создание заявки

GET  /api/pages/contact-info/      → контактные данные (адрес, телефон, email)
```

### 2.3. Пример ViewSet для каталога

```python
from rest_framework import viewsets, filters
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().order_by('order')
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by('order')
    serializer_class = ProductSerializer
    filterset_fields = ['category__slug', 'category']
```

### 2.4. Настройка URL

```python
# backend/config/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.pages.urls')),
    path('api/catalog/', include('apps.catalog.urls')),
    path('api/contacts/', include('apps.contacts.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 2.5. Миграции

```bash
cd ~/projects/gas-inpex/new-site
source .venv/bin/activate
cd backend
python manage.py makemigrations pages catalog contacts accounts
python manage.py migrate
```

---

## Этап 3. Админка (Django Admin)

### 3.1. Кастомизация под бренд Gas Inpex

```python
# backend/config/settings/base.py
ADMIN_SITE_HEADER = "Gas Inpex — Панель управления"
ADMIN_SITE_TITLE = "Gas Inpex"
ADMIN_INDEX_TITLE = "Управление контентом сайта"
```

```python
# backend/config/admin.py — кастомный admin.site
from django.contrib.admin import AdminSite
from django.contrib import admin

class GasInpexAdminSite(AdminSite):
    site_header = "Gas Inpex — Панель управления"
    site_title = "Gas Inpex"
    index_title = "Управление контентом сайта"
    site_url = None  # убрать ссылку "Посмотреть сайт" по умолчанию

admin_site = GasInpexAdminSite(name='gasinpex_admin')
```

### 3.2. Регистрация моделей в админке

```python
# backend/apps/pages/admin.py
from django.contrib import admin
from .models import Service, Project, Partner, Certificate

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'year', 'order')
    ordering = ('order',)

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    ordering = ('order',)

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    ordering = ('order',)
```

```python
# backend/apps/catalog/admin.py
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'order')
    list_filter = ('category',)
    ordering = ('category', 'order')
```

```python
# backend/apps/contacts/admin.py
@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'phone', 'email', 'message')
    readonly_fields = ('created_at',)
    actions = ['mark_as_read', 'mark_as_in_progress']

    def mark_as_read(self, request, queryset):
        queryset.update(status='read')
    mark_as_read.short_description = "Отметить как прочитанные"
```

### 3.3. Кастомные шаблоны админки

Создать папку `backend/templates/admin/` с кастомными HTML-шаблонами:
- `base_site.html` — брендированный header/footer
- CSS/логотип Gas Inpex в статике админки

---

## Этап 4. Фронтенд на Next.js

### 4.1. Настройка проекта

```typescript
// frontend/src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

export const getServices = () => api.get('/pages/services/');
export const getProjects = () => api.get('/pages/projects/');
export const getPartners = () => api.get('/pages/partners/');
export const getCertificates = () => api.get('/pages/certificates/');
export const getCategories = () => api.get('/catalog/categories/');
export const getProducts = (categorySlug?: string) =>
  api.get('/catalog/products/', { params: { category__slug: categorySlug } });
export const submitContact = (data: any) => api.post('/contacts/requests/', data);
```

### 4.2. Layout (общий для всех страниц)

Перенести `base.html` в компоненты React:

- **`Header.tsx`** — навигация с десктопным меню, дропдауном каталога, кнопкой CTA
- **`TopBar.tsx`** — контакты, соцсети, языковой переключатель
- **`Footer.tsx`** — 4 колонки: лого+описание, контакты, быстрые ссылки, каталог
- **`MobileMenu.tsx`** — мобильное меню с аккордеоном каталога
- **`ScrollToTop.tsx`** — кнопка прокрутки наверх

```typescript
// frontend/src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased text-gray-800 bg-white">
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
```

### 4.3. Страницы (SSR)

Каждая страница использует **Server-Side Rendering** для SEO:

**Главная (`/`)** — самый сложный компонент:
```typescript
// frontend/src/app/page.tsx — SSR
export default async function HomePage() {
  // На сервере: fetch services, projects, partners, certificates
  // Client components: HeroSlider, QuickLinks, AboutSection, etc.
}
```

**Услуги (`/services`)**:
```typescript
// SSR — fetch 6 услуг, отрендерить карточки + детали
```

**Детальная услуга (`/services/[slug]`)**:
```typescript
// SSR — fetch одной услуги по slug, полный контент
// Для service-detail.html — динамический роут
```

**Объекты (`/objects`)**:
```typescript
// SSR — fetch проекты, грид карточек
```

**Сертификаты (`/certificates`)**:
```typescript
// SSR — fetch сертификаты, галерея
```

**Партнёры (`/partners`)**:
```typescript
// SSR — fetch партнёры, карточки
```

**Контакты (`/contacts`)**:
```typescript
// SSR + Client Component: ContactForm (POST запрос в API)
// Карта Яндекс.Карт (iframe или react-yandex-maps)
```

**Каталоги (4 шт):**
```typescript
// SSR — fetch категории и товары
// /catalog/industrial
// /catalog/boilers
// /catalog/smarthome
// /catalog/kipia
```

### 4.4. Ключевые компоненты React

- **`HeroSlider.tsx`** — слайдер с 4 слайдами (инжиниринг, поставка, умный дом, сервис)
- **`QuickLinks.tsx`** — 4 карточки быстрых переходов
- **`ProductCard.tsx`** — карточка товара (изображение, название, характеристики)
- **`ContactForm.tsx`** — форма с валидацией, отправка через API
- **`YandexMap.tsx`** — iframe Яндекс.Карт

### 4.5. SEO-элементы

Каждая страница использует Next.js Metadata API:
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Услуги — Gas Inpex',
  description: 'Описание страницы услуг...',
  openGraph: {
    title: 'Услуги — Gas Inpex',
    description: '...',
  },
};
```

---

## Этап 5. Перенос контента со старого сайта

### 5.1. Копирование статических файлов

```bash
# Копирование изображений
cp -r ~/projects/gas-inpex/site/static/images/* ~/projects/gas-inpex/new-site/frontend/public/images/

# Копирование CSS/JS (как резерв)
cp -r ~/projects/gas-inpex/site/static/css/* ~/projects/gas-inpex/new-site/frontend/public/css/
cp -r ~/projects/gas-inpex/site/static/js/* ~/projects/gas-inpex/new-site/frontend/public/js/
```

### 5.2. Перенос контента через скрипт миграции

Создать скрипт `scripts/import_content.py` в корне Django, который:

1. Парсит текущие HTML-страницы или использует convert.py как основу
2. Заполняет модели Django через ORM

```python
# backend/scripts/import_content.py
"""
Скрипт для импорта контента со старого сайта в Django.
Запуск: python manage.py runscript import_content
"""
from apps.pages.models import Service, Project, Partner, Certificate
from apps.catalog.models import Category, Product

def run():
    # 1. Импорт услуг (из services.html и service-detail.html)
    # 2. Импорт проектов (из objects.html)
    # 3. Импорт партнёров (из partners.html)
    # 4. Импорт сертификатов (из certificates.html)
    # 5. Импорт категорий и товаров (из 4 каталогов)
    # 6. Создание суперпользователя для админки

    print("Импорт контента завершён")
```

**Альтернатива:** импорт через **Django Admin вручную** — для небольшого объёма данных (11 категорий товаров, 12+ партнёров, 5 сертификатов) это может быть быстрее написания скрипта.

### 5.3. Создание суперпользователя

```bash
cd backend
python manage.py createsuperuser
# Username: admin
# Email: info@gas-inpex.kz
# Password: [сгенерировать надёжный пароль]
```

### 5.4. Загрузка изображений в media/

Скопировать изображения из старого проекта в `backend/media/`:
```bash
cp -r ~/projects/gas-inpex/site/static/images/* ~/projects/gas-inpex/new-site/backend/media/
```

Через админку привязать изображения к соответствующим записям (Product, Project, Certificate).

---

## Этап 6. Docker + Nginx настройка

### 6.1. Dockerfile для бэкенда

```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    libpq-dev gcc --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY requirements/prod.txt .
RUN pip install --no-cache-dir -r prod.txt

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
```

### 6.2. Dockerfile для Next.js

```dockerfile
# frontend/Dockerfile
FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### 6.3. Nginx конфигурация

```nginx
# docker/nginx/sites/gas-inpex.kz.conf
upstream backend {
    server backend:8000;
}

upstream frontend {
    server frontend:3000;
}

server {
    listen 80;
    server_name gas-inpex.kz www.gas-inpex.kz;

    # Статика Next.js
    location /_next/static {
        proxy_pass http://frontend;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Медиа Django
    location /media/ {
        alias /app/media/;
        expires 30d;
    }

    # Админка Django
    location /admin/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Всё остальное → Next.js (SSR)
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6.4. docker-compose.yml для production

```yaml
# docker-compose.prod.yml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./docker/nginx/sites:/etc/nginx/conf.d:ro
    depends_on:
      - backend
      - frontend
```

### 6.5. SSL (Certbot)

Добавить сервис Certbot или настроить Let's Encrypt вручную:
```bash
docker compose -f docker-compose.prod.yml run --rm certbot certonly --webroot \
  -w /var/www/certbot -d gas-inpex.kz -d www.gas-inpex.kz
```

---

## Этап 7. Тестирование и деплой

### 7.1. Локальное тестирование (dev)

```bash
cd ~/projects/gas-inpex/new-site

# Поднять окружение
docker compose up -d

# Проверить API
curl http://localhost:8000/api/pages/services/
curl http://localhost:8000/api/catalog/products/

# Проверить админку
# Открыть http://localhost:8000/admin/

# Проверить фронтенд
curl http://localhost:3000/
curl http://localhost:3000/services
curl http://localhost:3000/catalog/industrial

# Запустить тесты Django
cd backend && python manage.py test && cd ..

# Собрать Next.js (проверка production сборки)
cd frontend && npm run build && cd ..
```

### 7.2. Чеклист тестирования

- [ ] Все 11 страниц отдаются с корректным HTML (не JS-пустышки)
- [ ] Мета-теги (title, description, OG) работают на каждой странице
- [ ] Карта сайта (sitemap.xml) сгенерирована
- [ ] robots.txt корректный
- [ ] Форма обратной связи отправляет POST → создаётся запись в БД
- [ ] Админка доступна, все CRUD-операции работают
- [ ] Изображения загружаются корректно
- [ ] Мобильное меню работает
- [ ] Дропдаун каталога работает
- [ ] Все ссылки ведут на правильные URL
- [ ] 404 страница отдаётся корректно
- [ ] Lighthouse аудит: Performance > 80, Accessibility > 90, SEO > 90

### 7.3. Стратегия деплоя (без остановки старого)

**Постепенный деплой, старый сайт не трогать:**

1. **Подготовка:** Убедиться, что старый сайт работает на штатном хостинге
2. **Сборка образов Docker:**
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml build
   ```
3. **Развёртывание на новом сервере (или том же, но на другом порту):**
   ```bash
   docker compose -f docker-compose.prod.yml up -d postgres backend frontend
   # Проверить, что всё работает на порту 3000 (не 80)
   ```
4. **Финальная проверка:** Все страницы, API, админка — на новом порту
5. **Переключение DNS/Traffic:**
   - Остановить/перенастроить старый Nginx (на хостинге)
   - Или изменить A-запись на IP нового сервера
   - **Или** настроить Nginx на сервере на порт 80, направив трафик на новый сайт
6. **Мониторинг:** Проверить что трафик пошёл, нет 404/500 ошибок
7. **Откат (если нужно):** Вернуть DNS/Nginx на старый сайт

---

## Общий порядок работ (пошаговый)

```
День 1-2:   Этап 1 — Подготовка окружения
            - Создать структуру папок
            - Инициализировать Django проект
            - Инициализировать Next.js проект
            - Настроить Docker Compose (dev)
            - Убедиться, что всё собирается

День 3-4:   Этап 2 — Модели БД + API
            - Создать модели: Category, Product, Service, Project, Partner, Certificate, ContactRequest
            - Создать ViewSet'ы и Serializer'ы
            - Настроить роутинг API
            - Проверить через curl/браузер

День 5:     Этап 3 — Админка Django
            - Кастомизировать AdminSite (GasInpexAdminSite)
            - Зарегистрировать все модели
            - Настроить поиск, фильтры, списки
            - Создать суперпользователя

День 6-10:  Этап 4 — Фронтенд Next.js
            - Layout (Header, Footer, TopBar, MobileMenu)
            - Главная (HeroSlider, QuickLinks, секции)
            - 9 внутренних страниц (услуги, объекты, сертификаты, партнёры, контакты, 4 каталога)
            - Форма обратной связи
            - SEO-метаданные (metadata API)

День 11:    Этап 5 — Перенос контента
            - Скопировать изображения
            - Заполнить модели через скрипт или админку
            - Проверить что весь контент на месте

День 12:    Этап 6 — Docker + Nginx
            - Dockerfile для backend (gunicorn)
            - Dockerfile для frontend (standalone)
            - Nginx конфиг
            - docker-compose.prod.yml
            - Тест продакшен-сборки

День 13-14: Этап 7 — Тестирование и деплой
            - Полное тестирование (чеклист)
            - Lighthouse аудит
            - Исправление багов
            - Деплой (без остановки старого)
            - Переключение DNS/Nginx
            - Мониторинг
```

---

## Ключевые команды (шпаргалка)

### Разработка

```bash
# Django бэкенд
cd ~/projects/gas-inpex/new-site
source .venv/bin/activate
cd backend
python manage.py runserver

# Next.js фронтенд
cd ~/projects/gas-inpex/new-site/frontend
npm run dev

# Docker Compose (dev)
cd ~/projects/gas-inpex/new-site
docker compose up -d
docker compose logs -f
docker compose down
```

### Миграции

```bash
cd ~/projects/gas-inpex/new-site/backend
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### Сборка / Production

```bash
# Production билд
cd ~/projects/gas-inpex/new-site
docker compose -f docker-compose.yml -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d

# Статика Django
cd backend
python manage.py collectstatic --noinput
```

### Тестирование

```bash
# Бэкенд
cd backend && python manage.py test apps/

# Фронтенд
cd frontend && npm run lint && npm run build

# Проверка API
curl http://localhost:8000/api/catalog/categories/
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"+77771234567","message":"Test"}' \
  http://localhost:8000/api/contacts/requests/
```

---

## Потенциальные риски и их минимизация

| Риск | Решение |
|------|---------|
| Потеря SEO-позиций при смене стеков | Сохранить те же URL-паттерны (/services.html → /services) c 301 редиректами |
| Изображения не загружаются | Проверить пути в Next.js конфиге, настроить медиа-сервер Django |
| Форма обратной связи не работает | Настроить CORS (django-cors-headers), проверить CSRF-exempt для API |
| Медленная загрузка Next.js SSR | Настроить кэширование в Nginx, ISR (Incremental Static Regeneration) |
| Проблемы с PostgreSQL в Docker | Настроить volume для персистентности, бэкапы через pg_dump |
| Конфликт портов со старым сайтом | Новый сайт разворачивать на другом IP/порту, переключение через Nginx |