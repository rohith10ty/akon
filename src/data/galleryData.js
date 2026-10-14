// Data definition for all galleries and project sections

export const introData = {
  projectLabel: "Collection",
  projectName: "Akon",
  dateLabel: "Edition",
  projectDate: "Yeezy Archive",
  titleLines: ["CREATIVITY", "REDEFINED"],
  missionLabel: "Vision",
  missionParagraphs: [
    "Akon Footwear is an avant-garde exploration at the crossroads of progressive design, advanced ergonomics, and organic silhouettes. Each pair redefines conventional footwear through sculptural purity and material innovation.",
    "Engineered with responsive comfort and architectural Primeknit construction, the collection stands as a testament to boundary-pushing creativity and modern street aesthetics."
  ]
};

export const sectionDetails = {
  section1: {
    isBigHeadline: true,
    words: ["ENGINEERED", "FOR", "EXPRESSION"],
    tagline: "Primeknit Architecture • Seamless Ergonomics & Structure"
  },
  section2: {
    isBigHeadline: true,
    words: ["ANATOMY", "MEETS", "CUSHION"],
    tagline: "Boost Cushioning Technology • Bio-Mechanical Adaptability"
  },
  section3: {
    isBigHeadline: true,
    words: ["CULTURE", "SHAPES", "ICONS"],
    tagline: "Yeezy Streetwear Heritage • Cultural Evolution"
  },
  section4: {
    isBigHeadline: true,
    words: ["SCULPTED", "IN", "FOAM"],
    tagline: "Injected EVA Craft • Organic Silhouette Architecture"
  },
  section5: {
    isBigHeadline: true,
    words: ["FORM", "MEETS", "FUTURE"],
    tagline: "Akon • Progressive Footwear Architecture"
  }
};

