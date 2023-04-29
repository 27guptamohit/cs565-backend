import { type Request, type Response, type Router } from 'express';
import MeasureModel from '../models/measure';

const measureTaskRoute = (router: Router): Router => {
  router.get('/measuretask', async (req: Request, res: Response) => {
    try {
      const measures = await MeasureModel.find().select('_id sheetId measureNum responses');

      if (measures.length === 0) {
        res.status(400).json({ message: 'Measure task GET failed - no measures present on server', data: '' });
        return;
      }

      // sort from least number of responses to most
      const sortedMeasures = measures.sort((measure1, measure2) => {
        return measure1.responses.length <= measure2.responses.length ? -1 : 1;
      });

      const measuresLeastResponses = [];
      const minResponses: number = sortedMeasures[0].responses.length;
      for (let i: number = 0; i < sortedMeasures.length; ++i) {
        if (sortedMeasures[i].responses.length === minResponses) {
          measuresLeastResponses.push(sortedMeasures[i]);
        }
      }

      // retrieve random measure with least responses
      const selectedMeasure = measuresLeastResponses[Math.floor(Math.random() * measuresLeastResponses.length)];
      const taskMeasure = await MeasureModel.findById(selectedMeasure).select('_id image');

      res.status(200).json({ message: 'Measure task GET successful!', data: taskMeasure });
    } catch (error) {
      res.status(500).json({ message: 'Measure task GET failed - something went wrong on the server', data: error });
    }
  });

  return router;
};

export default measureTaskRoute;
