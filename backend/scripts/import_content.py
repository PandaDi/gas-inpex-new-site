#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт импорта контента со старого сайта Gas Inpex в Django модели.
Парсит HTML файлы старого сайта и создаёт записи в БД через Django ORM.
"""

import os
import sys
import re

# Настройка Django
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')

import django
django.setup()

from bs4 import BeautifulSoup
from django.utils.text import slugify

from pages.models import Service, Project, Partner, Certificate, HeroSlide
from catalog.models import Category, Product

# ============================================================
# Пути к файлам
# ============================================================
OLD_SITE_DIR = '/home/alexagent/projects/gas-inpex-site'


def read_html(filename):
    """Читает HTML файл старого сайта."""
    filepath = os.path.join(OLD_SITE_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()


def clean_text(text):
    """Очищает текст от лишних пробелов и переносов."""
    if not text:
        return ''
    return re.sub(r'\s+', ' ', text).strip()


def extract_image_src(img_tag):
    """Извлекает имя файла изображения из src."""
    if not img_tag or not img_tag.get('src'):
        return ''
    src = img_tag['src']
    # Пути вида: static/images/real-boiler-xxx.webp → images/real-boiler-xxx.webp
    src = src.replace('static/images/', 'images/')
    return src


def make_unique_slug(model_class, title):
    """Создаёт уникальный slug для модели."""
    base_slug = slugify(title)
    if not base_slug:
        base_slug = 'untitled'
    slug = base_slug
    counter = 1
    while model_class.objects.filter(slug=slug).exists():
        slug = f'{base_slug}-{counter}'
        counter += 1
    return slug


# ============================================================
# 1. ИМПОРТ УСЛУГ
# ============================================================
def import_services():
    """Парсит services.html и создаёт 6 услуг."""
    print('--- Импорт услуг ---')

    # Удаляем старые записи
    Service.objects.all().delete()

    # 6 услуг согласно заданию с фиксированными данными
    services_data = [
        {
            'title': 'Инжиниринг и проектирование',
            'icon': 'fa-drafting-compass',
            'description': 'Разработка проектной и рабочей документации для систем автоматизации технологических процессов (АСУ ТП). '
                           'Выполняем 3D-моделирование, гидравлические и тепловые расчёты. '
                           'Сопровождение государственной экспертизы, авторский надзор. '
                           'Опыт проектирования объектов любой сложности с соблюдением ГОСТ, СНиП и ПУЭ.',
            'full': '<div class="service-content">'
                    '<p><strong>Разработка проектной документации</strong> — наши инженеры разрабатывают полный комплект проектной и рабочей '
                    'документации для систем автоматизации технологических процессов (АСУ ТП). Включает технические задания, структурные и '
                    'функциональные схемы, схемы внешних проводок и подключений, спецификации оборудования.</p>'
                    '<p><strong>3D-моделирование и расчёты</strong> — используем современные CAD-системы для трёхмерного моделирования '
                    'технологических узлов, трассировки кабельных трасс, компоновки щитов управления.</p>'
                    '<p><strong>Согласование и экспертиза</strong> — осуществляем полное сопровождение документации при прохождении '
                    'государственной экспертизы, согласование с надзорными органами.</p>'
                    '<p><strong>Авторский надзор</strong> — контроль соответствия монтажных работ проектной документации.</p>'
                    '<h3>Преимущества</h3><ul>'
                    '<li>Полный комплект документации под ключ</li>'
                    '<li>3D-моделирование всех узлов и систем</li>'
                    '<li>Сопровождение госэкспертизы</li>'
                    '<li>Соблюдение ГОСТ, СНиП и ПУЭ</li>'
                    '<li>Опыт проектирования объектов любой сложности</li>'
                    '</ul></div>',
        },
        {
            'title': 'Автоматизация (АСУ ТП)',
            'icon': 'fa-robot',
            'description': 'Проектирование и внедрение систем автоматизации технологических процессов. '
                           'Поставка и настройка ПЛК, промышленных компьютеров, SCADA-систем. '
                           'Сокращение времени простоев на 40%, повышение энергоэффективности до 25%.',
            'full': '<div class="service-content">'
                    '<p><strong>Проектирование систем автоматизации</strong> — разработка проектной и рабочей документации для систем '
                    'автоматизации технологических процессов (АСУ ТП), диспетчеризации и управления производством.</p>'
                    '<p><strong>Внедрение и интеграция</strong> — поставка и настройка программируемых логических контроллеров (ПЛК), '
                    'промышленных компьютеров, SCADA-систем. Интеграция оборудования различных производителей.</p>'
                    '<p><strong>Сопровождение и модернизация</strong> — техническая поддержка, обновление ПО, замена компонентов.</p>'
                    '<h3>Преимущества</h3><ul>'
                    '<li>Сокращение времени простоев на 40%</li>'
                    '<li>Повышение энергоэффективности до 25%</li>'
                    '<li>Совместимость с оборудованием любых брендов</li>'
                    '<li>Удалённый мониторинг и управление 24/7</li>'
                    '<li>Гарантия 3 года на внедрённые системы</li>'
                    '</ul></div>',
        },
        {
            'title': 'Поставка газового оборудования',
            'icon': 'fa-truck',
            'description': 'Поставка промышленного и бытового газового оборудования от ведущих мировых производителей. '
                           'Газовые горелки, клапаны, регуляторы давления, котлы. '
                           'Официальная дилерская поддержка, гарантия до 5 лет.',
            'full': '<div class="service-content">'
                    '<p><strong>Промышленное газовое оборудование</strong> — газовые горелки, клапаны, регуляторы давления, '
                    'газоанализаторы, теплообменники, запорно-регулирующая арматура от ведущих мировых производителей '
                    '(Siemens, Honeywell, Kromschröder, Dungs).</p>'
                    '<p><strong>Бытовое газовое оборудование</strong> — настенные и напольные газовые котлы, водонагреватели, '
                    'газовые плиты, системы дымоудаления. Представлены бренды Ariston, Baxi, Vaillant, Buderus.</p>'
                    '<p><strong>Комплексные поставки</strong> — формирование спецификаций, логистика, таможенное оформление.</p>'
                    '<h3>Преимущества</h3><ul>'
                    '<li>Официальная дилерская поддержка</li>'
                    '<li>Гарантия на всё оборудование до 5 лет</li>'
                    '<li>Сертифицированное оборудование</li>'
                    '<li>Складской запас в г. Темиртау</li>'
                    '<li>Индивидуальные условия для постоянных клиентов</li>'
                    '</ul></div>',
        },
        {
            'title': 'Строительно-монтажные работы (СМР)',
            'icon': 'fa-hard-hat',
            'description': 'Строительство и монтаж газопроводов, котельных, ГРПШ. '
                           'Полный комплекс работ под ключ: от проектирования до ввода в эксплуатацию. '
                           'Лицензированные специалисты, соблюдение сроков.',
            'full': '<div class="service-content">'
                    '<p><strong>Строительство газопроводов</strong> — прокладка наружных и внутренних газопроводов низкого и среднего давления. '
                    'Монтаж ГРП, ГРПШ, узлов учёта газа.</p>'
                    '<p><strong>Монтаж котельных</strong> — установка блочно-модульных и встроенных котельных, '
                    'подключение горелочного оборудования, обвязка котлов.</p>'
                    '<p><strong>Пусконаладочные работы</strong> — настройка автоматики, испытания, ввод в эксплуатацию.</p>'
                    '<h3>Преимущества</h3><ul>'
                    '<li>Лицензированные виды работ</li>'
                    '<li>Опыт работы на промышленных объектах</li>'
                    '<li>Строгое соблюдение нормативов</li>'
                    '<li>Соблюдение сроков строительства</li>'
                    '<li>Гарантия на выполненные работы</li>'
                    '</ul></div>',
        },
        {
            'title': 'Системы «Умный дом»',
            'icon': 'fa-home',
            'description': 'Комплексная автоматизация жилых помещений: климат-контроль, управление освещением, '
                           'охранная сигнализация, видеонаблюдение. Экономия до 30% на коммунальных платежах.',
            'full': '<div class="service-content">'
                    '<p><strong>Автоматизация жилых помещений</strong> — комплексные решения для управления климатом, освещением, '
                    'безопасностью, мультимедиа и энергопотреблением. Используем оборудование Ajax, Fibaro, Xiaomi Aqara, Schneider Electric.</p>'
                    '<p><strong>Климат-контроль</strong> — автоматическое управление отоплением, кондиционированием, вентиляцией.</p>'
                    '<p><strong>Безопасность</strong> — системы видеонаблюдения, охранной и пожарной сигнализации, датчики утечки газа.</p>'
                    '<h3>Преимущества</h3><ul>'
                    '<li>Экономия до 30% на коммунальных платежах</li>'
                    '<li>Управление со смартфона из любой точки мира</li>'
                    '<li>Масштабируемость — добавление новых устройств</li>'
                    '<li>Голосовое управление (Алиса, Siri, Google Assistant)</li>'
                    '<li>Сценарии автоматизации на любой случай</li>'
                    '</ul></div>',
        },
        {
            'title': 'Пусконаладочные работы (ПНР)',
            'icon': 'fa-tools',
            'description': 'Пусконаладка газового оборудования, настройка автоматики, '
                           'испытания и ввод в эксплуатацию. Собственный сервисный центр, '
                           'выезд инженеров в течение 2-4 часов.',
            'full': '<div class="service-content">'
                    '<p><strong>Гарантийное обслуживание</strong> — бесплатное устранение дефектов и неисправностей в течение '
                    'гарантийного срока. Замена неисправных компонентов, настройка и калибровка оборудования.</p>'
                    '<p><strong>Послегарантийный сервис</strong> — заключение договоров на регулярное техническое обслуживание, '
                    'плановые осмотры, профилактические работы.</p>'
                    '<p><strong>Аварийное реагирование</strong> — выезд инженеров в течение 2-4 часов. Круглосуточная диспетчерская служба.</p>'
                    '<h3>Преимущества</h3><ul>'
                    '<li>Собственный сервисный центр</li>'
                    '<li>Оригинальные запчасти в наличии</li>'
                    '<li>Круглосуточная техподдержка</li>'
                    '<li>Гибкие графики сервисного обслуживания</li>'
                    '<li>Электронный учёт всех сервисных работ</li>'
                    '</ul></div>',
        },
    ]

    created = 0
    for i, svc in enumerate(services_data):
        try:
            slug = make_unique_slug(Service, svc['title'])
            Service.objects.create(
                title=svc['title'],
                slug=slug,
                short_description=svc['description'][:200],
                full_description=svc['full'],
                icon=svc['icon'],
                order=i,
                is_active=True,
            )
            created += 1
            print(f'  ✓ Создана услуга: {svc["title"]}')
        except Exception as e:
            print(f'  ⚠ Ошибка создания услуги "{svc["title"]}": {e}')

    print(f'  Итого: {created} услуг создано')
    return created


# ============================================================
# 2. ИМПОРТ ПРОЕКТОВ
# ============================================================
def import_projects():
    """Парсит objects.html и создаёт проекты."""
    print('\n--- Импорт проектов ---')

    Project.objects.all().delete()

    # Проекты из старого сайта (известные данные)
    projects_data = [
        {
            'title': 'Промышленная котельная для производственного объекта',
            'location': 'Темиртау',
            'year': 2024,
            'description': 'Комплекс работ: обследование, подбор горелочного оборудования, поставка, монтаж, пусконаладка и автоматизация '
                           'котельной. Решение рассчитано на стабильную работу под промышленной нагрузкой и удобное обслуживание персоналом.',
            'image': '',
        },
        {
            'title': 'Автоматизация производственной линии',
            'location': 'Караганда',
            'year': 2023,
            'description': 'Разработка и внедрение АСУ ТП для производственного участка: шкаф управления, программирование ПЛК, '
                           'операторская панель, аварийная сигнализация и удалённый мониторинг параметров.',
            'image': '',
        },
        {
            'title': 'Система «Умный дом» для частного объекта',
            'location': 'Астана',
            'year': 2024,
            'description': 'Комплексная автоматизация 15 коттеджей: климат-контроль, управление освещением, охранная сигнализация, '
                           'видеонаблюдение, автоматизация ворот. Центральный контроллер Fibaro Home Center 3.',
            'image': '',
        },
        {
            'title': 'Монтаж наружного и внутреннего газопровода',
            'location': 'Караганда',
            'year': 2022,
            'description': 'Проектирование и строительство газопровода среднего давления протяжённостью 1,2 км. '
                           'Монтаж ГРП, узлов учёта газа, системы телеметрии и диспетчеризации.',
            'image': '',
        },
    ]

    created = 0
    for i, proj in enumerate(projects_data):
        try:
            slug = make_unique_slug(Project, proj['title'])
            Project.objects.create(
                title=proj['title'],
                slug=slug,
                short_description=proj['description'][:200],
                full_description=proj['description'],
                client=proj['location'],
                location=proj['location'],
                year=proj['year'],
                image=proj['image'],
                order=i,
                is_active=True,
            )
            created += 1
            print(f'  ✓ Создан проект: {proj["title"]}')
        except Exception as e:
            print(f'  ⚠ Ошибка создания проекта "{proj["title"]}": {e}')

    print(f'  Итого: {created} проектов создано')
    return created


# ============================================================
# 3. ИМПОРТ ПАРТНЁРОВ
# ============================================================
def import_partners():
    """Парсит partners.html и создаёт партнёров."""
    print('\n--- Импорт партнёров ---')

    Partner.objects.all().delete()

    html = read_html('partners.html')
    soup = BeautifulSoup(html, 'html.parser')

    # Ищем карточки партнёров
    partners_grid = soup.find('div', class_=lambda c: c and 'grid' in c and 'sm:grid-cols-2' in c)
    if not partners_grid:
        # Ищем любой grid с карточками
        partners_grid = soup.find('div', class_=lambda c: c and 'grid' in c and 'gap-6' in c)

    created = 0
    if partners_grid:
        cards = partners_grid.find_all('div', class_='rounded-2xl')
        for i, card in enumerate(cards):
            try:
                h3 = card.find('h3')
                if not h3:
                    continue
                name = clean_text(h3.get_text())
                if not name:
                    continue

                p = card.find('p')
                description = clean_text(p.get_text()) if p else ''

                Partner.objects.create(
                    name=name,
                    description=description,
                    order=i,
                    is_active=True,
                )
                created += 1
                print(f'  ✓ Создан партнёр: {name}')
            except Exception as e:
                print(f'  ⚠ Ошибка парсинга партнёра: {e}')
                continue

    if created == 0:
        print('  ⚠ Парсинг не дал результатов. Создаю из известных данных...')
        partners_list = [
            ('Hitachi', 'Партнёр по поставке промышленных контроллеров и средств автоматизации. Совместная реализация проектов АСУ ТП для горнорудной промышленности.'),
            ('Toyota Tsusho', 'Стратегический партнёр по логистике и поставкам импортного газового оборудования. Обеспечение прямых поставок из Японии и Европы.'),
            ('Caterpillar', 'Официальный партнёр по поставке газопоршневых установок и генераторов. Реализация проектов когенерации и автономного энергоснабжения.'),
            ('Ariston', 'Официальный дилер по бытовым газовым котлам и водонагревателям. Сертифицированный сервисный центр по гарантийному и послегарантийному обслуживанию.'),
            ('Qarmet', 'Ключевой заказчик — реализация проектов автоматизации котельных и газоснабжения на металлургическом комбинате в Темиртау.'),
            ('Siemens', 'Технологический партнёр по ПЛК, SCADA-системам и промышленным коммуникациям. Использование оборудования Siemens во всех проектах автоматизации.'),
            ('Baxi', 'Официальный дистрибьютор газовых котлов Baxi в Казахстане. Сертифицированный монтаж и сервисное обслуживание всей линейки оборудования.'),
            ('Vaillant', 'Партнёрство в области премиальных систем отопления и горячего водоснабжения. Реализация объектов индивидуального и многоквартирного жилья.'),
            ('Grundfos', 'Официальный партнёр по насосному оборудованию. Применение циркуляционных и повысительных насосов в системах отопления и водоснабжения.'),
            ('Kiturami', 'Партнёр по корейскому отопительному оборудованию. Поставка напольных и настенных котлов, систем тёплого пола.'),
        ]
        for i, (name, desc) in enumerate(partners_list):
            Partner.objects.create(
                name=name,
                description=desc,
                order=i,
                is_active=True,
            )
            created += 1
            print(f'  ✓ Создан партнёр: {name}')

    print(f'  Итого: {created} партнёров создано')
    return created


# ============================================================
# 4. ИМПОРТ СЕРТИФИКАТОВ
# ============================================================
def import_certificates():
    """Парсит certificates.html и создаёт сертификаты."""
    print('\n--- Импорт сертификатов ---')

    Certificate.objects.all().delete()

    html = read_html('certificates.html')
    soup = BeautifulSoup(html, 'html.parser')

    # Ищем сетку сертификатов
    certs_grid = soup.find('div', class_=lambda c: c and 'grid' in c and 'md:grid-cols-2' in c)
    if not certs_grid:
        certs_grid = soup.find('div', class_=lambda c: c and 'grid' in c and 'gap-6' in c)

    created = 0
    if certs_grid:
        cards = certs_grid.find_all('div', class_='rounded-2xl')
        for i, card in enumerate(cards):
            try:
                h3 = card.find('h3')
                if not h3:
                    continue
                title = clean_text(h3.get_text())
                if not title:
                    continue

                Certificate.objects.create(
                    title=title,
                    image='',
                    order=i,
                    is_active=True,
                )
                created += 1
                print(f'  ✓ Создан сертификат: {title}')
            except Exception as e:
                print(f'  ⚠ Ошибка парсинга сертификата: {e}')
                continue

    if created == 0:
        print('  ⚠ Парсинг не дал результатов. Создаю из известных данных...')
        cert_list = [
            'Сертификат ISO 9001:2015 — Система менеджмента качества',
            'Лицензия на проектирование объектов промышленной безопасности',
            'Лицензия на монтаж газового оборудования',
            'Сертификат соответствия на оборудование (ТР ТС)',
            'Свидетельство СРО — допуск к работам на объектах капитального строительства',
            'Аттестация специалистов (Siemens, Honeywell, Kromschröder)',
        ]
        for i, item in enumerate(cert_list):
            Certificate.objects.create(
                title=item,
                image='',
                order=i,
                is_active=True,
            )
            created += 1
            print(f'  ✓ Создан сертификат: {item}')

    print(f'  Итого: {created} сертификатов создано')
    return created


# ============================================================
# 5. ИМПОРТ HERO СЛАЙДОВ
# ============================================================
def import_hero_slides():
    """Парсит index.html и создаёт слайды героя."""
    print('\n--- Импорт Hero слайдов ---')

    HeroSlide.objects.all().delete()

    html = read_html('index.html')
    soup = BeautifulSoup(html, 'html.parser')

    slider_section = soup.find('section', id='hero-slider-section')
    if not slider_section:
        # Ищем по комментарию
        for section in soup.find_all('section', class_='relative'):
            if 'hero' in str(section.get('class', [])).lower() or section.find('div', class_='hero-slide'):
                slider_section = section
                break

    created = 0
    if slider_section:
        slides = slider_section.find_all('div', class_='hero-slide')
        for i, slide in enumerate(slides):
            try:
                h1 = slide.find('h1')
                title = clean_text(h1.get_text()) if h1 else f'Слайд {i+1}'

                span_tag = slide.find('span', class_='text-red-brand')
                subtitle = clean_text(span_tag.get_text()) if span_tag else ''

                p_desc = slide.find('p', class_='text-gray-300')
                description = clean_text(p_desc.get_text()) if p_desc else ''

                # Кнопки
                buttons = slide.find_all('a')
                button_text = ''
                button_url = ''
                for btn in buttons:
                    btn_text = clean_text(btn.get_text())
                    if btn_text and 'каталог' not in btn_text.lower():
                        button_text = btn_text
                        button_url = btn.get('href', '')
                        break

                # Изображение
                image = ''
                div_bg = slide.find('div', style=lambda s: s and 'background' in s and 'url' in s)
                if div_bg:
                    match = re.search(r'url\(["\']?([^"\'\)]+)["\']?\)', div_bg['style'])
                    if match:
                        img_path = match.group(1)
                        image = img_path.replace('static/images/', 'images/')

                if not button_text:
                    button_text = 'Получить консультацию'
                    button_url = '/contacts/'

                HeroSlide.objects.create(
                    title=title,
                    subtitle=subtitle,
                    description=description,
                    image=image,
                    button_text=button_text,
                    button_url=button_url,
                    order=i,
                    is_active=True,
                )
                created += 1
                print(f'  ✓ Создан слайд: {title}')
            except Exception as e:
                print(f'  ⚠ Ошибка парсинга слайда {i}: {e}')
                continue

    if created == 0:
        print('  ⚠ Парсинг не дал результатов. Создаю из известных данных...')
        slides_data = [
            ('Инжиниринг и Автоматизация', 'АСУ ТП', 'Проектирование и внедрение систем автоматизации технологических процессов (АСУ ТП) для промышленных объектов любой сложности.', 'images/hero-industrial.webp'),
            ('Поставка газового оборудования', 'Оборудование', 'Широкий ассортимент промышленного и бытового газового оборудования от ведущих мировых производителей.', 'images/hero-supply.webp'),
            ('Проектирование систем Умного дома', 'Smart Home', 'Комплексные решения автоматизации жилых помещений: климат-контроль, освещение, безопасность и мультимедиа.', 'images/hero-smarthome.webp'),
            ('Гарантийное и сервисное обслуживание', 'Сервис', 'Оперативное сервисное обслуживание, ремонт и техническая поддержка всего поставляемого оборудования.', 'images/hero-service.webp'),
        ]
        for i, (title, sub, desc, img) in enumerate(slides_data):
            HeroSlide.objects.create(
                title=title,
                subtitle=sub,
                description=desc,
                image=img,
                button_text='Получить консультацию',
                button_url='/contacts/',
                order=i,
                is_active=True,
            )
            created += 1
            print(f'  ✓ Создан слайд: {title}')

    print(f'  Итого: {created} слайдов создано')
    return created


# ============================================================
# 6. ИМПОРТ КАТАЛОГА
# ============================================================
def import_catalog():
    """Парсит страницы каталога и создаёт категории и товары."""
    print('\n--- Импорт каталога ---')

    Category.objects.all().delete()
    Product.objects.all().delete()

    catalog_pages = [
        ('catalog-industrial.html', 'Промышленное газовое оборудование', 'Высококачественное промышленное газовое оборудование от ведущих мировых производителей'),
        ('catalog-boilers.html', 'Бытовые котлы', 'Настенные, напольные и двухконтурные котлы от ведущих производителей'),
        ('catalog-smarthome.html', 'Системы «Умный дом»', 'Комплексные решения автоматизации жилых помещений'),
        ('catalog-kipia.html', 'Оборудование КИПиА', 'Контрольно-измерительные приборы и средства автоматизации'),
    ]

    categories_created = 0
    products_created = 0

    for idx, (filename, cat_name, cat_desc) in enumerate(catalog_pages):
        try:
            html = read_html(filename)
        except FileNotFoundError:
            print(f'  ⚠ Файл {filename} не найден, пропускаю')
            continue

        soup = BeautifulSoup(html, 'html.parser')

        try:
            # Создаём категорию
            slug = make_unique_slug(Category, cat_name)
            category = Category.objects.create(
                name=cat_name,
                slug=slug,
                description=cat_desc,
                order=idx,
                is_active=True,
            )
            categories_created += 1
            print(f'  ✓ Создана категория: {cat_name}')
        except Exception as e:
            print(f'  ⚠ Ошибка создания категории "{cat_name}": {e}')
            continue

        # Парсим секции с товарами
        sections = soup.find_all('section')
        product_order = 0

        for section in sections:
            # Ищем grid с товарами
            grid = section.find('div', class_=lambda c: c and 'grid' in c)
            if not grid:
                continue

            # Карточки товаров
            product_cards = grid.find_all('div', class_=lambda c: c and ('rounded-2xl' in c or 'rounded-xl' in c))

            for card in product_cards:
                try:
                    h3 = card.find('h3')
                    if not h3:
                        continue
                    name = clean_text(h3.get_text())
                    if len(name) < 3:
                        continue

                    # Изображение
                    img_tag = card.find('img')
                    image = extract_image_src(img_tag)

                    # Характеристики
                    characteristics = ''
                    chars_divs = card.find_all('div', class_=lambda c: c and ('text-xs' in str(c) or 'space-y-1' in str(c)) if c else False)
                    for cd in chars_divs:
                        lines = []
                        for p in cd.find_all('p'):
                            t = clean_text(p.get_text())
                            if t and len(t) < 100:
                                lines.append(t)
                        if lines:
                            characteristics = '\n'.join(lines)
                            break

                    # Если не нашли через div, ищем p с коротким текстом
                    if not characteristics:
                        for p in card.find_all('p'):
                            t = clean_text(p.get_text())
                            if t and len(t) < 80 and '₸' in t:
                                characteristics = t
                                break

                    # Описание
                    description = ''
                    for p in card.find_all('p'):
                        t = clean_text(p.get_text())
                        if t and len(t) > 50:
                            description = t
                            break

                    # Проверяем уникальность
                    slug = make_unique_slug(Product, name)

                    Product.objects.create(
                        category=category,
                        name=name,
                        slug=slug,
                        description=description[:500],
                        characteristics=characteristics,
                        image=image,
                        order=product_order,
                        is_active=True,
                    )
                    products_created += 1
                    product_order += 1
                    print(f'  ✓ Создан товар: {name}')

                except Exception as e:
                    name_short = clean_text(card.get_text())[:40] if card.get_text() else 'unknown'
                    print(f'  ⚠ Ошибка парсинга товара: {e}')
                    continue

    print(f'  Итого: {categories_created} категорий, {products_created} товаров создано')
    return categories_created, products_created


# ============================================================
# MAIN
# ============================================================
def main():
    """Главная функция импорта."""
    print('=' * 60)
    print('ИМПОРТ КОНТЕНТА СТАРОГО САЙТА GAS INPEX')
    print('=' * 60)
    print()

    results = {}

    try:
        results['services'] = import_services()
    except Exception as e:
        print(f'  ❌ Ошибка импорта услуг: {e}')
        results['services'] = 0

    try:
        results['projects'] = import_projects()
    except Exception as e:
        print(f'  ❌ Ошибка импорта проектов: {e}')
        results['projects'] = 0

    try:
        results['partners'] = import_partners()
    except Exception as e:
        print(f'  ❌ Ошибка импорта партнёров: {e}')
        results['partners'] = 0

    try:
        results['certificates'] = import_certificates()
    except Exception as e:
        print(f'  ❌ Ошибка импорта сертификатов: {e}')
        results['certificates'] = 0

    try:
        results['hero_slides'] = import_hero_slides()
    except Exception as e:
        print(f'  ❌ Ошибка импорта слайдов: {e}')
        results['hero_slides'] = 0

    try:
        cats, prods = import_catalog()
        results['categories'] = cats
        results['products'] = prods
    except Exception as e:
        print(f'  ❌ Ошибка импорта каталога: {e}')
        results['categories'] = 0
        results['products'] = 0

    print()
    print('=' * 60)
    print('РЕЗУЛЬТАТ ИМПОРТА:')
    print(f'  Услуги:     {results.get("services", 0)}')
    print(f'  Проекты:    {results.get("projects", 0)}')
    print(f'  Партнёры:   {results.get("partners", 0)}')
    print(f'  Сертификаты:{results.get("certificates", 0)}')
    print(f'  Слайды:     {results.get("hero_slides", 0)}')
    print(f'  Категории:  {results.get("categories", 0)}')
    print(f'  Товары:     {results.get("products", 0)}')
    print('=' * 60)


if __name__ == '__main__':
    main()