"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
class FreePortNotFoundError extends Error {
    constructor(port) {
        super(`No any free port greater than ${port}`);
    }
}
exports.FreePortNotFoundError = FreePortNotFoundError;
const isPortInUse = (port, address = '127.0.0.1') => __awaiter(this, void 0, void 0, function* () {
    return new Promise(resolve => {
        const server = net_1.createServer()
            .listen(port, address)
            .once('error', () => {
            server.removeAllListeners();
            resolve(true);
        })
            .once('listening', () => server
            .removeAllListeners()
            .close(() => resolve(false)));
    });
});
exports.default = (start) => __awaiter(this, void 0, void 0, function* () {
    let port = start;
    while ((yield isPortInUse(port++)))
        if (port > 65535)
            throw new FreePortNotFoundError(start);
    return port;
});
//# sourceMappingURL=freePort.js.map