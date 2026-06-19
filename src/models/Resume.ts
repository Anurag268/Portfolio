import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  fileName: { type: String, required: true },
}, { timestamps: true });

export const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
