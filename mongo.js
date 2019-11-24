var mongoose = require('mongoose');
var GetirSchema = require('./schema');
var isConnected = false;

function OpenDB() {
    return new Promise(function (resolve, reject) {
        mongoose.connect('mongodb+srv://Test:Test@cluster0-s7tn6.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (!err) {
                isConnected = true
                return resolve("Connected");
            } else {
                isConnected = false;
                return reject("Not Connected!");
            }

        });
    });
}

function SelectDB(query) {
    return new Promise(function (resolve, reject) {
        if (isConnected) {
            GetirSchema.find(query, (error, data) => {
                if (error)
                    reject(error);
                else
                    resolve(data);
            })
        } else {
            reject("Not Connected!");
        }
    });
}

module.exports = {
    OpenDB,
    SelectDB,
}
