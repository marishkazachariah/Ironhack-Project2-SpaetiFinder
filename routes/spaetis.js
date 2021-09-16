const router = require('express').Router();
const Spaeti = require('../models/Spaeti.js');
const User = require('../models/User.js');
const Item = require('../models/Item.js');

const MapboxClient = require('mapbox');
const accessToken = "pk.eyJ1IjoidHJhbnNpcmVudCIsImEiOiJja255bXRtZGowbHF0MnBvM3U4d2J1ZG5vIn0.IVcxB9Xw6Tcc8yHGdK_0zA";
const client = new MapboxClient(accessToken);

const { loginCheck } = require('./middlewares');



// const { uploader, cloudinary } = require('../config/cloudinary');

router.get('/new', (req, res, next) => {
  Spaeti.find().then((spaetiFromDB) => {
    const plz = req.query.plz || "";
    const city = req.query.city || "";
    const street = req.query.street || "";
    res.render('new', { spaetis: spaetiFromDB, plz: plz, city: city, street: street });
  });
});

// Späti view
router.get('/spaetis', (req, res, next) => {
  Spaeti.find()
    .then((spaetiFromDB) => {
      
      res.render('spaetizz', { spaetis: spaetiFromDB });
      
    })
    .catch((err) => {
      next(err);
    });
});


router.get('/spaeti', (req, res, next) => {
  Spaeti.find()
    .then((spaetiFromDB) => {
      
      //res.render('spaeti', { spaetis: spaetiFromDB });
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
    street,
    city,
    zip,
    hasSeating,
    hasAtm,
    hasWC,
    inventory,
    price,
  } = req.body;
  //const list = '';
  // list += '<option select></option>';
  //console.log(req.body)
  // const imgPath = req.file.path;
  // const imgName = req.file.originalname;
  // const publicId = req.file.filename;
  const address = `${street}, ${city}, ${zip}`;
  client.geocodeForward(address)
  .then(response => {
    // res is the http response, including: status, headers and entity properties
    var data = response.entity.features[0].geometry.coordinates; // data is the geocoding result as parsed JSON
    const latitude = data[0]
    const longitude = data[1]
    //console.log('THIS IS THE NEW LOG', latitude, longitude)
    const location = {
      address: {
        street: street,
        city: city,
        zipcode: zip,
      }
    }
    Spaeti.create({
      name: name,
      imageUrl: imageUrl,
      // imgPath: imgPath,
      // imgName: imgName,
      location: location,
      latitude: latitude,
      longitude: longitude,
      reviews: reviews,
      hasSeating: hasSeating,
      hasAtm: hasAtm,
      hasWC: hasWC,
      inventory: inventory,
      price: price,
      owner: req.user._id
    })
    .then((createdSpaeti) => {
      console.log('back end log', createdSpaeti); 
      res.json(createdSpaeti);
    })
    .catch((err) => next(err));
   }) 
});

router.get('/spaeti/delete/:id', loginCheck(), (req, res, next) => {
  
	const spaetiId = req.params.id;
  const query = { _id: spaetiId, owner: req.user._id }
  console.log(query)
	Spaeti.findOneAndDelete(query)
    .then(() => res.redirect('/spaetis'))
    .catch(err => next(err));
});

// show Späti details
router.get('/spaeti/:id', (req, res, next) => {
  const loggedInUser = req.user;
  Spaeti.findById(req.params.id)
    .then((spaeti) => {
      res.render('show.hbs', { spaeti, user: loggedInUser });
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
      //console.log('SPÄTI EDIT')
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
			//console.log('Späti editing DONE')
			res.redirect(`/spaeti/${updatedSpaeti._id}`);
		})
		.catch(err => {
			next(err);
		})
});




router.post('/spaeti/:id/reviews', (req, res, next) => {
const user = req.user.username
console.log('this is the user', user)
const spaetiId = req.params.id;
const { text } = req.body;
Spaeti.findByIdAndUpdate(spaetiId, { $push: { reviews: { user: user, text: text } } }, { new: true })
  .then(spaetiFromDB => {
    console.log(spaetiFromDB);
    // redirect to the detail view of this book
    (res.redirect(`/spaeti/${spaetiId}`));
  })
  .catch(err => {
    next(err);
  })
});

module.exports = router;
