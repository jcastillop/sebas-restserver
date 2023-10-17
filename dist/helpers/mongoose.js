"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseId = void 0;
var mongoose = require('mongoose');
const mongooseId = (id = '') => {
    return new mongoose.Types.ObjectId(id);
};
exports.mongooseId = mongooseId;
//# sourceMappingURL=mongoose.js.map