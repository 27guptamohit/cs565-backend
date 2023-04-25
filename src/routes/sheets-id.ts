import { type Request, type Response, type Router } from 'express';
import { isValidObjectId } from 'mongoose';

import queryParams from './common/query-params';
import SheetModel from '../models/sheet';

const sheetsIdRoute = (router: Router): Router => {
  router.get('/sheets/:id', async (req: Request, res: Response) => {
    try {
      if (req.params === undefined || req.params === null ||
                req.params.id === undefined || req.params.id === null) {
        res.status(400).json({ message: 'Sheet GET failed - no object id provided', data: { _id: req.params.id } });
        return;
      }

      if (!isValidObjectId(req.params.id)) {
        res.status(400).json({ message: 'Sheet GET failed - invalid object id', data: { _id: req.params.id } });
        return;
      }

      const foundSheet = await queryParams(SheetModel.findById(req.params.id), req.query);
      if (foundSheet === null || foundSheet === undefined) {
        res.status(404).json({ message: 'Sheet GET failed - no sheet found', data: { _id: req.params.id } });
        return;
      }

      res.status(200).json({ message: 'Sheet GET successful!', data: foundSheet });
    } catch (error) {
      res.status(500).json({ message: 'Sheet GET failed - something went wrong on the server', data: error });
    }
  });

  router.put('/sheets/:id', async (req: Request, res: Response) => {
    try {
      if (req.params === undefined || req.params === null ||
                req.params.id === undefined || req.params.id === null) {
        res.status(400).json({ message: 'Sheet PUT failed - no object id provided', data: { _id: req.params.id } });
        return;
      }

      if (!isValidObjectId(req.params.id)) {
        res.status(400).json({ message: 'Sheet PUT failed - invalid object id', data: { _id: req.params.id } });
        return;
      }

      const foundSheet = await SheetModel.findById(req.params.id);
      if (foundSheet === null || foundSheet === undefined) {
        res.status(404).json({ message: 'Sheet PUT failed - no sheet found', data: { _id: req.params.id } });
        return;
      }

      if (!('_id' in req.body)) {
        res.status(400).json({ message: 'Sheet PUT failed - no object id provided in body (_id)' });
        return;
      } if (req.params.id !== req.body._id) {
        res.status(400).json({ message: 'Sheet PUT failed - parameter id and body _id must agree', data: { param_id: req.params.id, _id: req.body._id } });
        return;
      }

      if (!('name' in req.body)) {
        res.status(400).json({ message: 'Sheet PUT failed - validation error', data: 'name is required' });
        return;
      }

      if (!('image' in req.body)) {
        res.status(400).json({ message: 'Sheet PUT failed - validation error', data: 'image is required' });
        return;
      }

      const existingSheet = await SheetModel.findOne({ name: req.body.name, sheet: req.body.sheet });
      if (existingSheet !== null) {
        res.status(400).json({ message: 'Sheet PUT failed - validation error', data: 'name/image combination already exists!' });
        return;
      }

      const updatedSheet = await SheetModel.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });

      res.status(200).json({ message: 'Sheet PUT successful!', data: updatedSheet });
    } catch (error) {
      res.status(500).json({ message: 'Sheet PUT failed - something went wrong on the server', data: error });
    }
  });

  router.delete('/sheets/:id', async (req: Request, res: Response) => {
    try {
      if (req.params === undefined || req.params === null ||
                req.params.id === undefined || req.params.id === null) {
        res.status(400).json({ message: 'Sheet DELETE failed - no object id provided', data: { _id: req.params.id } });
        return;
      }

      if (!isValidObjectId(req.params.id)) {
        res.status(400).json({ message: 'Sheet DELETE failed - invalid object id', data: { _id: req.params.id } });
        return;
      }

      const foundSheet = await SheetModel.findById(req.params.id);
      if (foundSheet === null || foundSheet === undefined) {
        res.status(404).json({ message: 'Sheet DELETE failed - no sheet found', data: { _id: req.params.id } });
        return;
      }

      const removedSheet = await SheetModel.findByIdAndRemove(req.params.id);

      res.status(200).json({ message: 'Sheet DELETE successful!', data: removedSheet });
    } catch (error) {
      res.status(500).json({ message: 'Sheet DELETE failed - something went wrong on the server', data: error });
    }
  });

  return router;
};

export default sheetsIdRoute;
