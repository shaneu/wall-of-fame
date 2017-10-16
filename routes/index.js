const express = require('express');

const router = express.Router();
const beerController = require('../controllers/beerController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(beerController.getBeers));
router.post('/', catchErrors(beerController.addBeer));

router.get('/:id', catchErrors(beerController.getIndividualBeer));
router.delete('/:id', catchErrors(beerController.getBeerInfo));
router.put('/:id', catchErrors(beerController.updateBeer));

router.get('/search/:beer', beerController.searchUntappd);
router.get('info/:beerId', beerController.getBeerInfoUntappd);

module.exports = router;
