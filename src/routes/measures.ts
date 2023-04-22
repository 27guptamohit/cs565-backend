import { Router, Request, Response } from 'express';
import MeasureModel from '../models/measure';

const measuresRoute = (router: Router): Router => {

  // Create a new Measure
  router.post('/measures', async (req: Request, res: Response) => {
    try {
      const newMeasure = await MeasureModel.create(req.body);
      res.status(201).json({ message: 'Measure created successfully', data: newMeasure });
    } catch (error) {
      res.status(500).json({ message: 'Error creating Measure', data: error });
    }
  });

  // Get all Measures
  router.get('/measures', async (req: Request, res: Response) => {
    try {
      const measures = await MeasureModel.find();
      res.status(200).json({ message: 'Measures retrieved successfully', data: measures });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving Measures', data: error });
    }
  });

  return router;
}

export default measuresRoute;