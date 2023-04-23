import { type Request, type Response, type Router } from 'express';
import { isValidObjectId } from 'mongoose';
// import { type Symbols } from '../models/symbol';
// import { type MeasureResponse } from '../models/response';
// import { type Measure } from '../models/measure';

// import SheetModel from '../models/sheet';
import MeasureModel from '../models/measure';
// import MeasureResponseModel from '../models/response';
// import SymbolModel from '../models/symbol';

const lilypondRoute = (router: Router): Router => {
  router.get('/lilypond:id', async (req: Request, res: Response) => {
    try {
      if (req.params === undefined || req.params === null ||
            req.params.id === undefined || req.params.id === null) {
        res.status(400).json({ message: 'Measure GET failed - no object id provided', data: { _id: req.params.id } });
        return;
      }

      if (!isValidObjectId(req.params.id)) {
        res.status(400).json({ message: 'Measure GET failed - invalid object id', data: { _id: req.params.id } });
        return;
      }

      const sheetId = req.params.id;
      const foundMeasure = await MeasureModel.find({ sheetId });
      if (foundMeasure === null || foundMeasure === undefined) {
        res.status(404).json({ message: 'Measure GET failed - no sheet found', data: { _id: req.params.id } });
        return;
      }

      res.status(201).json({ message: 'Sheet GET successful', data: foundMeasure });
    } catch (error) {
      res.status(500).json({ message: 'Sheet GET failed - something went wrong on the server', data: error });
    }
  });

  return router;
};

export default lilypondRoute;
