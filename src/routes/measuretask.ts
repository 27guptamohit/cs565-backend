import { type Request, type Response, type Router } from 'express';
import MeasureModel from '../models/measure';

const measureTaskRoute = (router: Router): Router => {
  router.get('/measuretask', async (req: Request, res: Response) => {
    try {
      const measures = await MeasureModel.find().select('_id responses');

      if (measures.length === 0) {
        res.status(400).json({ message: 'Measure task GET failed - no measures present on server', data: '' });
        return;
      }

      // sort from least number of responses to most
      const sortedMeasures = measures.sort((measure1, measure2) => {
        return measure1.responses.length <= measure2.responses.length ? -1 : 1;
      });

      // retrieve the measure with the least responses
      const taskMeasure = await MeasureModel.findById(sortedMeasures[0]._id).select('_id image');

      res.status(200).json({ message: 'Measure task GET successful!', data: taskMeasure });
    } catch (error) {
      res.status(500).json({ message: 'Measure task GET failed - something went wrong on the server', data: error });
    }
  });

  return router;
};

export default measureTaskRoute;
