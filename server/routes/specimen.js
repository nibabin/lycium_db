import express from 'express';
import SpecimenController from '../controllers/specimen.js';

const router = express.Router()

router.get('/', SpecimenController.getSpecimen)

export default router;