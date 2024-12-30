"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeHandler = exports.auth = void 0;
var backend_1 = require("@aws-amplify/backend");
var backend_2 = require("@aws-amplify/backend");
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
exports.auth = (0, backend_1.defineAuth)({
    loginWith: {
        email: true,
    },
});
exports.employeeHandler = (0, backend_2.defineFunction)({
    name: 'employee-handler',
    entry: 'addEmployeeInCognito.ts',
});
