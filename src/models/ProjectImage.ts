import mongoose from 'mongoose';

const ProjectImageSchema = new mongoose.Schema({
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
}, { timestamps: true });

export const ProjectImage = mongoose.models.ProjectImage || mongoose.model('ProjectImage', ProjectImageSchema);
