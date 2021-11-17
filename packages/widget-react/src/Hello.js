"use strict";
exports.__esModule = true;
exports.Hello = void 0;
var React = require("react");
var secret_1 = require("./secret");
function Hello(_a) {
    var name = _a.name;
    return (React.createElement("h1", null,
        "Hello ",
        name.toLowerCase(),
        " ",
        (0, secret_1.secret)()));
}
exports.Hello = Hello;
