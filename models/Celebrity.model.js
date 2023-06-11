const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const celebritySchema = new Schema({
    // celebrity:{
    //     type: Schema.Types.ObjectId,
    //     ref: "celebrity"},
    name:{
        type: String
    },
    occupation:{
        type: String
    },
    catchPhrase: {
        type: String
    }
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports= Celebrity;