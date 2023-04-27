import { type Router, type Request, type Response } from 'express';

import queryParams from './common/query-params';
import MeasureModel from '../models/measure';

// TODO: eventually better error checking
const measuresIdRoute = (router: Router): Router => {
  // Get a Measure by ID
  router.get('/measures/:id', async (req: Request, res: Response) => {
    try {
      const measureId = req.params.id;
      const measure = await queryParams(MeasureModel.findById(measureId), req.query);
      res.status(200).json({ message: 'Measure retrieved successfully', data: measure });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving Measure', data: error });
    }
  });

  // Update a Measure by ID
  router.put('/measures/:id', async (req: Request, res: Response) => {
    try {
      if ('responseCount' in req.body) {
        req.body.responseCount = req.body.responses.length;
      }

      const measureId = req.params.id;
      const updatedMeasure = await MeasureModel.findByIdAndUpdate(measureId, req.body, { new: true });
      res.status(200).json({ message: 'Measure updated successfully', data: updatedMeasure });
    } catch (error) {
      res.status(500).json({ message: 'Error updating Measure', data: error });
    }
  });

  // Delete a Measure by ID
  router.delete('/measures/:id', async (req: Request, res: Response) => {
    try {
      const measureId = req.params.id;
      const removedMeasure = await MeasureModel.findByIdAndDelete(measureId);
      res.status(200).json({ message: 'Measure deleted successfully', data: removedMeasure });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting Measure', data: error });
    }
  });

  return router;
};

export default measuresIdRoute;
