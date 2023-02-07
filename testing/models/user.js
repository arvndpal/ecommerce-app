import mongoose from 'mongoose';
import crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        default: 0,
        type: Number
    },
    history: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

//virtual field

userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    })

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        console.log(password);

        if (!password) return ""
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ""
        }
    }
}

const UserModel = mongoose.model("User", userSchema);
export default UserModel;  