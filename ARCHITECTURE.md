# ARCHITECTURE.md — Layner Group Freight Partner Landing

## 1. СТАТУС ПРОЕКТА И СТЕК
- **Статус:** Активная разработка (Production Ready & Conversion Optimized)
- **Фреймворк:** Next.js 16 (App Router), React 19, TypeScript
- **Стилизация:** Tailwind CSS v4, Lucide React, Framer Motion
- **Типографика (Brandbook):**
  - Заголовки: `Archivo` (Semi-Condensed, Bold)
  - Основной текст: `Inter`
  - Акценты / цифры: `Barlow Condensed`
- **Палитра (Brandbook):**
  - Primary Teal: `#237D73`
  - Dark Teal: `#123D39`
  - Graphite: `#161D1C`
  - Off White: `#F4F3EE`
  - Route Gray: `#C9CFCC`
  - Soft Gray: `#D9E0DD`
  - Signal Lime: `#D9FF43`
- **Интеграция лидов:** Next.js Server Route `/api/lead` (Vercel IP & Geo Headers) -> Google Apps Script Web App (`/exec`) -> Google Таблицы
- **Аналитика:** Meta Pixel (ID: 1478474474170852) с Dual-Storage Attribution (localStorage + 30-day 1st-party Cookie)

---

## 2. КАРТА ПУТЕЙ И ФАЙЛОВАЯ СТРУКТУРА
```text
fervent-kepler/
├── public/
│   ├── images/
│   │   ├── hero-truck.jpg        # Фирменный европейский тентованный трак (desktop)
│   │   ├── hero-truck-mobile.jpg # Вертикальный 9:16 трак на всю Hero-секцию (mobile)
│   │   ├── fleet-hub.jpg          # Логистический хаб / диспетчерский центр Layner Group
│   │   └── og-preview.jpg         # Мета-превью для социальных сетей и мессенджеров
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css           # Brand tokens, Google Fonts, reset
│   │   ├── layout.tsx            # Метаданные, viewport, Meta Pixel в SSR head
│   │   ├── page.tsx              # Главный лендинг (/) с умным языковым определением
│   │   ├── [lang]/
│   │   │   └── page.tsx          # Локализованные рекламные роуты (/ro, /bg) со статическим SSG
│   │   └── api/
│   │       └── lead/route.ts     # Серверная ручка приема лидов с IP/Geo Vercel
│   ├── components/
│   │   ├── LandingPage.tsx       # Корневая обертка лендинга с LanguageProvider
│   │   ├── Header.tsx            # Навигация, логотип, выпадающий список языков RO/BG с роутингом URL и CTA
│   │   ├── HeroSection.tsx       # H1, оффер, CTA кнопка (скролл + авто-фокус на десктопе / модалка на мобилке)
│   │   ├── WhyUsSection.tsx      # Преимущества (5 пунктов строго из ТЗ)
│   │   ├── AboutSection.tsx      # О Layner Group (опыт, рейсы, биржи, география)
│   │   ├── TargetAudience.tsx    # Кого мы ищем (4 категории)
│   │   ├── StepsSection.tsx      # 3 шага старта работы
│   │   ├── FaqSection.tsx        # Аккордеон с 4 вопросами из ТЗ
│   │   ├── MetaPixel.tsx         # Meta Pixel helper + Dual-Storage инициализация
│   │   ├── UnifiedPartnerForm.tsx# Высококонверсионная единая форма с валидацией телефонов ЕС/Болгарии
│   │   ├── PartnerForm.tsx       # Нижняя секция лендинга с единой формой
│   │   ├── LeadModal.tsx         # Модальное окно (lock body scroll, click outside close, Esc listener)
│   │   ├── SuccessModal.tsx      # Модальное окно подтверждения заявки + confetti
│   │   └── Footer.tsx            # Минималистичный футер
│   ├── context/
│   │   └── LanguageContext.tsx   # Мультифакторный детект (pathname -> query -> localStorage -> timezone -> fallback)
│   ├── data/
│   │   └── translations.ts       # Контент на 2-х языках (RO - основной, BG)
│   └── lib/
│       ├── pixel.ts              # Meta Pixel helper + Dual-Storage (localStorage + 30-day Cookie)
│       ├── sendLead.ts           # Сервис отправки заявок в Google Apps Script + UTMs
│       └── utils.ts              # cn helper (clsx + twMerge)
└── ARCHITECTURE.md
```

