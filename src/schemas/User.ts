import mongoose, { Schema } from 'mongoose';
import isEmail from 'validator';

const UserSchema = new Schema({
    email: {
        type: String,
        required: 'Укажите адрес электронной почты',
        index: { unique: true },
        // validate: [isEmail, 'Invalid email']
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    avatar: String,
    confirm_hash: String,
    last_seen: Date,
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;