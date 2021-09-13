const router = require('express').Router();
const Spaeti = require('../models/Spaeti.js');
const User = require('../models/User.js');
const Item = require('../models/Item.js');
// const { uploader, cloudinary } = require('../config/cloudinary');

router.get('/new', (req, res, next) => {
  Spaeti.find().then((spaetiFromDB) => {
    res.render('new', { spaetis: spaetiFromDB });
  });
});

router.post('/', (req, res, next) => {
  const { name, imageUrl, hasSeating, hasAtm, hasWC, inventory, price } =
    req.body;
  // const imgPath = req.file.path;
  // const imgName = req.file.originalname;
  // const publicId = req.file.filename;
  Spaeti.create({
    name: name,
    // imgPath: imgPath,
    // imgName: imgName,
    hasSeating: hasSeating,
    hasAtm: hasAtm,
    hasWC: hasWC,
    inventory: inventory,
    price: price,
  })

    .then((createdSpati) => {
      res.redirect(`/spaetis/${createdSpati._id}`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
