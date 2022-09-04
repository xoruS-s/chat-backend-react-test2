import mongoose, { Schema, Document } from 'mongoose';

export interface IDialog extends Document {
    partner: {
        type: Schema.Types.ObjectId,
        ref: string;
    };
    author: {
        type: Schema.Types.ObjectId,
        ref: string;
    };
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: string;
    };
}

const DialogSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }
},{
    timestamps: true
});

const DialogModel = mongoose.model<IDialog>('Dialog', DialogSchema);

export default DialogModel;