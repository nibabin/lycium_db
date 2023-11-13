import express from 'express';
import SpecimenController from '../controllers/specimen.js';

const router = express.Router()

router.get('/', SpecimenController.getSpecimen);
router.get('/:specimen_id', SpecimenController.getSpecimenInfoById);




export default router;