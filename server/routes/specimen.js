import express from 'express';
import SpecimenController from '../controllers/specimen.js';

const router = express.Router()

router.get('/', SpecimenController.getSpecimen);
router.get('/:specimen_id', SpecimenController.getSpecimenInfoById);
router.delete('/:specimen_id', SpecimenController.deleteSpecimen);
router.post('/', SpecimenController.addSpecimen);
router.put('/:specimen_id', SpecimenController.updateSpecimen);
router.get('/filter_specimen/filter', SpecimenController.getFilteredSpecimen);


export default router;