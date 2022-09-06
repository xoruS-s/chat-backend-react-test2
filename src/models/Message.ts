import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    text: string;
    read: boolean;
    dialog: { type: Schema.Types.ObjectId; ref: string; require: true; };
}

const MessageSchema = new Schema({
    text: { type: String, require: Boolean },
    dialog: { type: Schema.Types.ObjectId, ref: 'Dialog', require: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    read: { type: Boolean, default: false },
    // attachments: [{ type: Schema.Types.ObjectId, ref: "UploadFile" }]
}, {
    timestamps: true
});

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;