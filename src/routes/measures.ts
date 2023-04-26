import { type Router, type Request, type Response } from 'express';

import queryParams from './common/query-params';
import MeasureModel from '../models/measure';

const measuresRoute = (router: Router): Router => {
  // Create a new Measure
  router.post('/measures', async (req: Request, res: Response) => {
    try {
      if ('responseCount' in req.body) {
        req.body.responseCount = req.body.responses.length;
      }

      const newMeasure = await MeasureModel.create(req.body);
      res.status(201).json({ message: 'Measure created successfully', data: newMeasure });
    } catch (error) {
      res.status(500).json({ message: 'Error creating Measure', data: error });
    }
  });

  // Get all Measures
  router.get('/measures', async (req: Request, res: Response) => {
    try {
      const measures = await queryParams(MeasureModel.find(), req.query);
      res.status(200).json({ message: 'Measures retrieved successfully', data: measures });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving Measures', data: error });
    }
  });

  return router;
};

export default measuresRoute;
