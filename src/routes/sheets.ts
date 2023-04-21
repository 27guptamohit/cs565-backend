import { type Request, type Response, type Router } from 'express';

import SheetModel from '../models/sheet';

const sheetsRoute = (router: Router): Router => {
  router.get('/sheets', async (req: Request, res: Response) => {
    try {
      const sheets = await SheetModel.find();
      return res.status(200).json({ message: 'Sheets GET successful', data: sheets });
    } catch (error) {
      return res.status(500).json({ message: 'Sheets GET failed - something went wrong on the server', data: error });
    }
  });

  router.post('/sheets', async (req: Request, res: Response) => {
    try {
      if (!('name' in req.body)) {
        res.status(400).json({ message: 'Sheet POST failed - validation error', data: 'name is required' });
        return;
      }

      if (!('image' in req.body)) {
        res.status(400).json({ message: 'Sheet POST failed - validation error', data: 'image is required' });
        return;
      }

      const existingSheet = await SheetModel.findOne(req.body);
      if (existingSheet !== null) {
        res.status(400).json({ message: 'Sheet POST failed - validation error', data: 'sheet already exists!' });
        return;
      }

      const createdSheet = await SheetModel.create(req.body);
      return res.status(201).json({ message: 'Sheet POST successful', data: createdSheet });
    } catch (error) {
      return res.status(500).json({ message: 'Sheet POST failed - something went wrong on the server', data: error });
    }
  });

  return router;
};

export default sheetsRoute;
