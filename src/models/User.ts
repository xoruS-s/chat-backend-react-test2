import mongoose, { Schema, Document } from 'mongoose';
import bcrypt, {hash} from 'bcrypt';
// import isEmail from 'validator';

export interface IUser extends Document {
    email: string;
    fullname: string;
    password: string;
    confirmed: boolean;
    avatar: string;
    confirm_hash: string;
    last_seen: Date;
}

const UserSchema = new Schema({
    email: { type: String, require: 'Укажите адрес электронной почты', index: { unique: true } },
    fullname: { type: String, require: true },
    password: { type: String, require: true },
    confirmed: { type: Boolean, default: false },
    avatar: String,
    confirm_hash: String,
    last_seen: { type: Date, default: new Date() }
}, {
    timestamps: true
});

// UserSchema.pre('save', (next => {
//     let user: any = this;
//
//     if (!user.isModified('password')) return next();
//
//     bcrypt.genSalt((err, salt) => {
//         if (err) {
//             return next(err);
//         }
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);
//
//             user.password = hash;
//             next();
//         })
//     })
// }));

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;