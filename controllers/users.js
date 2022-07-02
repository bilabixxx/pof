const mongoose = require('mongoose');
const User = require('../models/users');

const addUser = (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;

    const user = new User({ name, surname, email });

    user.save()
        .then(() => res.status(201).json('Utente aggiunto!'))
        .catch(error => res.status(404).json('Errore: ' + error))
}


const getAllUsers = (req, res) => {
    User.find({}, {__v:0, updatedAt:0})
        .then(user => res.status(200).json(user))
        .catch(err => res.status(404).json(err))
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const data = { ...req.body }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("Utente non trovato")

    User.findByIdAndUpdate(id, data, { new: true })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(404).json("Errore: " + err))
}

const deleteUser = (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("Utente da elimare non trovato!")

    User.findByIdAndDelete(id)
        .then(() => res.status(200).json("Utente eliminato con successo"))
        .catch(err => res.status(404).json("Errore: " + err));
}

const getUser = (req, res) => {
    const { id } = req.params;
    User.findById(id, {__v:0, updatedAt:0})
        .then(user => res.status(200).json(user))
        .catch(err => res.status(404).json("Errore: " + err))

}

module.exports = { addUser, getAllUsers, updateUser, deleteUser, getUser }