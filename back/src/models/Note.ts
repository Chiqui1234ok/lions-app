import { Schema, model } from 'mongoose'
import Note from '../interfaces/Note';

const NoteSchema = new Schema<Note>(
    {
        title: { type: String },
        body: {type: String, required: true},
        date: {type: Date, required: true}
    }
);

const NoteModel = model<Note>('Note', NoteSchema);

export default NoteModel;