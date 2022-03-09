const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Minimum password length is 6 character']
    },
    role: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email/Password Salah!')
    }

    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
        throw Error('Email/Password Salah!')
    }

    return user
}

const User = mongoose.model('user', userSchema);
module.exports = User;