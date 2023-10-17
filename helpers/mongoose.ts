var mongoose = require('mongoose');

export const mongooseId = (id = '') => {
    return new mongoose.Types.ObjectId(id)
}