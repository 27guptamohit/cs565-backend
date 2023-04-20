import { Router, Request, Response } from 'express';
import MeasureModel from '../models/measure';

const router = Router();

// Create a new Measure
router.post('/measure', async (req: Request, res: Response) => {
  try {
    const newMeasure = await MeasureModel.create(req.body);
    res.status(201).json({ message: 'Measure created successfully', data: newMeasure });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Measure', data: error });
  }
});

// Get all Measures
router.get('/measure', async (req: Request, res: Response) => {
  try {
    const measures = await MeasureModel.find();
    res.status(200).json({ message: 'Measures retrieved successfully', data: measures });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Measures', data: error });
  }
});

// Update a Measure by ID
router.put('/measure:id', async (req: Request, res: Response) => {
  try {
    const measureId = req.params.id;
    const updatedMeasure = await MeasureModel.findByIdAndUpdate(measureId, req.body, { new: true });
    res.status(200).json({ message: 'Measure updated successfully', data: updatedMeasure });
  } catch (error) {
    res.status(500).json({ message: 'Error updating Measure', data: error });
  }
});

// Delete a Measure by ID
router.delete('/measure:id', async (req: Request, res: Response) => {
  try {
    const measureId = req.params.id;
    await MeasureModel.findByIdAndDelete(measureId);
    res.status(200).json({ message: 'Measure deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Measure', data: error });
  }
});

export default router;