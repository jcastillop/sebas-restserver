import { Schema } from "mongoose";
var mongoose = require('mongoose');

interface Variables {
    empresa: Schema.Types.ObjectId;
    aplicacion: Schema.Types.ObjectId;
}

var variables: Variables = {
    empresa      : new mongoose.Types.ObjectId("64e4bb49eb9067df62d106db"),
    aplicacion   : new mongoose.Types.ObjectId("64e4bb49eb9067df62d106db"),
}

export default variables;