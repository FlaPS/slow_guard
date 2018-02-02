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
const cp = require("child_process");
const path = require("path");
const freePort_1 = require("./freePort");
const workerPath = path.join(__dirname, 'worker');
const slowGuardBuilder = guard => (time, callback) => function (...rest) {
    const id = slowGuardBuilder.id || 1;
    slowGuardBuilder.id = id + 1;
    guard.send({ name: callback.name, time, id });
    console.time('duration');
    const result = callback.apply(this, [rest]);
    console.timeEnd('duration');
    guard.send({ id });
    return result;
};
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    let child;
    if (child)
        return Promise.resolve(child);
    const port = yield freePort_1.default(10000);
    return new Promise(res => {
        child = cp.fork(workerPath, [], {
            execArgv: ['--inspect=' + port],
        });
        child.once('message', () => res(child = slowGuardBuilder(child)));
    });
});
//# sourceMappingURL=slowGuard.js.map