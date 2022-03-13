"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
function Logger(req, res, next) {
    const { method, path } = req;
    console.log(`${method} ${path}`);
    next();
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map