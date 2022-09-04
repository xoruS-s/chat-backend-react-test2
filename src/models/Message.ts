import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    text: string;
    read: boolean;
    dialog: {
      type: Schema.Types.ObjectId;
      ref: string;
      require: true;
    };
}

const MessageSchema = new Schema({
    text: {
        type: String,
        require: Boolean
    },
    read: {
        type: Boolean,
        default: false
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Dialog'
    },

}, {
    timestamps: true
});

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;