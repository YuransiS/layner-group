# ARCHITECTURE.md — Layner Group Freight Partner Landing

## 1. СТАТУС ПРОЕКТА И СТЕК
- **Статус:** Активная разработка (Production Ready)
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
- **Интеграция лидов:** Google Apps Script Web App (`/exec`) -> Google Таблицы

---

## 2. КАРТА ПУТЕЙ И ФАЙЛОВАЯ СТРУКТУРА
```text
fervent-kepler/
├── public/
│   ├── images/
│   │   ├── hero-truck.jpg        # Фирменный европейский тентованный трак (desktop)
│   │   ├── hero-truck-mobile.jpg # Вертикальный 9:16 трак на всю Hero-секцию (mobile)
│   │   └── fleet-hub.jpg          # Логистический хаб / диспетчерский центр Layner Group
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css           # Brand tokens, Google Fonts, reset
│   │   ├── layout.tsx            # Метаданные, viewport, html lang wrapper
│   │   └── page.tsx              # Главный лендинг (Hero, Benefits, About, Target, Steps, FAQ, Form, Footer)
│   ├── components/
│   │   ├── Header.tsx            # Навигация, логотип, выпадающий список языков RU/BG/RO
│   │   ├── HeroSection.tsx       # H1, оффер, единая CTA кнопка (скролл на десктопе / модалка на мобилке)
│   │   ├── WhyUsSection.tsx      # Преимущества (5 пунктов строго из ТЗ)
│   │   ├── AboutSection.tsx      # О Layner Group (опыт, рейсы, биржи, география)
│   │   ├── TargetAudience.tsx    # Кого мы ищем (4 категории)
│   │   ├── StepsSection.tsx      # 3 шага старта работы
│   │   ├── FaqSection.tsx        # Аккордеон с 4 вопросами из ТЗ
│   │   ├── UnifiedPartnerForm.tsx# Единая форма с жесткой валидацией телефона и отправкой в CRM
│   │   ├── PartnerForm.tsx       # Нижняя секция лендинга с единой формой
│   │   ├── LeadModal.tsx         # Модальное окно с единой формой для мобильных устройств
│   │   ├── SuccessModal.tsx      # Модальное окно подтверждения заявки
│   │   └── Footer.tsx            # Минималистичный футер
│   ├── context/
│   │   └── LanguageContext.tsx   # Автоопределение языка устройства (RU/BG/RO) + ручной свитчер
│   ├── data/
│   │   └── translations.ts       # Полный контент на 3-х языках (RU, BG, RO)
│   └── lib/
│       ├── sendLead.ts           # Сервис отправки заявок в Google Apps Script
│       └── utils.ts              # cn helper (clsx + twMerge)
└── ARCHITECTURE.md
```

---

## 3. СХЕМА ДАННЫХ И ЛОГИКА ИНТЕГРАЦИИ

### Google Apps Script Web App
- **Endpoint:** `https://script.google.com/macros/s/AKfycbwbjB_JP2e-CU0UPte24vOC_0ivzRskf21AcAUulsn-lyewvp2EcQmchARdtF9pZ9tD/exec`
- **Payload полей:**
  - `name`: Имя заявителя
  - `phone`: Номер телефона / WhatsApp
  - `truck_details`: Количество тентованных машин и вес (полная форма)
  - `departure`: Откуда выезжает (полная форма)
  - `has_license`: Наличие лицензии ЕС и CMR ("Да" / "Нет")
  - `language`: Язык интерфейса на момент заявки (`ru`, `bg`, `ro`)
  - `form_type`: `"quick_hero"` или `"full_application"`
  - `created_at`: ISO timestamp

---

## 4. UI/UX СТРАТЕГИЯ
- **Desktop & Mobile:** Адаптивная desktop-first + mobile-first верстка.
- **Языки:** Автоматический детект через `navigator.language` с мгновенным выбором в шапке (RU / BG / RO).
- **Минимализм:** Чистая эстетика логистического оператора, строгая геометрия, фирменный акцент Signal Lime (`#D9FF43`) на ключевых CTA кнопках.

---

## 5. РАЗВЕРТЫВАНИЕ И ССЫЛКИ
- **Vercel Production URL:** [https://layner-group.vercel.app](https://layner-group.vercel.app)
- **Альтернативный домен:** [https://fervent-kepler.vercel.app](https://fervent-kepler.vercel.app)
- **Репозиторий GitHub:** [https://github.com/YuransiS/layner-group](https://github.com/YuransiS/layner-group)
- **CI/CD:** Vercel автоматический деплой при push в ветку `main` + GitHub Actions (`.github/workflows/deploy.yml`)


