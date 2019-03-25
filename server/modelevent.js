const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let EventSchema = new Schema({
    email: {type: String, require: true},
    title: {type: String, require: true},
    start: {type: String, require: true},
    start_hour: {type: String, require: false},
    end: {type: String, require: false},
    end_hour: {type: String, require: false}
})

let EventModel = mongoose.model('eventos',EventSchema);

module.exports = EventModel;