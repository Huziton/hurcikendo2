// Hurcikendő termékadatok
// Ide kell majd új kendőt felvenni, ha bővül a kínálat: csak másolj egy
// blokkot, írd át az adatokat, és tedd be a képeket az
// images/products/<slug>/ mappába 1.jpg, 2.jpg, ... néven.

const PRODUCTS = [
  {
    slug: "andalgo",
    name: "Andalgo",
    price: 40000,
    condition: "Keveset használt, de törést nem igényel",
    composition: "50% bambusz, 50% pamut",
    size: "3 m",
    gsm: null,
    description:
      "Középvastag kendő, puha, omlós, mint bármelyik bambuszos Andalgo. Picitől nagyig tennék bele babát, 16 kg-ot is szépen visz. Az egyik kedvencem, mind kinézetre, mind tapintásra.",
    images: 7,
  },
  {
    slug: "cocon",
    name: "Coco-N Skandinávia Nuit d’Orchidee",
    price: 55000,
    condition: "Még törhető, de már puha",
    composition: "35% len, 30% pamut, 25% baby alpaka, 10% mulberry selyem",
    size: "S6",
    gsm: "300 gsm",
    description:
      "Nagybabás, erős kendő. 16 kg-ban is elveszik benne a gyerek, könnyen köthető. Az alpakát és a lent alig érezni benne, selymes tapintású kendő.",
    images: 5,
  },
  {
    slug: "kenhuru",
    name: "Kenhuru Forma Cori",
    price: 28000,
    condition: "Puha, betört",
    composition: "100% fésült pamut",
    size: "S4+",
    gsm: "310 gsm, de alig érződik",
    description:
      "Kézben inkább középvastagnak hat, pihe-puha, omlós. Pár hónapos kortól a hurcikor végéig jó. Eladó egyben, de vágásra is van lehetőség.",
    images: 3,
  },
  {
    slug: "lenesha",
    name: "Lenesha Northern Sunset no-cotton loop",
    price: 55000,
    condition: "Nagyon betört",
    composition: "Lánc: kender · rózsaszál · SeaCell — Vetülék: japán selyem",
    size: "180 cm-es anyagból készült, 78 cm-es loop",
    gsm: null,
    description:
      "Vékony, újszülött kortól használható, de nagyon erős, így 16 kg-ot is kényelmesen elvisz. Összetételének köszönhetően hűsít — tavaly nyáron 40 fokban simán órákig sétáltunk benne. Az egyik legnagyobb kincsem.",
    images: 5,
  },
  {
    slug: "littlefrog",
    name: "Little Frog Lovely Lilac",
    price: 30000,
    condition: "Betört",
    composition: "78% pamut",
    size: "S6",
    gsm: "310 gsm",
    description:
      "Keveset kötöttük, főleg aludt vele a gyerek. Vágásra is van lehetőség, örülnék, ha maradna belőle egy kis nyunyóka itthon.",
    images: 4,
  },
  {
    slug: "luna",
    name: "Luna Dream Little Prince",
    price: 20000,
    condition: "Betört",
    composition: "100% pamut",
    size: "S4",
    gsm: "280 gsm",
    description:
      "Nem sokszor kötöttük, eredetileg falvédőnek szántam. Inkább nagyobbacska babához ajánlom.",
    images: 4,
  },
  {
    slug: "loft",
    name: "Löft",
    price: 40000,
    condition: "Betört",
    composition: "100% pamut",
    size: "S6",
    gsm: "kb. 260 gsm",
    description:
      "Nepáli kézi szövés, csak ez az egy darab készült belőle. Könnyen köthető, középvastag, puha, betört, erős kendő — 1-2 hónapos kortól a hurcikor végéig jó. 15 kg-mal is kényelmes, bírja a pontatlanságokat.",
    images: 4,
  },
  {
    slug: "almitra",
    name: "Almitra Kalindi Scrap",
    price: 13000,
    condition: "Keveset használt, betört",
    composition: "85% merinói gyapjú, 15% kasmír",
    size: "176 cm",
    gsm: "210 gsm",
    description:
      "Látszik, hogy nem sokat volt kötve, de a gyapjú már kiadta magát. Loopnak, karikás kendőnek és sálnak is tökéletes.",
    images: 4,
  },
  {
    slug: "rebozo",
    name: "Mexicói rebozo",
    price: 15000,
    condition: "Avatatlan (nem betört)",
    composition: "100% pamut",
    size: "3 m",
    gsm: null,
    description: "Vékonyabb, erős kendő.",
    images: 2,
  },
  {
    slug: "sarisling",
    name: "Sari Sling Sloth Fuchsia",
    price: 20000,
    condition: "Betört",
    composition: "100% pamut",
    size: "S5",
    gsm: "260 gsm",
    description:
      "Pihe-puha anyag, jól viszi a 16 kg-ot is, de igazán fél éves kortól ajánlom. Egyben nem eladó, kb. 2,2 méter körül megtartanék belőle.",
    images: 4,
  },
  {
    slug: "yarohippos",
    name: "Yaro Hippos Trinity Bonbon Rainbow Tencel Seacell",
    price: 12000,
    condition: "Betört, mosásra visszakeményedik",
    composition: "80% pamut, 10% Tencel, 10% Seacell",
    size: "2 m",
    gsm: "260 gsm",
    description:
      "Kicsit vastagabbnak hat, mint 260 gsm — inkább nagybabásnak mondanám, már csak a szélessége miatt is. Jól betört anyag, kb. 1 éves kortól ajánlom a hurcikor végéig.",
    images: 2,
  },
  {
    slug: "yarokardia",
    name: "Yaro Kardia Duo Burgund Yellow Wool",
    price: 18000,
    condition: "Első tulajdonos vagyok, keveset kötöttük",
    composition: "70% pamut, 30% gyapjú",
    size: "245 cm + egyik végén csapás",
    gsm: "300 gsm",
    description:
      "Nagybabás shorty. Pihe-puha, jó meleg, igazi bekuckózós kendő az őszi-téli időszakra.",
    images: 3,
  },
];

function formatFt(n) {
  return n.toLocaleString("hu-HU") + " Ft";
}

function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

function productImageSrc(product, index) {
  return `images/products/${product.slug}/${index}.jpg`;
}
