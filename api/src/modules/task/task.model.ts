import mongoose, { Schema, type InferSchemaType } from 'mongoose';


const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

export type TTask = InferSchemaType<typeof taskSchema>;

export type TPartialTask = Omit<TTask, '_id' | 'createdAt'>;

export const TaskModel = mongoose.model('Task', taskSchema);
