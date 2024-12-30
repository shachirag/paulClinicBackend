"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
var backend_1 = require("@aws-amplify/backend");
/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update",
and "delete" any "Todo" records.
=========================================================================*/
var schema = backend_1.a.schema({
    Employee: backend_1.a
        .model({
        title: backend_1.a.string(),
        firstName: backend_1.a.string(),
        lastName: backend_1.a.string(),
        email: backend_1.a.string(),
        image: backend_1.a.string(),
        gender: backend_1.a.string(),
        role: backend_1.a.string(),
        dateOfBirth: backend_1.a.string(),
        createdAt: backend_1.a.string(),
        updatedAt: backend_1.a.string(),
        methodType: backend_1.a.string().required(),
    })
        .authorization(function (allow) { return [
        allow.guest(),
    ]; }),
});
exports.data = (0, backend_1.defineData)({
    schema: schema,
    authorizationModes: {
        defaultAuthorizationMode: 'iam',
    },
});
/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/
/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/
/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/
/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()
// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
