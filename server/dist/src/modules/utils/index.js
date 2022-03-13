"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = exports.makeSalt = exports.resBody = void 0;
const responseCode_1 = require("../../common/responseCode");
const crypto = require("crypto");
function resBody(status, msg, data) {
    return {
        code: responseCode_1.ResponseCode[status],
        msg,
        data
    };
}
exports.resBody = resBody;
function makeSalt() {
    return crypto.randomBytes(3).toString('base64');
}
exports.makeSalt = makeSalt;
function encryptPassword(password, salt) {
    if (!password || !salt) {
        return '';
    }
    const tempSalt = Buffer.from(salt, 'base64');
    return (crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64'));
}
exports.encryptPassword = encryptPassword;
//# sourceMappingURL=index.js.map