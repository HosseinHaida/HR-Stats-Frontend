export const appVersion = "۰.۹";
// export const apiUrl = "http://10.25.245.51:3000/api/v1";
export const apiUrl = "http://localhost:3000/api/v1";
export const militaryBaseName = "Shahid_Khazraii";

export const roles = {
  can_do_all: {
    label: "ادمین",
    badgeColor: "primary",
  },
  operator: {
    label: "متصدی آمار",
    badgeColor: "teal",
  },
  admin_head: {
    label: "رئیس اداری",
    badgeColor: "blue",
  },
  admin_succ: {
    label: "جانشین اداری",
    badgeColor: "blue-4",
  },
  head: {
    label: "فرمانده",
    badgeColor: "pink",
  },
  succ: {
    label: "جانشین",
    badgeColor: "pink-4",
  },
  can_upload_dastoor: {
    label: "متصدی سامانه دستور",
    badgeColor: "blue-grey",
  },
};

export const statuses = {
  Hazer: "حاضر",
  Negahban: "نگهبان",
  EsterahatNegahbani: "استراحت نگهبانی",
  EsterahatTirandazi: "استراحت تیراندازی",
  EsterahatShift: "استراحت شیفت",
  MamoorDoor: "مامور دور",
  MamoorNazdik: "مامور نزدیک",
  TasvieHesab: "تسویه حساب",
  ModavematKar: "مداومت کار",
  EsterahatPezeshki: "استراحت پزشکی",
  Morkhasi: "مرخصی",
  Ghayeb: "غایب",
  Farari: "فراری",
  BazdashtGaah: "بازداشتگاه",
  TirandaziRoozane: "تیراندازی روزانه",
  Montaseb: "منتسب",
  RahDoor: "راه دور",
  Bimarestan: "بیمارستان",
};

