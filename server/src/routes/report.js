import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import ReportService from '../services/reportService.js';
import catchAsync from '../utils/catchAsync.js';

const router = express.Router();

router.get('/generate', authenticateToken, catchAsync(async (req, res) => {
  const pdfBuffer = await ReportService.generatePDF(req.user._id);

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="CareerSoulmate_Report_${Date.now()}.pdf"`,
    'Content-Length': pdfBuffer.length,
  });

  res.send(pdfBuffer);
}));

export default router;
