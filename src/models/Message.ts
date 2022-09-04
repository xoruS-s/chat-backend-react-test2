import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
    author: {
        type: String
    },
    partner: {
        type: String
    },
    text: {
        type: String
    },
    dialog: {
        type: String
    },
    unread: {
        type: String
    },
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;