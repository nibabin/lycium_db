import express from 'express';
import LocationController from '../controllers/location.js';


const router = express.Router()
router.post('/', LocationController.addLocation)


export default router;