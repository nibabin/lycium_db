import express from 'express';
import GenomicsController from '../controllers/genomics.js';

const router = express.Router()
router.get('/:specimen_id', GenomicsController.getSpecimenGenomics)
router.delete('/:genomic_id', GenomicsController.deleteGenomicNumber)
router.post('/:specimen_id', GenomicsController.addGenomicNumber)

export default router;