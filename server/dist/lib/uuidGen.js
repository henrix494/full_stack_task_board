"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genUUid = void 0;
const crypto_1 = require("crypto");
const genUUid = () => {
    const uuid = (0, crypto_1.randomUUID)();
    return uuid;
};
exports.genUUid = genUUid;
