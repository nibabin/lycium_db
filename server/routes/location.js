import express from 'express';
import LocationController from '../controllers/location.js';


const router = express.Router()
router.get('/', LocationController.getLocationByParams);
router.post('/', LocationController.addLocation)


export default router;