---

## 3. МЕХАНИКА КОНВЕРСИИ И ВАЛИДАЦИИ (CONVERSION PIPELINE)

### Языковая маршрутизация и рекламный трафик
1. **URL Path (/bg, /ro):** Имеет наивысший приоритет. При переходе по ссылке рекламы на `/bg` страница гарантированно рендерится на болгарском языке.
2. **URL Query Param (?lang=bg / ?lang=ro):** Поддерживается для параметров трекинга рекламных кампаний.
3. **Анализ часового пояса:** При открытии с устройств с английским языком системы (`en-US`/`en-GB`), система автоматически определяет пользователей из Болгарии (`Europe/Sofia` -> `bg`) и Румынии (`Europe/Bucharest` -> `ro`).
4. **Сохранение и синхронизация:** Выбор языка фиксируется в `localStorage`.

### Форма захвата и валидация
1. **Согласие (GDPR / Персональные данные):** Чекбокс согласия активирован по умолчанию (`true`), устраняя критический барьер конверсии на мобильных устройствах.
2. **Формат номеров телефонов:** Валидатор поддерживает европейские, болгарские и международные форматы (от 7 до 16 цифр), корректно обрабатывая префиксы `088...`, `+359...`, разделители `/`, `-`, `.` и пробелы.
3. **Обратная связь интерфейса:** Индикатор загрузки `Loader2` с анимацией во время ожидания Google Apps Script, мгновенная подсветка валидного номера `Check`, всплывающее окно подтверждения с салютом и вывод ошибок при сбоях сети.
4. **Meta Pixel Event Setup Tool:** Кнопкам добавлены явные идентификаторы `id="submit-partner-form"`, `id="hero-cta-button"`, `id="header-cta-button"` для распознавания инструментом настройки событий Facebook, а также отправляется программное событие `Lead` с параметрами `currency: "EUR"`.

---

## 4. СХЕМА ДАННЫХ И ЛОГИКА ИНТЕГРАЦИИ

### Google Apps Script Web App
- **Endpoint:** `https://script.google.com/macros/s/AKfycbwbjB_JP2e-CU0UPte24vOC_0ivzRskf21AcAUulsn-lyewvp2EcQmchARdtF9pZ9tD/exec`
- **Payload полей:**
  - `name`: Имя заявителя
  - `phone`: Номер телефона / WhatsApp
  - `truck_details`: Количество тентованных машин и вес
  - `departure`: Откуда выезжает
  - `has_license`: Наличие лицензии ЕС и CMR ("Da"/"Nu" для RO, "Да"/"Не" для BG)
  - `language`: Язык интерфейса на момент заявки (`ro`, `bg`)
  - `form_type`: `"full_application"`
  - `created_at`: ISO timestamp
  - `ip`: IP адрес клиента (определяется сервером Vercel)
  - `geo`: Город и страна (определяется сервером Vercel)
  - `source`: URL источника перехода
  - `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `bw_cid`, `visitor_uuid`

---

## 5. РАЗВЕРТЫВАНИЕ И ССЫЛКИ
- **Vercel Production URL:** [https://layner-group.vercel.app](https://layner-group.vercel.app)
- **Альтернативный домен:** [https://fervent-kepler.vercel.app](https://fervent-kepler.vercel.app)
- **Репозиторий GitHub:** [https://github.com/YuransiS/layner-group](https://github.com/YuransiS/layner-group)
- **CI/CD:** Vercel автоматический деплой при push в ветку `main` + GitHub Actions
