import { type Request, type Response, type Router } from 'express';
import MeasureModel from '../models/measure';

const measureResponseRoute = (router: Router): Router => {
  router.post('/measureresponse', async (req: Request, res: Response) => {
    try {
      if (!('measureId' in req.body)) {
        res.status(400).json({ message: 'MeasureResponse POST failed - validation error', data: '_id is required' });
        return;
      }

      if (!('measureResponse' in req.body)) {
        res.status(400).json({ message: 'MeasureResponse POST failed - validation error', data: 'measureResponse is required' });
        return;
      }

      const result = await MeasureModel.findByIdAndUpdate(req.body.measureId, { $push: { responses: req.body.measureResponse } }, { returnDocument: 'after', select: '_id sheetId measureNum responses' });
      res.status(201).json({ message: 'MeasureResponse POST successful!', data: result });
    } catch (error) {
      res.status(500).json({ message: 'MeasureResponse POST failed - something went wrong on the server', data: error });
    }
  });

  return router;
};

export default measureResponseRoute;
