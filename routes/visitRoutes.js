const router = require('express').Router();

const visitCtrl = require('../controllers/visitCtrl');
const salonAuth = require('../middlwares/salonAuth');

// Auth
const auth = require('../middlwares/auth');

/**
 * @route   POST api/visit/staffforvisit
 * @desc    Find staff memebers who can provide specfice service
 * @access  Private
 * @params	Authorization
 * @body    service
 */
router.post('/staffforvisit', auth, visitCtrl.staffForVisit);

/**
 * @route   POST api/visit/registerVisit
 * @desc    Reigtser visit
 * @access  Private
 * @params	Authorization
 * @body    salon,service,customService,staff,slots:[{slot,book,_id}], price, status
 */
router.post('/registerVisit', auth, visitCtrl.registerVisit);

/**
 * @route   GET api/visit/salonVisits
 * @desc    Reigtser visit
 * @access  Private
 * @params	Authorization
 * @body    salon,service,customService,staff,slots:[{slot,book,_id}], price, status
 */
router.get('/salonVisits', auth, salonAuth, visitCtrl.salonVisit);

/**
 * @route   GET api/visit/salonVisits
 * @desc    Reigtser visit
 * @access  Private
 * @params	Authorization
 * @body    salon,service,customService,staff,slots:[{slot,book,_id}], price, status
 */
router.get('/userVisits', auth, visitCtrl.userVisits);

/**
 * @route   GET api/visit/getRating
 * @desc    Get Rating
 * @access  Private
 * @params	Authorization to get visitor ID
 * @body    SalonId
 */
router.post('/getRating', visitCtrl.getRating);

/**
 * @route   GET api/visit/salonVisits
 * @desc    Reigtser visit
 * @access  Private
 * @params	Authorization to get visitor ID
 * @body    visitId
 */
router.patch('/clearVisit', auth, visitCtrl.clearVisit);

module.exports = router;
