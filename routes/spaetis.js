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
    .then((spaetiFromDB) => {
      console.log('this is the spaeti route');
      // res.render('spaeti', { spaetis: spaetiFromDB });
      res.json(spaetiFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/spaeti', (req, res, next) => {
  const {
    name,
    imageUrl,
    reviews,
    hasSeating,
    hasAtm,
    hasWC,
    inventory,
    price,
  } = req.body;
  const list = '';
  list += '<option select></option>';
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
    price: price,
  })
    .then((createdSpaeti) => {
      console.log(createdSpaeti);

      res.redirect(`/spaeti/${createdSpaeti._id}`);
    })
    .catch((err) => next(err));
});


// show Späti details
router.get('/spaeti/:id', (req, res, next) => {
  Spaeti.findById(req.params.id)
    .then((spaeti) => {
      res.render('show.hbs', { spaeti });
    })
    .catch((err) => {
      next(err);
    });
});


// Edit Späti:
router.get('/spaeti/edit/:id', (req, res, next) => {

	const spaetiId = req.params.id;
	Spaeti.findById(spaetiId)
		.then(spaetiFromDB => {
      console.log('SPÄTI EDIT')
			res.render('spaetiEdit', { spaeti: spaetiFromDB });
		})
		.catch(err => {
			next(err);
		})
});

router.post('/spaeti/edit/:id', (req, res, next) => {
	const spaetiId = req.params.id;
	const { name, image, hasSeating, hasAtm, hasWC, price } = req.body;
	

	Spaeti.findByIdAndUpdate(spaetiId, {
		name: name,
		image: image,
    hasSeating: hasSeating,
    hasAtm: hasAtm,
    hasWC: hasWC,
    price: price
	}, { new: true })
		.then(updatedSpaeti => {
			console.log('Späti editing DONE')
			res.redirect(`/spaeti/${updatedSpaeti._id}`);
		})
		.catch(err => {
			next(err);
		})
});

router.post('/spaeti/:id/reviews', (req, res, next) => {
const user = req.user.username
// console.log(Object.values(user))
// console.log('this is the params', req.params)
console.log('this is the user', user)
const spaetiId = req.params.id;
const { text } = req.body;
Spaeti.findByIdAndUpdate(spaetiId, { $push: { reviews: { user: user, text: text } } }, { new: true })
  .then(spaetiFromDB => {
    console.log(spaetiFromDB);
    // redirect to the detail view of this book
    res.redirect(`/spaeti/${spaetiId}`);
  })
  .catch(err => {
    next(err);
  })
});

module.exports = router;
