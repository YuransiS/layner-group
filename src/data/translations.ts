export type Language = "ro" | "bg";

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
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    tags: string[];
    namePlaceholder: string;
    phonePlaceholder: string;
    ctaButton: string;
    loading: string;
  };
  whyUs: {
    title: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  about: {
    title: string;
    desc1: string;
    desc2: string;
    tags: string[];
  };
  target: {
    title: string;
    note: string;
    items: {
      title: string;
      icon: string;
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
    phoneError: string;
    consentError: string;
    errorMessage: string;
  };
  footer: {
    rights: string;
    location: string;
  };
}

export const translations: Record<Language, Translations> = {
  ro: {
    nav: {
      whyUs: "De ce noi",
      about: "Despre Layner Group",
      whoWeLookFor: "Pe cine căutăm",
      howToStart: "Cum începeți",
      faq: "Întrebări frecvente",
      ctaButton: "Deveniți partener",
    },
    hero: {
      badge: "Logistică Europeană · B2B",
      title: "Deveniți partener Layner Group",
      titlePrefix: "Deveniți partener ",
      titleHighlight: "Layner Group",
      subtitle:
        "Încărcături zilnice în Europa pentru proprietarii de camioane cu prelată. Tarif fix pe km + kilometraj garantat în fiecare lună.",
      tags: [
        "Tarif fix pe km",
        "Kilometraj garantat",
        "Plată în euro",
      ],
      namePlaceholder: "Nume",
      phonePlaceholder: "Număr de telefon",
      ctaButton: "Deveniți partener",
      loading: "Se trimite...",
    },
    whyUs: {
      title: "De ce să începeți colaborarea cu noi?",
      items: [
        {
          title: "Tarif fix pe km",
          desc: "Un singur tarif, indiferent de gradul de încărcare.",
        },
        {
          title: "Kilometraj garantat",
          desc: "Stabilim din timp volumul de km pe lună.",
        },
        {
          title: "Încărcături în fiecare zi",
          desc: "Clienți proprii + 5+ burse de transport.",
        },
        {
          title: "Ruta o construim noi",
          desc: "Nu trebuie să căutați singuri marfă.",
        },
        {
          title: "Plata în euro",
          desc: "La 30 de zile sau prin factoring.",
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
        "birou în Franța",
        "transport în toată Europa",
        "plată în euro",
      ],
    },
    target: {
      title: "Pe cine căutăm",
      note: "Colaborăm atât cu proprietari de un singur camion, cât și cu companii cu flotă proprie.",
      items: [
        {
          icon: "🚛",
          title: "Proprietari de camioane cu prelată",
        },
        {
          icon: "🇪🇺",
          title: "Licență UE + CMR",
        },
        {
          icon: "🏢",
          title: "Firmă de transport proprie",
        },
        {
          icon: "⏱",
          title: "Respectarea termenelor",
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
      namePlaceholder: "Nume",
      truckLabel: "Numărul de camioane cu prelată și tonajul",
      truckPlaceholder: "Numărul de camioane cu prelată și tonajul",
      departureLabel: "Din ce loc plecați",
      departurePlaceholder: "Din ce loc plecați",
      phoneLabel: "Telefon / WhatsApp",
      phonePlaceholder: "+40... sau 07...",
      licenseLabel: "Aveți licență UE și CMR?",
      licenseYes: "Da",
      licenseNo: "Nu / În curs",
      consentText: "Sunt de acord cu prelucrarea datelor cu caracter personal",
      submitButton: "Trimiteți cererea",
      submitting: "Se trimite...",
      successMessage: "Gata! Vă scriem pe WhatsApp în cursul zilei lucrătoare.",
      phoneError: "Vă rugăm să introduceți un număr de telefon valid",
      consentError: "Este necesar acordul pentru prelucrarea datelor cu caracter personal",
      errorMessage: "Nu s-a putut trimite cererea. Vă rugăm să încercați din nou",
    },
    footer: {
      rights: "Layner Group. Toate drepturile rezervate.",
      location: "Companie poloneză · birou în Franța · transport în toată Europa · plată în euro",
    },
  },

  bg: {
    nav: {
      whyUs: "Защо нас",
      about: "За Layner Group",
      whoWeLookFor: "Кого търсим",
      howToStart: "Как да започнете",
      faq: "Често задавани въпроси",
      ctaButton: "Станете партньор",
    },
    hero: {
      badge: "Европейска логистика · B2B",
      title: "Станете партньор на Layner Group",
      titlePrefix: "Станете партньор на ",
      titleHighlight: "Layner Group",
      subtitle:
        "Ежедневни товари из цяла Европа за собственици на тентови камиони. Фиксирана ставка на км + гарантиран километраж всеки месец.",
      tags: [
        "Фиксирана ставка на км",
        "Гарантиран километраж",
        "Плащане в евро",
      ],
      namePlaceholder: "Име",
      phonePlaceholder: "Телефонен номер",
      ctaButton: "Станете партньор",
      loading: "Изпращане...",
    },
    whyUs: {
      title: "Защо да започнете работа с нас?",
      items: [
        {
          title: "Фиксирана ставка на км",
          desc: "Една ставка независимо от натоварването.",
        },
        {
          title: "Гарантиран километраж",
          desc: "Предварително договаряме обема километри за месеца.",
        },
        {
          title: "Товари всеки ден",
          desc: "Собствени клиенти + 5+ транспортни борси.",
        },
        {
          title: "Маршрута изграждаме ние",
          desc: "Не е нужно сами да търсите товари.",
        },
        {
          title: "Плащане в евро",
          desc: "След 30 дни или чрез факторинг.",
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
        "офис във Франция",
        "работа из цяла Европа",
        "плащане в евро",
      ],
    },
    target: {
      title: "Кого търсим",
      note: "Работим както със собственици на един камион, така и с фирми със собствен автопарк.",
      items: [
        {
          icon: "🚛",
          title: "Собственици на тентови камиони",
        },
        {
          icon: "🇪🇺",
          title: "Лиценз на ЕС + CMR",
        },
        {
          icon: "🏢",
          title: "Собствена транспортна фирма",
        },
        {
          icon: "⏱",
          title: "Спазване на сроковете",
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
      namePlaceholder: "Име",
      truckLabel: "Брой тентови камиони и товароподемност",
      truckPlaceholder: "Брой тентови камиони и товароподемност",
      departureLabel: "От къде тръгвате",
      departurePlaceholder: "От къде тръгвате",
      phoneLabel: "Телефон / WhatsApp",
      phonePlaceholder: "+359... или 088...",
      licenseLabel: "Имате ли лиценз на ЕС и CMR?",
      licenseYes: "Да",
      licenseNo: "Не / В процес",
      consentText: "Съгласен/а съм с обработването на личните ми данни",
      submitButton: "Изпратете заявката",
      submitting: "Изпращане...",
      successMessage:
        "Готово! Ще ви пишем в WhatsApp до края на работния ден.",
      phoneError: "Моля, въведете валиден телефонен номер",
      consentError: "Необходимо е съгласие за обработване на личните данни",
      errorMessage: "Не успяхме да изпратим заявката. Моля, опитайте отново",
    },
    footer: {
      rights: "Layner Group. Всички права запазени.",
      location: "Полска компания · офис във Франция · работа из цяла Европа · плащане в евро",
    },
  },
};
