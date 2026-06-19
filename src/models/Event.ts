import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  eventType: string; // 'page_view', 'project_click', 'resume_download', etc.
  path: string;
  metadata?: any;
  createdAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    eventType: { type: String, required: true },
    path: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Event = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
