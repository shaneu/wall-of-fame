const express = require('express');

const router = express.Router();
const beerController = require('../controllers/beerController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/api/beers', catchErrors(beerController.getBeers));
router.post('/api/beers', catchErrors(beerController.addBeer));

router.get('/api/beers/:id', catchErrors(beerController.getIndividualBeer));
router.delete('/api/beers/:id', catchErrors(beerController.getBeerInfo));
router.put('api/beers/:id', catchErrors(beerController.updateBeer));

router.get('/api/beers/search/:beer', beerController.searchUntappd);
router.get('/api/beers/info/:beerId', beerController.getBeerInfoUntappd);

router.post('/register', userController.validateRegister, catchErrors(userController.register));
// router.get('/register', userController.register);

module.exports = router;
