import express from 'express';
import GeneticsController from '../controllers/genetics.js';


const router = express.Router()
router.get('/', GeneticsController.getGeneticsByParams);
router.post('/', GeneticsController.addGenetics)

export default router;