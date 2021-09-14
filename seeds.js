const mongoose = require('mongoose');

const Spaeti = require('./models/Spaeti');

mongoose.connect('mongodb://localhost/SpaetiFinder');

const spaetis = [
  {
    name: 'Späti 63',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipMHTFISVQIwq0xrXHspd8owu0sFay81ESRfkkey=w408-h306-k-no',
    address: {
      street: 'Möllendorffstraße 43 Berlin',
      zipcode: 10367,
      city: 'Berlin',
    },
    hasSeating: false,
    hasAtm: false,
    hasWC: false,
  },
  {
    name: 'Alan Späti',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipMcuUC2kDyGd_F3l1501--BsRsG_GGLEsIshE2A=w408-h544-k-no',
    address: {
      street: 'Weitlingstraße 74',
      zipcode: 10317,
      city: 'Berlin',
    },
    hasSeating: true,
    hasAtm: true,
    hasWC: false,
  },
  {
    name: 'Weitling Späti',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipNk5lEBNLfdoWVk_xgziSdYDtpgtXKetpBG4Ku7=w408-h306-k-no',
    address: {
      street: 'Weitlingstraße 40',
      zipcode: 10317,
      city: 'Berlin',
    },
    hasSeating: false,
    hasAtm: true,
    hasWC: true,
  },
  {
    name: 'Späti 04',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipOj7cXA-BTkCFobhlwHQrt_Wb8rQsVbRAVO0V4=w535-h240-k-no',
    address: {
      street: 'Simplonstraße 29',
      zipcode: 10245,
      city: 'Berlin',
    },
    hasSeating: true,
    hasAtm: false,
    hasWC: false,
  },
  {
    name: 'We Love Spati',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipPyxcEiDq9mID68jPVZIuSRjFP82Wy6ChpKxB-f=w426-h240-k-no',
    address: {
      street: 'Danziger Straße 44',
      zipcode: 10435,
      city: 'Berlin',
    },
    hasSeating: true,
    hasAtm: true,
    hasWC: true,
  },
  {
    name: 'DN Späti',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipNvvEwpMNbUMHYZ55aq49vOaWKa4ldIACCWqc_L=w408-h306-k-no',
    address: {
      street: 'Boxhagener Straße 25',
      zipcode: 10245,
      city: 'Berlin',
    },
    hasSeating: true,
    hasAtm: true,
    hasWC: false,
  },
  {
    name: 'I Love Späti',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipMzFpywtQAkOCrt79YCs4ERukPA2W7qlXitJK7J=w156-h96-p-k-no',
    address: {
      street: 'Gärtnerstraße 33',
      zipcode: 10245,
      city: 'Berlin',
    },
    hasSeating: false,
    hasAtm: true,
    hasWC: false,
  },
  {
    name: 'Späti am Schlesi',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipO62eNV5taWc1xuxSEAw7SAP2elrQ0Y7RFL2onk=w426-h240-k-no',
    address: {
      street: 'Skalitzer Straße 74',
      zipcode: 10997,
      city: 'Berlin',
    },
    hasSeating: false,
    hasAtm: false,
    hasWC: false,
  },
  {
    name: 'Spati Kreuzberg',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipPhfIlGF0_2cYqsiZErpvw7QZ_m45ZtADep2Ph2=w408-h725-k-no',
    address: {
      street: 'Oranienstraße 30',
      zipcode: 10999,
      city: 'Berlin',
    },
    hasSeating: true,
    hasAtm: true,
    hasWC: false,
  },
  {
    name: 'Späti Gegatheesmaran',
    // imageUrl: ,
    address: {
      street: 'Liegnitzer Straße 27',
      zipcode: 10999,
      city: 'Berlin',
    },
    hasSeating: false,
    hasAtm: false,
    hasWC: false,
  },
  {
    name: 'Dein Spati Berlin',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipP1X-b8Zohw2mjIVjaM_LBXjRqE4yw78Y1mqs66=w426-h240-k-no',
    address: {
      street: 'Wiener Straße 28',
      zipcode: 10999,
      city: 'Berlin',
    },
    hasSeating: false,
    hasAtm: false,
    hasWC: false,
  },
  {
    name: 'My Späti',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipOeOJQsV9ZnFu6w4cZM4wc0ywZ4HKSAhFHlhBoS=w426-h240-k-no',
    address: {
      street: 'Colbestraße 5',
      zipcode: 10247,
      city: 'Berlin',
    },
    hasSeating: true,
    hasAtm: false,
    hasWC: false,
  },
  {
    name: 'Spief 24',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipO1nYO-1mcovaLyFuVRmiileLwNc8GVAoMr7z2y=w408-h544-k-no',
    address: {
      street: 'Niederbarnimstraße 26',
      zipcode: 10247,
      city: 'Berlin',
    },
    hasSeating: true,
    hasAtm: true,
    hasWC: false,
  },
  {
    name: 'Kiti Markt',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipOGb1bGqcVoJW0yJjCn-6oWO43qMoFUmtB-FQM=w408-h544-k-no',
    address: {
      street: 'Petersburger Straße 68',
      zipcode: 10249,
      city: 'Berlin',
    },
    hasSeating: true,
    hasAtm: true,
    hasWC: false,
  },
  {
    name: 'Späti Neukölln',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipPb_ssuWdA_OksMlNlX_shz96UMjYysNg6CDA7b=w408-h725-k-no',
    address: {
      street: 'Treptower Straße 12',
      zipcode: 12059,
      city: 'Berlin',
    },
    hasSeating: false,
    hasAtm: false,
    hasWC: true,
  },
  {
    name: 'Troja Spätkauf',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipN-bvA0z1Y4SKxIDeZ_AV2hvvFb6byzfnbQhO6e=w408-h544-k-no',
    address: {
      street: 'Harzer Straße 85',
      zipcode: 12059,
      city: 'Berlin',
    },
    hasSeating: true,
    hasAtm: false,
    hasWC: false,
  },
  {
    name: 'Emser Späti',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipPwUpEY8kHNyHfy5t7bw0zOceGVnez_rSs-mIoT=w408-h331-k-no',
    address: {
      street: 'Emser Straße 11',
      zipcode: 12051,
      city: 'Berlin',
    },
    hasSeating: false,
    hasAtm: false,
    hasWC: false,
  },
  {
    name: 'Späti am Möckernpark',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipMoS1zz8CixJECcyVVhjA3NkkU3c5h7pacZrHRc=w426-h240-k-no',
    address: {
      street: 'Obentrautstraße 70',
      zipcode: 10963,
      city: 'Berlin',
    },
    hasSeating: false,
    hasAtm: true,
    hasWC: false,
  },
  {
    name: 'Yusufs Späti',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipPD8ZK7Vy-y7rfhubEzebTfkh6N7qePKKzemQh0=w408-h271-k-no',
    address: {
      street: 'Bernburger Treppe',
      zipcode: 10963,
      city: 'Berlin',
    },
    hasSeating: false,
    hasAtm: false,
    hasWC: false,
  },
  {
    name: 'Bis Späti',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipOuBM7mnWIp_22231V8KRd_tzvpDzSNnXniV9gR=w448-h240-k-no',
    address: {
      street: 'Oderberger Straße 30',
      zipcode: 10435,
      city: 'Berlin',
    },
    hasSeating: true,
    hasAtm: true,
    hasWC: true,
  },
];

Spaeti.insertMany(spaetis)
  .then((spaetis) => {
    console.log(`Success - ${spaetis.length} spaetis seeded to the database`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