export const ranks = {
  "000": "نامشخص",
  100: "محصل پيماني",
  101: "هنراموزگروهباني‌",
  201: "اموزشيار",
  202: "م--رب-ي ",
  203: "استادي-ار",
  204: "دانش-يار",
  205: "اس-تاد",
  210: "سرهمافريكم ",
  211: "سرهمافردوم ",
  212: "سرهمافرسوم ",
  213: "همافريكم ",
  214: "همافردوم ",
  215: "همافرسوم ",
  225: "دانشجوي سال  1 پرستاري ",
  226: "دانشجوي سال  2 پرستاري ",
  227: "دانشجوي سال  3 پرستاري ",
  228: "هنراموزگروهباني ",
  236: "دانشجوي سال  1 نظامي ",
  237: "دانشجوي سال  2 نظامي ",
  238: "دانشجوي سال  3 نظامي ",
  239: "دانشجوي سال  4 نظامي ",
  243: "محصل  پيماني ",
  244: "دانشاموزبهياري ",
  311: "ستوانياريكم ",
  312: "ستوانياردوم ",
  313: "ستوانيارسوم ",
  381: "ك  ت  ر 1",
  382: "ك  ت  ر 2",
  383: "ك  ت  ر 3",
  384: "ك  ت  ر 4",
  385: "ك  ت  ر 5",
  386: "ك  ت  ر 6",
  387: "ك  ت  ر 7",
  388: "ك  ت  ر 8",
  389: "ك  ت  ر 9",
  390: "ك  ت  ر 10",
  391: "ك  ت  ر 11",
  392: "ك  ت  ر 12",
  393: "ك  ت  ر 13",
  394: "ك  ت  ر 14",
  395: "ك  ت  ر 15",
  396: "ك  ت  ر 16",
  397: "ك  ت  ر 17",
  398: "ك  ت  ر 18",
  399: "ك  ت  ر 19",
  400: "ك  ت  ر 20",
  401: "ك  ع  ر 1",
  402: "ك  ع  ر 2",
  403: "ك  ع  ر 3",
  404: "ك  ع  ر 4",
  405: "ك  ع  ر 5",
  406: "ك  ع  ر 6",
  407: "ك  ع  ر 7",
  408: "ك  ع  ر 8",
  409: "ك  ع  ر 9",
  410: "ك  ع  ر 10",
  411: "ك  ع  ر 11",
  412: "ك  ع  ر 12",
  413: "ك  ع  ر 13",
  414: "ك  ع  ر 14",
  415: "ك  ع  ر 15",
  416: "ك  ع  ر 16",
  417: "ك  ع  ر 17",
  418: "ك  ع  ر 18",
  419: "ك  ع  ر 19",
  420: "ك  ع  ر 20",
  421: "افزارمندازمايشي ",
  424: "افزارمندطبقه 1",
  430: "افزارمندطبقه 2",
  436: "افزارمندطبقه 3",
  442: "افزارمندطبقه 4",
  448: "افزارمندطبقه 5",
  457: "كارمندفني ط 1پايه 1",
  458: "كارمندفني ط 1پايه 2",
  459: "كارمندفني ط 1پايه 3",
  460: "كارمندفني ط 1پايه 4",
  461: "كارمندفني ط 1پايه 5",
  462: "كارمندفني ط 1پايه 6",
  463: "كارمندفني ط 1پايه 7",
  464: "كارمندفني ط 1پايه 8",
  465: "كارمندفني ط 1پايه 9",
  466: "كارمندفني ط 1پايه 10",
  472: "كارمندفني ط 2پايه 1",
  473: "كارمندفني ط 2پايه 2",
  474: "كارمندفني ط 2پايه 3",
  475: "كارمندفني ط 2پايه 4",
  476: "كارمندفني ط 2پايه 5",
  477: "كارمندفني ط 2پايه 6",
  478: "كارمندفني ط 2پايه 7",
  479: "كارمندفني ط 2پايه 8",
  480: "كارمندفني ط 2پايه 9",
  481: "كارمندفني ط 2پايه 10",
  487: "كارمندفني ط 3پايه 1",
  488: "كارمندفني ط 3پايه 2",
  489: "كارمندفني ط 3پايه 3",
  490: "كارمندفني ط 3پايه 4",
  491: "كارمندفني ط 3پايه 5",
  492: "كارمندفني ط 3پايه 6",
  493: "كارمندفني ط 3پايه 7",
  494: "كارمندفني ط 3پايه 8",
  495: "كارمندفني ط 3پايه 9",
  496: "كارمندفني ط 3پايه 10",
  502: "كارمندفني ط 4پايه 1",
  503: "كارمندفني ط 4پايه 2",
  504: "كارمندفني ط 4پايه 3",
  505: "كارمندفني ط 4پايه 4",
  506: "كارمندفني ط 4پايه 5",
  507: "كارمندفني ط 4پايه 6",
  508: "كارمندفني ط 4پايه 7",
  509: "كارمندفني ط 4پايه 8",
  510: "كارمندفني ط 4پايه 9",
  511: "كارمندفني ط 4پايه 10",
  517: "كارمندفني ط 5پايه 1",
  518: "كارمندفني ط 5پايه 2",
  519: "كارمندفني ط 5پايه 3",
  520: "كارمندفني ط 5پايه 4",
  521: "كارمندفني ط 5پايه 5",
  522: "كارمندفني ط 5پايه 6",
  523: "كارمندفني ط 5پايه 7",
  524: "كارمندفني ط 5پايه 8",
  525: "كارمندفني ط 5پايه 9",
  526: "كارمندفني ط 5پايه 10",
  541: "كارمندرسمي ط 1 مرتبه 1",
  556: "كارمندرسمي ط 1 مرتبه 2",
  571: "كارمندرسمي ط 1 مرتبه 3",
  586: "كارمندرسمي ط 1 مرتبه 4",
  611: "كارمندرسمي ط 2 مرتبه  1",
  612: "كارمندرسمي ط 2 مرتبه  2",
  613: "كارمندرسمي ط 2 مرتبه  3",
  614: "كارمندرسمي ط 2 مرتبه  4",
  615: "كارمندرسمي ط 3 مرتبه  1",
  616: "كارمندرسمي ط 3 مرتبه  2",
  617: "كارمندرسمي ط 3 مرتبه  3",
  618: "كارمندرسمي ط 3 مرتبه  4",
  706: "گ 2 پيماني ",
  707: "گ 1 پيماني ",
  708: "استوار2 پيماني ",
  709: "استوار1 پيماني ",
  710: "ستوان 3 پيماني ",
  711: "ستوان 2 پيماني ",
  712: "ستوان 1 پيماني ",
  713: "سروان   پيماني ",
  722: "ك  پ  ر 2",
  723: "ك  پ  ر 3",
  724: "ك  پ  ر 4",
  725: "ك  پ  ر 5",
  726: "ك  پ  ر 6",
  727: "ك  پ  ر 7",
  728: "ك  پ  ر 8",
  729: "ك  پ  ر 9",
  730: "ك  پ  ر 10",
  731: "ك  پ  ر 11",
  732: "ك  پ  ر 12",
  733: "ك  پ  ر 13",
  734: "ك  پ  ر 14",
  791: "ستوانيكم وظيفه ",
  792: "ستواندوم وظيفه ",
  793: "ستوانسوم وظيفه ",
  794: "گروهبان  سوم وظيفه ",
  795: "گروهبان  دوم وظيفه ",
  796: "گروهبان  يكم وظيفه ",
  797: "استواردوم وظيفه ",
  798: "استواريكم وظيفه ",
  799: "دانشجووظيفه ",
  800: "سربازاموزشي ",
  801: "سرباز",
  802: "سربازدوم ",
  803: "سربازيكم ",
  804: "سرجوخه ",
  805: "گروهبانسوم ",
  806: "گروهباندوم ",
  807: "گروهبانيكم ",
  808: "استواردوم ",
  809: "استواريكم ",
  810: "ستوانسوم ",
  811: "ستواندوم ",
  812: "ستوانيكم ",
  813: "سروان ",
  814: "سرگرد",
  815: "سرهنگ  دوم ",
  816: "سرهنگ ",
  817: "سرتيپ دوم ",
  818: "سرتيپ ",
  819: "سرلشكر",
  820: "سپهبد",
  821: "ارتشبد",
  822: "گروهبان ",
  823: "استوار",
  824: "ستوان ",
};

export const offDaysTypes = [
  { label: "سالیانه", value: "s" },
  { label: "تشویقی", value: "t" },
];

