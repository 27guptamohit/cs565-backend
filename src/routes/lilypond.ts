import { type Request, type Response, type Router } from 'express';
import MeasureModel from '../models/measure';

const lilypondRoute = (router: Router): Router => {
  router.get('/lilypond/:id', async (req: Request, res: Response) => {
    try {
      if (req.params === undefined || req.params === null ||
            req.params.id === undefined || req.params.id === null) {
        res.status(400).json({ message: 'Lily-Measure GET failed - no sheet id provided', data: { _id: req.params.id } });
        return;
      }

      const sheetId = req.params.id;
      const foundMeasure = await MeasureModel.find({ sheetId });
      if (foundMeasure === null || foundMeasure === undefined) {
        res.status(404).json({ message: 'Lily-Measure GET failed - no sheet found', data: { _id: req.params.id } });
        return;
      }

      res.status(201).json({ message: 'Lily-Measure GET successful', data: foundMeasure });
    } catch (error) {
      res.status(500).json({ message: 'Lily-Measure GET failed - something went wrong on the server', data: error });
    }
  });

  return router;
};

export default lilypondRoute;
