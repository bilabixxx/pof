const mongoose = require('mongoose');
const User = require('../models/users');

const statusAdded = 201;
const statusError = 404;

const createdMessage = "Utente creato con successo!"
const updatedMessage = "Utente aggiornato con successo!"
const deletedMessage = "Utente eliminato con successo!"
const error = {
    message: "Utente non trovato!"
};

const addUser = async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const data = { name, surname, email }
    const newUser = new User(data);
    try {
        await newUser.save();
        return res.success({ statusAdded, message: createdMessage })
    } catch (e) {
        return res.fail({ error })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { __v: 0, updatedAt: 0 });
        return res.success({ data: users })
    } catch (e) {
        return res.fail({ status: statusError, error })
    }
}

const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const users = await User.findById(id, { __v: 0, updatedAt: 0 });
        return res.success({ data: users });
    } catch (e) {
        return res.fail({ status: statusError, error });
    }

}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const data = { ...req.body }

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.fail({ status: statusError, error });

        await User.findByIdAndUpdate(id, data, { new: true })
        return res.success({ statusAdded, message: updatedMessage })
    } catch (e) {
        return res.fail({ status: statusError, error })
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.fail({ status: statusError, error });

        await User.findByIdAndDelete(id)
        return res.success({ message: deletedMessage })
    } catch (e) {
        return res.fail({ status: statusError, error })
    }
}

module.exports = { addUser, getAllUsers, updateUser, deleteUser, getUser }