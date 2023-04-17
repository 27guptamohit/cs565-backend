import { type Request, type Response, type Router } from 'express';

import SheetModel from '../models/sheet';

const sheetsRoute = (router: Router): Router => {
  router.post('/sheets', async (req: Request, res: Response) => {
    try {
      const createdSheet = await SheetModel.create(req.body);
      return res.status(201).json({ message: 'Sheet POST successful', data: createdSheet });
    } catch (error) {
      return res.status(500).json({ message: 'Sheet POST failed - something went wrong on the server', data: error });
    }
  });

  return router;
};

export default sheetsRoute;
