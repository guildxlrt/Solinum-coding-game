import express from 'express';
import controller from '../controllers/Point';

const router = express.Router();

router.post('/new', controller.newPoint);
router.get('/all', controller.getAll);
router.put('/update', controller.updatePoint);
router.patch('/state', controller.changeState);

export = router;