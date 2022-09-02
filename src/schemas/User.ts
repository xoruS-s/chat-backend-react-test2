import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator';

// export interface IUser extends Document {
//     email: string;
//     fullname: string;
//     password: string;
//     confirmed: boolean;
//     avatar: string;
//     confirm_hash: string;
//     last_seen: Date;
// }

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

const UserModel = mongoose.model/*<IUser>*/('User', UserSchema);

export default UserModel;