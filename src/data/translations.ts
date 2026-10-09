export type Language = "ru" | "bg" | "ro";

export interface Translations {
  nav: {
    whyUs: string;
    about: string;
    whoWeLookFor: string;
    howToStart: string;
    faq: string;
    ctaButton: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    ctaButton: string;
    loading: string;
  };
  whyUs: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
      tag: string;
    }[];
  };
  about: {
    title: string;
    desc1: string;
    desc2: string;
    tags: string[];
    stats: {
      value: string;
      label: string;
    }[];
  };
  target: {
    title: string;
    note: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  steps: {
    title: string;
    items: {
      num: string;
      title: string;
      desc: string;
    }[];
    ctaButton: string;
  };
  faq: {
    title: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  form: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    truckLabel: string;
    truckPlaceholder: string;
    departureLabel: string;
    departurePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    licenseLabel: string;
    licenseYes: string;
    licenseNo: string;
    consentText: string;
    submitButton: string;
    submitting: string;
    successMessage: string;
  };
  modal: {
    title: string;
    text: string;
    close: string;
  };
  footer: {
    rights: string;
    location: string;
    privacy: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    nav: {
      whyUs: "Преимущества",
      about: "О компании",
      whoWeLookFor: "Кого ищем",
      howToStart: "Как начать",
      faq: "FAQ",
      ctaButton: "Стать партнёром",
    },
    hero: {
      badge: "ЛОГИСТИКА ПО ВСЕЙ ЕВРОПЕ · 24/7",
      title: "Стань партнёром Layner Group",
      subtitle:
        "Ежедневные загрузки по Европе для владельцев тентованных машин. Фиксированная ставка за км + гарантированный километраж каждый месяц.",
      namePlaceholder: "Ваше имя",
      phonePlaceholder: "Номер телефона / WhatsApp",
      ctaButton: "Стать партнёром",
      loading: "Отправка...",
    },
    whyUs: {
      title: "Почему стоит начать работать с нами?",
      subtitle: "Прозрачные условия, надежность и полное экспедиторское сопровождение",
      items: [
        {
          title: "Фиксированная ставка за км",
          desc: "Одна ставка независимо от загрузки.",
          tag: "Тариф",
        },
        {
          title: "Гарантированный километраж",
          desc: "Заранее согласовываем объём км на месяц.",
          tag: "Объем",
        },
        {
          title: "Загрузки каждый день",
          desc: "Свои клиенты + 5+ транспортных бирж.",
          tag: "Поток",
        },
        {
          title: "Маршрут строим мы",
          desc: "Не нужно самостоятельно искать грузы.",
          tag: "Диспетчер",
        },
        {
          title: "Оплата в евро",
          desc: "Через 30 дней или факторинг.",
          tag: "Финансы",
        },
      ],
    },
    about: {
      title: "О Layner Group",
      desc1:
        "Layner Group — транспортная компания с 5+ годами опыта и 10 000+ рейсов по Европе.",
      desc2:
        "У нас собственные клиенты и 5+ транспортных бирж. Наши логисты ищут загрузки и планируют маршруты, чтобы ваши машины меньше простаивали.",
      tags: [
        "Польская компания",
        "Офис во Франции",
        "Работа по Европе",
        "Оплата в евро",
      ],
      stats: [
        { value: "5+ лет", label: "Опыта на рынке ЕС" },
        { value: "10 000+", label: "Успешных рейсов" },
        { value: "5+", label: "Транспортных бирж" },
        { value: "24/7", label: "Поддержка логистов" },
      ],
    },
    target: {
      title: "Кого мы ищем",
      note: "Работаем как с владельцами одной машины, так и с компаниями с собственным парком.",
      items: [
        {
          title: "Владельцев тентованных машин",
          desc: "Тентованные полуприцепы и автопоезда под европейские перевозки",
        },
        {
          title: "Лицензия ЕС + CMR",
          desc: "Действующая международная транспортная лицензия и страховка CMR",
        },
        {
          title: "Собственная транспортная компания",
          desc: "Официальное юридическое лицо (EU) или индивидуальный предприниматель",
        },
        {
          title: "Соблюдение сроков",
          desc: "Пунктуальность и ответственный подход к графикам подачи машин",
        },
      ],
    },
    steps: {
      title: "Как начать",
      items: [
        {
          num: "01",
          title: "Оставьте заявку",
          desc: "1 минута на заполнение формы.",
        },
        {
          num: "02",
          title: "Получите условия",
          desc: "Ставка, километраж и оплата в WhatsApp.",
        },
        {
          num: "03",
          title: "Получите загрузку",
          desc: "Машина готова, начинаем искать груз.",
        },
      ],
      ctaButton: "Стать партнёром Layner Group",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "Когда первый груз?",
          a: "Обычно от 3 дней до 2 недель.",
        },
        {
          q: "Платите за порожний пробег?",
          a: "Да. Каждый километр оплачивается по одной ставке.",
        },
        {
          q: "Когда я получу деньги?",
          a: "Через 30 дней. Факторинг — на следующий день. Быстрая оплата через 3 дня, комиссия 7%.",
        },
        {
          q: "Не говорю по-польски или английски — проблема?",
          a: "Нет. Общаемся в WhatsApp на вашем языке.",
        },
      ],
    },
    form: {
      title: "Станьте партнёром Layner Group",
      subtitle: "Оставьте заявку — менеджер свяжется с вами в WhatsApp.",
      nameLabel: "Имя",
      namePlaceholder: "Ваше имя или название компании",
      truckLabel: "Количество тентованных машин и вес",
      truckPlaceholder: "Например: 2 тягача с тентом, 24 т",
      departureLabel: "Откуда выезжаете",
      departurePlaceholder: "Город, страна стоянки / базирования",
      phoneLabel: "Телефон / WhatsApp",
      phonePlaceholder: "+XXXXXXXXXXXX",
      licenseLabel: "Есть лицензия ЕС и CMR?",
      licenseYes: "Да, есть все документы",
      licenseNo: "В процессе оформления",
      consentText: "Согласен на обработку персональных данных",
      submitButton: "Отправить заявку",
      submitting: "Отправка заявки...",
      successMessage:
        "Готово! Напишем вам в WhatsApp в течение рабочего дня.",
    },
    modal: {
      title: "Заявка успешно принята!",
      text: "Готово! Напишем вам в WhatsApp в течение рабочего дня.",
      close: "Отлично",
    },
    footer: {
      rights: "Layner Group. Все права защищены.",
      location: "Польша · Франция · Общеевропейская сеть перевозок",
      privacy: "Конфиденциальность и безопасность данных",
    },
  },

  bg: {
    nav: {
      whyUs: "Предимства",
      about: "За нас",
      whoWeLookFor: "Кого търсим",
      howToStart: "Как да започнете",
      faq: "Въпроси",
      ctaButton: "Станете партньор",
    },
    hero: {
      badge: "ЛОГИСТИКА ИЗ ЦЯЛА ЕВРОПА · 24/7",
      title: "Станете партньор на Layner Group",
      subtitle:
        "Ежедневни товари из цяла Европа за собственици на тентови камиони. Фиксирана ставка на км + гарантиран километраж всеки месец.",
      namePlaceholder: "Вашето име",
      phonePlaceholder: "Телефонен номер / WhatsApp",
      ctaButton: "Станете партньор",
      loading: "Изпращане...",
    },
    whyUs: {
      title: "Защо да започнете работа с нас?",
      subtitle: "Прозрачни условия, надеждност и пълна логистична подкрепа",
      items: [
        {
          title: "Фиксирана ставка на км",
          desc: "Една ставка независимо от натоварването.",
          tag: "Тарифа",
        },
        {
          title: "Гарантиран километраж",
          desc: "Предварително договаряме обема километри за месеца.",
          tag: "Обем",
        },
        {
          title: "Товари всеки ден",
          desc: "Собствени клиенти + 5+ транспортни борси.",
          tag: "Поток",
        },
        {
          title: "Маршрута изграждаме ние",
          desc: "Не е нужно сами да търсите товари.",
          tag: "Диспечер",
        },
        {
          title: "Плащане в евро",
          desc: "След 30 дни или чрез факторинг.",
          tag: "Финанси",
        },
      ],
    },
    about: {
      title: "За Layner Group",
      desc1:
        "Layner Group е транспортна компания с над 5 години опит и над 10 000 курса из Европа.",
      desc2:
        "Имаме собствени клиенти и 5+ транспортни борси. Нашите логисти търсят товари и планират маршрути, за да престояват камионите ви по-малко.",
      tags: [
        "Полска компания",
        "Офис във Франция",
        "Работа из цяла Европа",
        "Плащане в евро",
      ],
      stats: [
        { value: "5+ години", label: "Опит на пазара на ЕС" },
        { value: "10 000+", label: "Изпълнени курсове" },
        { value: "5+", label: "Транспортни борси" },
        { value: "24/7", label: "Логистична поддръжка" },
      ],
    },
    target: {
      title: "Кого търсим",
      note: "Работим както със собственици на един камион, така и с фирми със собствен автопарк.",
      items: [
        {
          title: "Собственици на тентови камиони",
          desc: "Тентови полуремаркета и композиции за европейски превози",
        },
        {
          title: "Лиценз на ЕС + CMR",
          desc: "Валиден международен лиценз за транспорт и CMR застраховка",
        },
        {
          title: "Собствена транспортна фирма",
          desc: "Официално регистрирана фирма в ЕС или едноличен търговец",
        },
        {
          title: "Спазване на сроковете",
          desc: "Точност и отговорен подход към графиците за товарене",
        },
      ],
    },
    steps: {
      title: "Как да започнете",
      items: [
        {
          num: "01",
          title: "Изпратете заявка",
          desc: "1 минута за попълване на формата.",
        },
        {
          num: "02",
          title: "Получете условията",
          desc: "Ставка, километраж и плащане в WhatsApp.",
        },
        {
          num: "03",
          title: "Получете товар",
          desc: "Камионът е готов, започваме да търсим товар.",
        },
      ],
      ctaButton: "Станете партньор на Layner Group",
    },
    faq: {
      title: "Често задавани въпроси",
      items: [
        {
          q: "Кога ще е първият товар?",
          a: "Обикновено от 3 дни до 2 седмици.",
        },
        {
          q: "Плащате ли за празен пробег?",
          a: "Да. Всеки километър се заплаща по една и съща ставка.",
        },
        {
          q: "Кога ще получа парите?",
          a: "След 30 дни. Факторинг – на следващия ден. Бързо плащане за 3 дни, комисиона 7%.",
        },
        {
          q: "Не говоря полски или английски – проблем ли е?",
          a: "Не. Общуваме в WhatsApp на вашия език.",
        },
      ],
    },
    form: {
      title: "Станете партньор на Layner Group",
      subtitle: "Оставете заявка – мениджър ще се свърже с вас в WhatsApp.",
      nameLabel: "Име",
      namePlaceholder: "Вашето име или фирма",
      truckLabel: "Брой тентови камиони и товароподемност",
      truckPlaceholder: "Напр.: 2 влекача с щора, 24 т",
      departureLabel: "От къде тръгвате",
      departurePlaceholder: "Град, държава на паркиране/база",
      phoneLabel: "Телефон / WhatsApp",
      phonePlaceholder: "+XXXXXXXXXXXX",
      licenseLabel: "Имате ли лиценз на ЕС и CMR?",
      licenseYes: "Да, имам всички документи",
      licenseNo: "В процес на оформяне",
      consentText: "Съгласен/а съм с обработването на личните ми данни",
      submitButton: "Изпратете заявката",
      submitting: "Изпращане на заявката...",
      successMessage:
        "Готово! Ще ви пишем в WhatsApp до края на работния ден.",
    },
    modal: {
      title: "Заявката е приета успешно!",
      text: "Готово! Ще ви пишем в WhatsApp до края на работния ден.",
      close: "Разбрах",
    },
    footer: {
      rights: "Layner Group. Всички права запазени.",
      location: "Полша · Франция · Общоевропейска мрежа за превози",
      privacy: "Поверителност и сигурност на данните",
    },
  },

  ro: {
    nav: {
      whyUs: "Avantaje",
      about: "Despre noi",
      whoWeLookFor: "Pe cine căutăm",
      howToStart: "Cum începeți",
      faq: "Întrebări frecvente",
      ctaButton: "Deveniți partener",
    },
    hero: {
      badge: "LOGISTICĂ ÎN TOATĂ EUROPA · 24/7",
      title: "Deveniți partener Layner Group",
      subtitle:
        "Încărcături zilnice în Europa pentru proprietarii de camioane cu prelată. Tarif fix pe km + kilometraj garantat în fiecare lună.",
      namePlaceholder: "Numele dvs.",
      phonePlaceholder: "Număr de telefon / WhatsApp",
      ctaButton: "Deveniți partener",
      loading: "Se trimite...",
    },
    whyUs: {
      title: "De ce să începeți colaborarea cu noi?",
      subtitle: "Condiții transparente, siguranță și asistență logistică completă",
      items: [
        {
          title: "Tarif fix pe km",
          desc: "Un singur tarif, indiferent de gradul de încărcare.",
          tag: "Tarif",
        },
        {
          title: "Kilometraj garantat",
          desc: "Stabilim din timp volumul de km pe lună.",
          tag: "Volum",
        },
        {
          title: "Încărcături în fiecare zi",
          desc: "Clienți proprii + 5+ burse de transport.",
          tag: "Flux continuu",
        },
        {
          title: "Ruta o construim noi",
          desc: "Nu trebuie să căutați singuri marfă.",
          tag: "Dispecerat",
        },
        {
          title: "Plata în euro",
          desc: "La 30 de zile sau prin factoring.",
          tag: "Finanțe",
        },
      ],
    },
    about: {
      title: "Despre Layner Group",
      desc1:
        "Layner Group este o companie de transport cu peste 5 ani de experiență și peste 10 000 de curse în Europa.",
      desc2:
        "Avem clienți proprii și 5+ burse de transport. Logisticienii noștri caută încărcături și planifică rutele, astfel încât camioanele dvs. să stea cât mai puțin nefolosite.",
      tags: [
        "Companie poloneză",
        "Birou în Franța",
        "Transport în toată Europa",
        "Plată în euro",
      ],
      stats: [
        { value: "5+ ani", label: "Experiență pe piața UE" },
        { value: "10 000+", label: "Curse finalizate" },
        { value: "5+", label: "Burse de transport" },
        { value: "24/7", label: "Asistență dispeceri" },
      ],
    },
    target: {
      title: "Pe cine căutăm",
      note: "Colaborăm atât cu proprietari de un singur camion, cât și cu companii cu flotă proprie.",
      items: [
        {
          title: "Proprietari de camioane cu prelată",
          desc: "Semiremorci și ansambluri cu prelată pregătite pentru transport european",
        },
        {
          title: "Licență UE + CMR",
          desc: "Licență valabilă de transport comunitar și asigurare CMR activă",
        },
        {
          title: "Firmă de transport proprie",
          desc: "Persoană juridică înregistrată în UE sau întreprindere individuală",
        },
        {
          title: "Respectarea termenelor",
          desc: "Punctualitate și atitudine responsabilă față de programul de încărcare/descărcare",
        },
      ],
    },
    steps: {
      title: "Cum începeți",
      items: [
        {
          num: "01",
          title: "Trimiteți cererea",
          desc: "1 minut pentru completarea formularului.",
        },
        {
          num: "02",
          title: "Primiți condițiile",
          desc: "Tarif, kilometraj și plată pe WhatsApp.",
        },
        {
          num: "03",
          title: "Primiți încărcătura",
          desc: "Camionul este pregătit, începem să căutăm marfă.",
        },
      ],
      ctaButton: "Deveniți partener Layner Group",
    },
    faq: {
      title: "Întrebări frecvente",
      items: [
        {
          q: "Când va fi prima încărcătură?",
          a: "De obicei între 3 zile și 2 săptămâni.",
        },
        {
          q: "Plătiți kilometrii parcurși în gol?",
          a: "Da. Fiecare kilometru se plătește la același tarif.",
        },
        {
          q: "Când primesc banii?",
          a: "După 30 de zile. Factoring – a doua zi. Plată rapidă în 3 zile, comision 7%.",
        },
        {
          q: "Nu vorbesc poloneză sau engleză – este o problemă?",
          a: "Nu. Comunicăm pe WhatsApp în limba dvs.",
        },
      ],
    },
    form: {
      title: "Deveniți partener Layner Group",
      subtitle: "Lăsați o cerere – un manager vă va contacta pe WhatsApp.",
      nameLabel: "Nume",
      namePlaceholder: "Numele dvs. sau numele companiei",
      truckLabel: "Numărul de camioane cu prelată și tonajul",
      truckPlaceholder: "Ex: 2 capete tractor cu prelată, 24 t",
      departureLabel: "Din ce loc plecați",
      departurePlaceholder: "Orașul, țara unde este baza sau parcarea",
      phoneLabel: "Telefon / WhatsApp",
      phonePlaceholder: "+XXXXXXXXXXXX",
      licenseLabel: "Aveți licență UE și CMR?",
      licenseYes: "Da, dețin toate documentele",
      licenseNo: "În curs de obținere",
      consentText: "Sunt de acord cu prelucrarea datelor cu caracter personal",
      submitButton: "Trimiteți cererea",
      submitting: "Se trimite cererea...",
      successMessage: "Gata! Vă scriem pe WhatsApp în cursul zilei lucrătoare.",
    },
    modal: {
      title: "Cererea a fost trimisă cu succes!",
      text: "Gata! Vă scriem pe WhatsApp în cursul zilei lucrătoare.",
      close: "Am înțeles",
    },
    footer: {
      rights: "Layner Group. Toate drepturile rezervate.",
      location: "Polonia · Franța · Rețea de transport paneuropeană",
      privacy: "Confidențialitatea și securitatea datelor",
    },
  },
};