export const maddeHa = {
  1: { name: "تشویقات", number: 1, table: "Tashvighat" },
  2: { name: "ترفیعات", number: 2, table: "Tarfiat" },
  3: { name: "انتصابات", number: 3, table: "Entesabat" },
  4: { name: "انتقالات", number: 4, table: "Enteghalat" },
  6: { name: "آموزش", number: 6, table: "Amoozesh" },
  7: { name: "وضعیت خدمتی", number: 7, table: "VaziatKhedmat" },
  9: { name: "مسکن", number: 9, table: "Khadamat" },
  10: { name: "استخدام", number: 10, table: "Estekhdam" },
  11: { name: "عائله", number: 11, table: "DastoorAele" },
  12: { name: "تنبیهات", number: 12, table: "Tanbihat" },
  15: { name: "امور متفرقه", number: 15, table: "Motefareghe" },
};

export const maddeHaCols = {
  1: {
    // "Dastoor",
    // "Madde",
    Zirmadde: "زیرماده",
    // "ZirZirmadde",
    // Eghdamgar: "اقدامگر",
    Girande1: "گیرنده۱",
    Girande2: "گیرنده۲",
    Girande3: "گیرنده۳",
    Girande4: "گیرنده۴",
    PerNo: "شماره پرسنلی",
    // "TarikhSabt": "",
    Madrak: "مدرک",
    // GirandeCheck: "",
    // Girande2Check: "",
    // Girande3Check: "",
    // Girande4Check: "",
    ToReport: "متن نامه",
    // "Tarikh": "",
    EllateTashvigh: "علت تشویق",
    EstenadTashvigh: "استناد تشویق",
    CodeTashvigh: "کد تشویق",
    NahveTashvigh: "نحوه تشویق",
    MadrakTahsil: "مدرک تحصیلی",
    EstenadArshadiat: "استناد ارشدیت",
    SanavatArshadiat: "سنوات ارشدیت",
    TarikhArshadiat: "تاریخ ارشدیت",
    // Date: "تاریخ",
    Girande5: "گیرنده۵",
    Girande6: "گیرنده۶",
    Girande7: "گیرنده۷",
    Girande8: "گیرنده۸",
    // Girande5Check: "",
    // Girande6Check: "",
    // Girande7Check: "",
    // Girande8Check: "",
    // "TaidEghdamgar": "", 1
    // "TaidRaisShobe": "", 0
    // "TaidJaneshin": "", 0
    // "TaidRais": "", 0
    // "TaidRaisDastoor": "", 0
    // RaisShobe: "",
    // Janeshin: "",
    // Rais: "",
    // RaisDastoor: "",
    // OnvanShobe: "",
    // EmzaEghdamgar: "",
    // EmzaRaisShobe: "",
    // EmzaJaneshin: "",
    // EmzaRais: "",
    // EmzaRaisDastoor: "",
    AzTaraf: "از طرف",
    // NamoNeshan: "",
    // TarikhOdat: "تاریخ عودت",
    // EllateOdat: "",
    // OdatDahande: "",
    // DastoorTashvigh: "دستور تشویق",
    Zamaem: "ضمایم",
    // Shobe: "شعبه",
    RafeTanbihat1: "رفع تنبیهات۱",
    RafeTanbihat2: "رفع تنبیهات۲",
    RafeTanbihat3: "رفع تنبیهات۳",
    Modat: "مدت",
  },
  2: {
    // "Dastoor",
    // "Madde",
    Zirmadde: "زیرماده",
    // "ZirZirmadde",
    // "Eghdamgar",
    Girande1: "گیرنده۱",
    Girande2: "گیرنده۲",
    Girande3: "گیرنده۳",
    Girande4: "گیرنده۴",
    Girande5: "گیرنده۵",
    Girande6: "گیرنده۶",
    Girande7: "گیرنده۷",
    Girande8: "گیرنده۸",
    PerNo: "شماره پرسنلی",
    // TarikhSabt: "",
    Madrak: "مدرک",
    // GirandeCheck: "",
    // Girande2Check: "",
    // Girande3Check: "",
    // Girande4Check: "",
    // Girande5Check: "",
    // Girande6Check: "",
    // Girande7Check: "",
    // Girande8Check: "",
    ToReport: "متن نامه",
    // Date: "",
    // TaidEghdamgar: "", 1
    // TaidRaisShobe: "", 0
    // TaidJaneshin: "", 0
    // TaidRais: "", 0
    // TaidRaisDastoor: "", 0
    EslahElat: "علت (اصلاح)",
    EslahTarikh: "تاریخ (اصلاح)",
    ErteghaTarikh: "تاریخ ارتقا",
    ErteghaMadde: "ماده ارتقا",
    SeyrTedad: "تعداد سیر",
    // GirandeLafz: "",
    // TarikhTaidRiasat: "",
    // TarikhTaidDastoor: "",
    // TarikhTaidRaisShobe: "",
    // RaisShobe: "",
    // Janeshin: "",
    // Rais: "",
    // RaisDastoor: "",
    // OnvanShobe: "",
    // EmzaEghdamgar: "",
    // EmzaRaisShobe: "",
    // EmzaJaneshin: "",
    // EmzaRais: "",
    // EmzaRaisDastoor: "",
    AzTaraf: "از طرف",
    // NamoNeshan: "",
    Zamaem: "ضمایم",
    TakhasosFeli: "تخصص فعلی",
    TakhasosJadid: "تخصص جدید",
    VaziatFeliGorooh: " گروه وضعیت فعلی",
    VaziatFeliRade: "رده وضعیت فعلی",
    VaziatPishnahadiGorooh: "گروه وضعیت پیشنهادی",
    VaziatPishnahadiRade: "رده وضعیت پیشنهادی",
    // Shobe: "",
  },
  3: {
    // Dastoor: "",
    // Madde: "",
    Zirmadde: "زیرماده",
    // ZirZirmadde: "",
    // Eghdamgar: "",
    Girande1: "گیرنده۱",
    Girande2: "گیرنده۲",
    Girande3: "گیرنده۳",
    Girande4: "گیرنده۴",
    Girande5: "گیرنده۵",
    Girande6: "گیرنده۶",
    Girande7: "گیرنده۷",
    Girande8: "گیرنده۸",
    PerNo: "شماره پرسنلی",
    // TarikhSabt: "",
    Madrak: "مدرک",
    // GirandeCheck: "",
    // Girande2Check: "",
    // Girande3Check: "",
    // Girande4Check: "",
    // Girande5Check: "",
    // Girande6Check: "",
    // Girande7Check: "",
    // Girande8Check: "",
    ToReport: "متن نامه",
    // Date: "",
    TarikhEntesab: "تاریخ انتساب",
    // TaidEghdamgar: "",
    // TaidRaisShobe: "",
    // TaidJaneshin: "",
    // TaidRais: "",
    // TaidRaisDastoor: "",
    // GirandeLafz: "",
    // TarikhTaidRiasat: "",
    // TarikhTaidDastoor: "",
    // TarikhTaidRaisShobe: "",
    // RaisShobe: "",
    // Janeshin: "",
    // Rais: "",
    // RaisDastoor: "",
    // OnvanShobe: "",
    // EmzaEghdamgar: "",
    // EmzaRaisShobe: "",
    // EmzaJaneshin: "",
    // EmzaRais: "",
    // EmzaRaisDastoor: "",
    AzTaraf: "از طرف",
    // NamoNeshan: "",
    Zamaem: "ضمایم",
    Semat: "سمت",
    MahalSazmani: "محل سازمانی",
    TakhasosNo: "شماره تخصص",
    EntesabatTozihat: "توضیحات انتصابات",
    Serial: "سریال",
    Baand: "بند",
    Satr: "سطر",
    CodeMadde: "کد ماده",
    // m1: "",
    // m2: "",
    // m3: "",
    // m4: "",
    // m5: "",
    SakhtiKar: "سختی کار",
    CodeMaghamat: "کد مقامات",
    CodeRahbordi: "کد راهبردی",
    FogholadeKarshenasi: "کارشناسی فوق العاده",
    YeganHoghooghi: "یگان حقوقی",
    SerialAja: "سریال آجا",
    NamGhabli: "نام قبلی",
    NeshanGhabli: "نشان قبلی",
    DarajeGhabli: "درجه قبلی",
    PerNoGhabli: "شماره درسنلی قبلی",
    EllatGhabli: "علت قبلی",
    TozihatGhabli: "توضیحات قبلی",
    // Shobe: "",
  },
  4: {
    // "Dastoor",
    // "Madde",
    Zirmadde: "زیرماده",
    // "ZirZirmadde": "",
    // "Eghdamgar": "",
    Girande1: "گیرنده۱",
    Girande2: "گیرنده۲",
    Girande3: "گیرنده۳",
    Girande4: "گیرنده۴",
    Girande5: "گیرنده۵",
    Girande6: "گیرنده۶",
    Girande7: "گیرنده۷",
    Girande8: "گیرنده۸",
    PerNo: "شماره پرسنلی",
    // TarikhSabt: "",
    Madrak: "مدرک",
    // GirandeCheck: "",
    // Girande2Check: "",
    // Girande3Check: "",
    // Girande4Check: "",
    // Girande5Check: "",
    // Girande6Check: "",
    // Girande7Check: "",
    // Girande8Check: "",
    ToReport: "متن نامه",
    // Date: "تاریخ",
    // TaidEghdamgar: "", 1
    // TaidRaisShobe: "", 0
    // TaidJaneshin: "", 0
    // TaidRais: "", 0
    // TaidRaisDastoor: "", 0
    // NamPedar: "",
    EnteghalTarikhEnteghal: "تاریخ انتقال",
    EnteghalMabda: "مبدا انتقال",
    EnteghalMaghsad: "مقصد انتقال",
    // EnteghalBedunHazineCheck: "",
    // EnteghalMoteahelCheck: "",
    // EnteghalHamsarCheck: "",
    // EnteghalFarzandCheck: "",
    EnteghalTedadFarzand: "تعداد فرزند برای انتقال",
    // EnteghalPedarCheck: "",
    // EnteghalMadarCheck: "",
    EntesabTarikhEntesab: "تاریخ انتصاب",
    EntesabEstenadie: "استنادیه انتصاب",
    EntesabDore: "دوره انتصاب",
    EntesabMontasabBe: "منتصب به",
    KhorujTarikhEntesab: "تاریخ خروج انتصاب",
    KhorujEstenadie: "استنادیه خروج",
    KhorujDore: "دوره خروج",
    KhorujMontasabBe: "منتصب به (خروج)",
    KhorujTarikhKhoruj: "تاریخ خروج",
    TaghirTarikhTaghir: "تاریخ تغییر",
    TaghirCodeGhadim: "کد قدیم (تغییر)",
    TaghirCodeJadid: "کد جدید (تغییر)",
    KanLamTarikhEnteghal: "تاریخ انتقال (کن لم)",
    KanLamPaygah: "پایگاه (کن لم)",
    // GirandeLafz: "",
    // TarikhTaidRiasat: "",
    // TarikhTaidDastoor: "",
    // TarikhTaidRaisShobe: "",
    // RaisShobe: "",
    // Janeshin: "",
    // Rais: "",
    // RaisDastoor: "",
    // OnvanShobe: "",
    // EmzaEghdamgar: "",
    // EmzaRaisShobe: "",
    // EmzaJaneshin: "",
    // EmzaRais: "",
    // EmzaRaisDastoor: "",
    AzTaraf: "از طرف",
    // NamoNeshan: "",
    // TarikhOdat: "",
    // EllateOdat: "",
    // OdatDahande: "",
    // Zamaem: "",
    // Shobe: "",
    FareghOTahsiliDaraje: "درجه فارغ التحصیلی",
    FareghOTahsiliNoeEstekhdam: "نوع استخدام (فارغ التحصیلی)",
    FareghOTahsiliOnvaneTakhasos: "عنوان تخصص (فارغ التحصیلی)",
    FareghOTahsiliShomareTakhasosJadid: "شماره تخصص جدید (فارغ التحصیلی)",
    FareghOTahsiliShomareTakhasosGhadim: "شماره تخصص قدیم (فارغ التحصیلی)",
    FareghOTahsiliTarfiTarikh: "تاریخ ترفیع (فارغ التحصیلی)",
    FareghOTahsiliTarikh: "تاریخ (فارغ التحصیلی)",
    FareghOTahsiliAghabOftadegi: "عقب افتادگی (فارغ التحصیلی)",
    FareghOTahsiliMadrak: "مدرک (فارغ التحصیلی)",
    FareghOTahsiliVaziatTaahol: "وضعیت تاهل (فارغ التحصیلی)",
    FareghOTahsiliYeganMontaghele: "یگان منتقله (فارغ التحصیلی)",
  },
  6: {
    // "Dastoor",
    // "Madde",
    Zirmadde: "زیرماده",
    // "ZirZirmadde",
    // "Eghdamgar",
    Girande1: "گیرنده۱",
    Girande2: "گیرنده۲",
    Girande3: "گیرنده۳",
    Girande4: "گیرنده۴",
    Girande5: "گیرنده۵",
    Girande6: "گیرنده۶",
    Girande7: "گیرنده۷",
    Girande8: "گیرنده۸",
    PerNo: "شماره پرسنلی",
    // TarikhSabt: "",
    Madrak: "مدرک",
    // GirandeCheck: "",
    // Girande2Check: "",
    // Girande3Check: "",
    // Girande4Check: "",
    // Girande5Check: "",
    // Girande6Check: "",
    // Girande7Check: "",
    // Girande8Check: "",
    ToReport: "متن نامه",
    // Date: "",
    // TaidEghdamgar: "",
    // TaidRaisShobe: "",
    // TaidJaneshin: "",
    // TaidRais: "",
    // TaidRaisDastoor: "",
    EslahElat: "علت اصلاح",
    EslahTarikh: "تاریخ اصلاح",
    ErteghaTarikh: "تاریخ ارتقا",
    ErteghaMadde: "ماده ارتقا",
    SeyrTedad: "تعداد سیر",
    // GirandeLafz: "",
    // RaisShobe: "",
    // Janeshin: "",
    // Rais: "",
    // RaisDastoor: "",
    // OnvanShobe: "",
    // EmzaEghdamgar: "",
    // EmzaRaisShobe: "",
    // EmzaJaneshin: "",
    // EmzaRais: "",
    // EmzaRaisDastoor: "",
    AzTaraf: "از طرف",
    // NamoNeshan: "",
    // TarikhOdat: "",
    // EllateOdat: "",
    // OdatDahande: "",
    Zamaem: "ضمایم",
    AmoozeshAwliPayan: "پایان آموزش عالی",
    // Shobe: "",
  },
  7: {
    // Dastoor: "",
    // Madde: "",
    Zirmadde: "زیرماده",
    // ZirZirmadde: "",
    // Eghdamgar: "",
    Girande1: "گیرنده۱",
    Girande2: "گیرنده۲",
    Girande3: "گیرنده۳",
    Girande4: "گیرنده۴",
    Girande5: "گیرنده۵",
    Girande6: "گیرنده۶",
    Girande7: "گیرنده۷",
    Girande8: "گیرنده۸",
    PerNo: "شماره پرسنلی",
    // TarikhSabt: "",
    TarikhNahast: "تاریخ نهست",
    TarikhFarar: "تاریخ فرار",
    TarikhMorajeat: "تاریخ مراجعت",
    Madrak: "مدرک",
    // GirandeCheck: "",
    // Girande2Check: "",
    // Girande3Check: "",
    // Girande4Check: "",
    ToReport: "متن نامه",
    MorajeatNahast: "نهست (مراجعت)",
    MorajeatFarar: "فرار (مراجعت)",
    // Date: "",
    // Girande5Check: "",
    // Girande6Check: "",
    // Girande7Check: "",
    // Girande8Check: "",
    // TaidEghdamgar: "",
    // TaidRaisShobe: "",
    // TaidJaneshin: "",
    // TaidRais: "",
    // TaidRaisDastoor: "",
    // TarikhTaidRiasat: "",
    // TarikhTaidDastoor: "",
    // TarikhTaidRaisShobe: "",
    // RaisShobe: "",
    // Janeshin: "",
    // Rais: "",
    // RaisDastoor: "",
    // OnvanShobe: "",
    // EmzaEghdamgar: "",
    // EmzaRaisShobe: "",
    // EmzaJaneshin: "",
    // EmzaRais: "",
    // EmzaRaisDastoor: "",
    AzTaraf: "از طرف",
    // NamoNeshan: "",
    Zamaem: "ضمایم",
    // TaidJRaisShobe: "",
    // JRaisShobe: "",
    // TarikhTaidJRaisShobe: "",
    // EmzaJRaisShobe: "",
    // Shobe: "شعبه",
  },
  9: {
    // Dastoor: "",
    // Madde: "",
    Zirmadde: "زیرماده",
    // ZirZirmadde: "",
    // Eghdamgar: "",
    Girande1: "گیرنده۱",
    Girande2: "گیرنده۲",
    Girande3: "گیرنده۳",
    Girande4: "گیرنده۴",
    Girande5: "گیرنده۵",
    Girande6: "گیرنده۶",
    Girande7: "گیرنده۷",
    Girande8: "گیرنده۸",
    PerNo: "شماره پرسنلی",
    // TarikhSabt: "",
    Madrak: "مدرک",
    // GirandeCheck: "",
    // Girande2Check: "",
    // Girande3Check: "",
    // Girande4Check: "",
    // Girande5Check: "",
    // Girande6Check: "",
    // Girande7Check: "",
    // Girande8Check: "",
    ToReport: "متن نامه",
    // Date: "",
    // TaidEghdamgar: "",
    // TaidRaisShobe: "",
    // TaidJaneshin: "",
    // TaidRais: "",
    // TaidRaisDastoor: "",
    TakhlieEstenad: "استناد تخلیه",
    TakhlieTarikh: "تاریخ تخلیه",
    TakhlieMahal: "محل تخلیه",
    VagozariTarikh: "تاریخ واگذاری",
    VagozariOnvan1: "عنوان واگذاری۱",
    VagozariOnvan2: "عنوان واگذاری۲",
    VagozariOnvan3: "عنوان واگذاری۳",
    VagozariOnvan4: "عنوان واگذاری۴",
    VagozariOnvan5: "عنوان واگذاری۵",
    VagozariHazine1: "هزینه واگذاری۱",
    VagozariHazine2: "هزینه واگذاری۲",
    VagozariHazine3: "هزینه واگذاری۳",
    VagozariHazine4: "هزینه واگذاری۴",
    VagozariHazine5: "هزینه واگذاری۵",
    // RaisShobe: "",
    // Janeshin: "",
    // Rais: "",
    // RaisDastoor: "",
    // OnvanShobe: "",
    // EmzaEghdamgar: "",
    // EmzaRaisShobe: "",
    // EmzaJaneshin: "",
    // EmzaRais: "",
    // EmzaRaisDastoor: "",
    AzTaraf: "از طرف",
    // NamoNeshan: "",
    Zamaem: "ضمایم",
    // Shobe: "",
  },
  10: {
    // Dastoor: "",
    // Madde: "",
    Zirmadde: "زیرماده",
    // ZirZirmadde: "",
    // Eghdamgar: "",
    Girande1: "گیرنده۱",
    Girande2: "گیرنده۲",
    Girande3: "گیرنده۳",
    Girande4: "گیرنده۴",
    Girande5: "گیرنده۵",
    Girande6: "گیرنده۶",
    Girande7: "گیرنده۷",
    Girande8: "گیرنده۸",
    PerNo: "شماره پرسنلی",
    // TarikhSabt: "",
    Madrak: "مدرک",
    // GirandeCheck: "",
    // Girande2Check: "",
    // Girande3Check: "",
    // Girande4Check: "",
    ToReport: "متن نامه",
    TarikhErtegha: "تاریخ ارتقا",
    DalileErtegha: "دلیل ارتقا",
    NoeErtegha: "نوع ارتقا",
    NoePaziresh: "نوع پذیرش",
    PazireshMaghta: "مقطع پذیرش",
    PazireshReshte: "رشته پذیرش شده",
    PazireshTarikhFaregh: "تاریخ فارغ التحصیلی",
    PazireshMahalTahsil: "محل تحصیل پذیرش شده",
    PazireshTarikhPaziresh: "تاریخ پذیرش",
    PazireshTakhasosFeli: "تخصص فعلی",
    ErteghaTakhasos: "تخصص (ارتقا)",
    ModatSanavat: "مدت سنوات",
    NoeKhedmat: "نوع خدمت",
    TarikhShoru: "تاریخ شروع",
    TarikhPayan: "تاریخ پایان",
    YeganTaeed: "تایید یگان",
    EstenadieSanavat: "استنادیه سنوات",
    TakhasosGhabli: "تخصص قبلی",
    TakhasosJadid: "تخصص جدید",
    TarikhTaghirTakhasos: "تاریخ تغییر تخصص",
    TakhasosEstenadie: "استنادیه تخصص",
    GoruhGhadim: "گروه قدیم",
    GoruhJadid: "گروه جدید",
    RadeGhadim: "رده قدیم",
    RadeJadid: "رده جدید",
    // Date: "",
    // Girande5Check: "",
    // Girande6Check: "",
    // Girande7Check: "",
    // Girande8Check: "",
    // TaidEghdamgar: "",
    // TaidRaisShobe: "",
    // TaidJaneshin: "",
    // TaidRais: "",
    // TaidRaisDastoor: "",
    // RaisShobe: "",
    // Janeshin: "",
    // Rais: "",
    // RaisDastoor: "",
    // OnvanShobe: "",
    // EmzaEghdamgar: "",
    // EmzaRaisShobe: "",
    // EmzaJaneshin: "",
    // EmzaRais: "",
    // EmzaRaisDastoor: "",
    AzTaraf: "از طرف",
    // NamoNeshan: "",
    Zamaem: "ضمایم",
    // TaidJRaisShobe: "",
    // JRaisShobe: "",
    // TarikhTaidJRaisShobe: "",
    // EmzaJRaisShobe: "",
    ArshadiatMadrak: "مدرک ارشدیت",
    ArshadiatModat: "مدت ارشدیت",
    ArshadiatJamKol: "جمع کل ارشدیت",
    ArshadiatTarikh: "تاریخ ارشدیت",
    TarikhBargharari: "تاریخ برقراری",
    // Shobe: "",
  },
  11: {
    // Dastoor: "",
    // Madde: "",
    Zirmadde: "زیرماده",
    // ZirZirmadde: "",
    // Eghdamgar: "",
    Girande1: "گیرنده۱",
    Girande2: "گیرنده۲",
    Girande3: "گیرنده۳",
    Girande4: "گیرنده۴",
    Girande5: "گیرنده۵",
    Girande6: "گیرنده۶",
    Girande7: "گیرنده۷",
    Girande8: "گیرنده۸",
    PerNo: "شماره پرسنلی",
    // TarikhSabt: "",
    Madrak: "مدرک",
    // GirandeCheck: "",
    // Girande2Check: "",
    // Girande3Check: "",
    // Girande4Check: "",
    ToReport: "متن نامه",
    Nesbat: "نسبت",
    // NamoNesh: "",
    CodeMelli: "کد ملی",
    ShomareShenasname: "شماره شناسنامه",
    SerialShenasname: "سریال شناسنامه",
    TarikhTavalod: "تاریخ تولد",
    MahalTavalod: "محل تولد",
    // NamPedar: "نام پدر",
    Shoghl: "شغل",
    ShomareBimeh: "شماره بیمه",
    MoshakhasatTaghiri: "مشخصات تغییری",
    MoshakhasatGhadimi: "مشخصات قدیمی",
    MoshakhasatJadid: "مشخصات جدید",
    MaghtaTahsili: "مقطع تحصیلی",
    Reshte: "رشته",
    Daneshgah: "دانشگاه",
    MohlatEstefade: "مهلت استفاده",
    TarikhEzdevaj: "تاریخ ازدواج",
    // CheckEzdevajDovom: "",
    ShomarFarzand: "شماره فرزند",
    ShomarJensiat: "شماره جنسیت",
    TarikhKhorujAzAele: "تاریخ خروج از عائله",
    TarikhVafat: "تاریخ فوت",
    TarikhEzdevajFarzand: "تاریخ ازدواج فرزند",
    // Date: "",
    // Girande5Check: "",
    // Girande6Check: "",
    // Girande7Check: "",
    // Girande8Check: "",
    // TaidEghdamgar: "",
    // TaidRaisShobe: "",
    // TaidJaneshin: "",
    // TaidRais: "",
    // TaidRaisDastoor: "",
    // RaisShobe: "",
    // Janeshin: "",
    // Rais: "",
    // RaisDastoor: "",
    // OnvanShobe: "",
    // EmzaEghdamgar: "",
    // EmzaRaisShobe: "",
    // EmzaJaneshin: "",
    // EmzaRais: "",
    // EmzaRaisDastoor: "",
    AzTaraf: "از طرف",
    // NamoNeshan: "",
    Zamaem: "ضمایم",
    // TaidJRaisShobe: "",
    // JRaisShobe: "",
    // TarikhTaidJRaisShobe: "",
    // EmzaJRaisShobe: "",
    // Shobe: "",
  },
  12: {
    // Dastoor: "",
    // Madde: "",
    Zirmadde: "زیرماده",
    // ZirZirmadde: "",
    // Eghdamgar: "",
    Girande1: "گیرنده۱",
    Girande2: "گیرنده۲",
    Girande3: "گیرنده۳",
    Girande4: "گیرنده۴",
    Girande5: "گیرنده۵",
    Girande6: "گیرنده۶",
    Girande7: "گیرنده۷",
    Girande8: "گیرنده۸",
    PerNo: "شماره پرسنلی",
    // TarikhSabt: "",
    Madrak: "مدرک",
    // GirandeCheck: "",
    // Girande2Check: "",
    // Girande3Check: "",
    // Girande4Check: "",
    ToReport: "متن نامه",
    // Date: "",
    TarikhNahast: "تاریخ نهست",
    ModatNahast: "مدت نهست",
    Estenadie: "استنادیه",
    NoeTanbih: "نوع تنبیه",
    ElateTanbih: "علت تنبیه",
    CodeTanbihat: "کد تنبیهات",
    EstenadieTanbih: "استنادیه تنبیه",
    // NoeTanbihTanbih: "",
    TarikhTanbih: "تاریخ تنبیه",
    TarikhFarar: "تاریخ فرار",
    Morajeat: "مراجعت",
    Jarime: "جریمه",
    Jaza: "جزا",
    TakhfifJaza: "تخفیف جزا",
    NoeTanbihKan: "نوع تنبیه کن لم",
    EllateTanbihatKan: "علت تنبیه کن لم",
    TarikhTanbihKan: "تاریخ تنبیه کن لم",
    TanzilEllat: "علت تنزیل",
    TanzilTarikh: "تاریخ تنزیل",
    TanzilNoeTanbih: "نوع تنبیه تنزیل",
    // KhorujBedunTarikhSH: "",
    // KhorujBedunTarikhPa: "",
    BedunKarEllat: "علت (بدون کار)",
    BedunKarNoe: "نوع (بدون کار)",
    BednKarTarikhSh: "تاریخ شروع (بدون کار)",
    BedunKarTarikhPa: "تاریخ پایان (بدون کار)",
    TarikhMahkum: "تاریخ محکومیت",
    // Girande5Check: "",
    // Girande6Check: "",
    // Girande7Check: "",
    // Girande8Check: "",
    // TaidEghdamgar: "",
    // TaidRaisShobe: "",
    // TaidJaneshin: "",
    // TaidRais: "",
    // TaidRaisDastoor: "",
    // RaisShobe: "",
    // Janeshin: "",
    // Rais: "",
    // RaisDastoor: "",
    // OnvanShobe: "",
    // EmzaEghdamgar: "",
    // EmzaRaisShobe: "",
    // EmzaJaneshin: "",
    // EmzaRais: "",
    // EmzaRaisDastoor: "",
    AzTaraf: "از طرف",
    // NamoNeshan: "",
    Zamaem: "ضمایم",
    // TanbihNahast: "",
    ModatTanbihNahast: "مدت تنبیه نهست",
    // TaTarikhNahast: "",
    // TaidJRaisShobe: "",
    // JRaisShobe: "",
    // TarikhTaidJRaisShobe: "",
    // EmzaJRaisShobe: "",
    noeeBkari: "نوع بیکاری",
    elatBkari: "علت بیکاری",
    // Shobe: "",
  },
  15: {
    // Dastoor: "",
    // Madde: "",
    Zirmadde: "زیرماده",
    // ZirZirmadde: "",
    // Eghdamgar: "",
    Girande1: "گیرنده۱",
    Girande2: "گیرنده۲",
    Girande3: "گیرنده۳",
    Girande4: "گیرنده۴",
    Girande5: "گیرنده۵",
    Girande6: "گیرنده۶",
    Girande7: "گیرنده۷",
    Girande8: "گیرنده۸",
    PerNo: "شماره پرسنلی",
    // Tarikh: "",
    // TarikhSabt: "",
    Madrak: "مدرک",
    // GirandeCheck: "",
    // Girande2Check: "",
    // Girande3Check: "",
    // Girande4Check: "",
    ToReport: "متن نامه",
    // TabagheBimari1: "",
    // TabagheTarikh: "",
    // TabagheShenase1: "",
    // Tabaghe1: "",
    // TabagheModat1: "",
    // TabagheDovomCheck: "",
    // TabagheBimari2: "",
    // TabagheShenase2: "",
    // Tabaghe2: "",
    // tabagheModat2: "",
    EsterahatTarikh: "تاریخ استراحت",
    EsterahatModat: "مدت استراحت",
    // SabSurat: "",
    // SabBimari: "",
    // SabTarikh: "",
    // JanSurat: "",
    // JanDarsad: "",
    // JanModat: "",
    AshaeTakhasos: "تخصص (اشعه)",
    AshaeSemat: "سمت اشعه",
    AshaeTarikh: "تاریخ اشعه",
    AshaeEstenadie: "استنادیه اشعه",
    AshaeAsas: "اساس اشعه",
    // AshaeGoruhParto: "",
    AshaeModat: "مدت اشعه",
    AmelSemat: "سمت (عامل)",
    AmelYegan: "یگان (عامل)",
    AmelDore: "دوره (عامل)",
    // Date: "",
    // Girande5Check: "",
    // Girande6Check: "",
    // Girande7Check: "",
    // Girande8Check: "",
    // TaidEghdamgar: "",
    // TaidRaisShobe: "",
    // TaidJaneshin: "",
    // TaidRais: "",
    // TaidRaisDastoor: "",
    // RaisShobe: "",
    // Janeshin: "",
    // Rais: "",
    // RaisDastoor: "",
    // OnvanShobe: "",
    // EmzaEghdamgar: "",
    // EmzaRaisShobe: "",
    // EmzaJaneshin: "",
    // EmzaRais: "",
    // EmzaRaisDastoor: "",
    AzTaraf: "از طرف",
    // NamoNeshan: "",
    Zamaem: "ضمایم",
    // TaidJRaisShobe: "",
    // JRaisShobe: "",
    // TarikhTaidJRaisShobe: "",
    // EmzaJRaisShobe: "",
    tozihattabaghe1: "توضیحات طبقه۱",
    tozihattabaghe2: "توضیحات طبقه۲",
    // Shobe: "",
  },
};
