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


// Späti view
 
router.get('/spaeti', (req, res, next) => {
    
  Spaeti.find()
      .then(spaetiFromDB => {
          
          console.log('this is the spaeti route');
          res.render('spaeti', { spaetis: spaetiFromDB });
      })
      .catch(err => {
          next(err);
      })
})

router.post('/spaeti', (req, res, next) => {
  
  const { name, imageUrl, reviews, hasSeating, hasAtm, hasWC, inventory, price } = req.body;
  const list = '';
  list += '<option select></option>'
  // const imgPath = req.file.path;
  // const imgName = req.file.originalname;
  // const publicId = req.file.filename;
  

  // create a new spaeti in the database
  Spaeti.create({
      name: name,
      imageUrl: imageUrl,
      // imgPath: imgPath,
      // imgName: imgName,
      reviews: reviews,
      hasSeating: hasSeating,
      hasAtm: hasAtm,
      hasWC: hasWC,
      inventory: inventory,
      price: price
  })
      .then(createdSpaeti => {
          console.log(createdSpaeti);
          
          res.redirect(`/spaeti/${createdSpaeti._id}`);
      })
      .catch(err => next(err));
});



module.exports = router;