// All 7 interactive galleries (gallery-5 merged into gallery-6)
export const galleriesData = [
  {
    id: "gallery-1",
    title: "Row Expand",
    wrapClassName: "gallery-wrap",
    className: "gallery gallery--row",
    options: { flip: { absoluteOnLeave: true, scale: false } },
    items: [
      { className: "gallery__item gallery__item--s", image: "/shoes/g1_1.webp" },
      { className: "gallery__item gallery__item--m", image: "/shoes/g1_2.webp" },
      { className: "gallery__item gallery__item--l", image: "/shoes/g1_3.webp" },
      { className: "gallery__item gallery__item--xl gallery__item--center", image: "/shoes/g1_4.webp" },
      { className: "gallery__item gallery__item--l", image: "/shoes/g1_5.webp" },
      { className: "gallery__item gallery__item--m", image: "/shoes/g1_6.webp" },
      { className: "gallery__item gallery__item--s", image: "/shoes/g1_7.webp" }
    ],
    caption: "Within this meticulously engineered footwear line lies architectural Primeknit and responsive Boost cushioning, captivating sneaker culture worldwide."
  },
  {
    id: "gallery-2",
    title: "Breakout Grid",
    wrapClassName: "gallery-wrap gallery-wrap--large",
    className: "gallery gallery--grid gallery--breakout",
    options: {},
    hasParagraph: true,
    items: [
      { className: "gallery__item gallery__item-cut", innerImage: "/shoes/g2_1.webp" },
      { className: "gallery__item gallery__item-cut", innerImage: "/shoes/g2_2.webp" },
      { className: "gallery__item gallery__item-cut", innerImage: "/shoes/g2_3.webp" },
      { className: "gallery__item gallery__item-cut", innerImage: "/shoes/g2_4.webp" },
      { className: "gallery__item gallery__item-cut", innerImage: "/shoes/g2_5.webp" },
      { className: "gallery__item gallery__item-cut", innerImage: "/shoes/g2_6.webp" },
      { className: "gallery__item gallery__item-cut", innerImage: "/shoes/g2_7.webp" },
      { className: "gallery__item gallery__item-cut", innerImage: "/shoes/g2_8.webp" },
      { className: "gallery__item gallery__item-cut", innerImage: "/shoes/g2_9.webp" }
    ],
    caption: "Crafted from injected EVA foam, the minimalist slide and foam silhouettes redefine lightweight comfort and progressive footwear engineering."
  },
  {
    id: "gallery-3",
    title: "Mosaic 10-Col",
    wrapClassName: "gallery-wrap",
    className: "gallery gallery--grid10",
    options: { flip: { absolute: true, scale: false }, scrollTrigger: { start: "center center", end: "+=900%" }, stagger: 0.05 },
    items: [
      { className: "gallery__item pos-1", image: "/shoes/g3_1.webp" },
      { className: "gallery__item pos-2", image: "/shoes/g3_2.webp" },
      { className: "gallery__item pos-3", image: "/shoes/g3_3.webp" },
      { className: "gallery__item pos-4", image: "/shoes/g3_4.webp" },
      { className: "gallery__item pos-5", image: "/shoes/g3_5.webp" },
      { className: "gallery__item pos-6", image: "/shoes/g3_6.webp" },
      { className: "gallery__item pos-7", image: "/shoes/g3_7.webp" },
      { className: "gallery__item pos-8", image: "/shoes/g3_8.webp" },
      { className: "gallery__item pos-9", image: "/shoes/g3_9.webp" },
      { className: "gallery__item pos-10", image: "/shoes/g3_10.webp" },
      { className: "gallery__item pos-11", image: "/shoes/g3_11.webp" },
      { className: "gallery__item pos-12", image: "/shoes/g3_12.webp" },
      { className: "gallery__item pos-13", image: "/shoes/g3_13.webp" },
      { className: "gallery__item pos-14", image: "/shoes/g3_15.webp" },
      { className: "gallery__item pos-15", image: "/shoes/g3_16.webp" },
      { className: "gallery__item pos-16 gallery__item--main", image: "/shoes/g3_main.webp" }
    ],
    caption: "Architectural Precision"
  },
  {
    id: "gallery-4",
    title: "Dark Stack",
    wrapClassName: "gallery-wrap",
    className: "gallery gallery--stack gallery--stack-inverse gallery--stack-dark",
    options: {},
    hasParagraph: true,
    items: [
      { className: "gallery__item", image: "/shoes/g4_1.webp" },
      { className: "gallery__item", image: "/shoes/g4_2.webp" },
      { className: "gallery__item", image: "/shoes/g4_3.webp" },
      { className: "gallery__item", image: "/shoes/g4_4.webp" },
      { className: "gallery__item", image: "/shoes/g4_5.webp" },
      { className: "gallery__item", image: "/shoes/g4_6.webp" }
    ],
    caption: "Stealth monochrome profiles and obsidian textures that challenge conventional streetwear silhouettes."
  },
  {
    id: "gallery-6",
    title: "3D Scale Stack",
    wrapClassName: "gallery-wrap",
    className: "gallery gallery--stack gallery--stack-inverse gallery--stack-scale gallery--stack-dark",
    options: {},
    hasParagraph: true,
    items: [
      { className: "gallery__item", image: "/shoes/g5_1.webp" },
      { className: "gallery__item", image: "/shoes/g5_2.webp" },
      { className: "gallery__item", image: "/shoes/g5_3.webp" },
      { className: "gallery__item", image: "/shoes/g5_4.webp" },
      { className: "gallery__item", image: "/shoes/g5_5.webp" },
      { className: "gallery__item", image: "/shoes/g5_6.webp" }
    ],
    caption: "Mineral hues, azure undertones, and sculpted ergonomics engineered for effortless daily wear."
  },
  {
    id: "gallery-7",
    title: "Micro Grid",
    wrapClassName: "gallery-wrap",
    className: "gallery gallery--gridtiny",
    options: {},
    items: Array.from({ length: 60 }, (_, i) => ({
      className: "gallery__item",
      image: `/shoes/tiny_${i + 1}.webp`,
      key: `tiny-${i}`
    })),
    caption: "The Yeezy Archive"
  },
  {
    id: "gallery-8",
    title: "Bento Grid",
    wrapClassName: "gallery-wrap",
    className: "gallery gallery--bento",
    options: { flip: { scale: false } },
    items: [
      { className: "gallery__item", image: "/shoes/g8_1.webp" },
      { className: "gallery__item", image: "/shoes/g8_2.webp" },
      { className: "gallery__item", image: "/shoes/g8_3.webp" },
      { className: "gallery__item", image: "/shoes/g8_4.webp" },
      { className: "gallery__item", image: "/shoes/g8_5.webp" },
      { className: "gallery__item", image: "/shoes/g8_6.webp" },
      { className: "gallery__item", image: "/shoes/g8_7.webp" },
      { className: "gallery__item", image: "/shoes/g8_8.webp" }
    ],
    caption: "Signature Silhouettes"
  }
];
