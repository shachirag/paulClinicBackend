import { defineAuth } from '@aws-amplify/backend';
// import { defineFunction } from '@aws-amplify/backend';


/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});

// export const employeeHandler = defineFunction({
//   name: 'employee-handler',
//   entry: 'amplify/backend/addEmployeeInCognito.ts', 
// });