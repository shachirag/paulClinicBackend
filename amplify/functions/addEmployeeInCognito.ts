import type { Handler } from 'aws-lambda';
// import {
//   CognitoIdentityProviderClient,
//   AdminCreateUserCommand,
//   AdminAddUserToGroupCommand,
//   AdminUpdateUserAttributesCommand,
//   AttributeType,
//   AdminGetUserCommand,
//   AdminGetUserCommandInput,
//   AdminGetUserCommandOutput,
//   AdminDeleteUserCommand,
//   AdminDeleteUserCommandInput,
//   ListUsersInGroupCommand,
//   ListUsersInGroupCommandInput,
//   ListUsersInGroupCommandOutput
// } from '@aws-sdk/client-cognito-identity-provider';

// interface EmployeeInput {
//   title?: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   image?: string;
//   gender?: string;
//   role?: string;
//   dateOfBirth?: string;
//   createdAt?: string;
//   updatedAt?: string;
//   methodType: string;
// }

// export const handler: Handler = async (event: { arguments: EmployeeInput }) => {
//   const employee = event.arguments;

//   if ((employee.methodType === 'detail' || employee.methodType === 'delete') && (!employee.email || employee.email === '')) {
//     throw new Error("Email is required for 'detail' and 'delete' operations");
//   }

//   switch (employee.methodType) {
//     case 'add':
//       return await addEmployee(employee);
//     case 'update':
//       return await updateEmployee(employee);
//     case 'list':
//       return await listEmployees();
//     case 'detail':
//       return await getEmployeeDetails(employee.email!);
//     case 'delete':
//       return await deleteEmployee(employee.email!);
//     default:
//       throw new Error("Invalid methodType: must be 'add', 'update', 'list', 'detail', or 'delete'");
//   }
// };

// const addEmployee = async (employee: EmployeeInput) => {
//   if (!employee.email || employee.email === '') {
//     throw new Error("Email cannot be empty");
//   }
//   if (!employee.firstName || employee.firstName === '') {
//     throw new Error("First name cannot be empty");
//   }
//   if (!employee.lastName || employee.lastName === '') {
//     throw new Error("Last name cannot be empty");
//   }

//   const region = process.env.AWS_REGION || 'ap-south-1';
//   const cognitoClient = new CognitoIdentityProviderClient({ region });

//   const userPoolID = process.env.COGNITO_USER_POOL_ID;
//   if (!userPoolID) {
//     throw new Error("Missing Cognito user pool ID");
//   }

//   const userAttributes = [
//     { Name: 'email', Value: employee.email },
//     { Name: 'email_verified', Value: 'true' },
//   ];

//   if (employee.firstName) userAttributes.push({ Name: 'custom:firstName', Value: employee.firstName });
//   if (employee.lastName) userAttributes.push({ Name: 'custom:lastName', Value: employee.lastName });
//   if (employee.gender) userAttributes.push({ Name: 'custom:gender', Value: employee.gender });
//   if (employee.image) userAttributes.push({ Name: 'custom:image', Value: employee.image });
//   if (employee.title) userAttributes.push({ Name: 'custom:title', Value: employee.title });
//   if (employee.dateOfBirth) userAttributes.push({ Name: 'custom:dateOfBirth', Value: employee.dateOfBirth });
//   if (employee.role) userAttributes.push({ Name: 'custom:role', Value: employee.role });
//   if (employee.createdAt) userAttributes.push({ Name: 'custom:createdAt', Value: employee.createdAt });
//   if (employee.updatedAt) userAttributes.push({ Name: 'custom:updatedAt', Value: employee.updatedAt });

//   const createUserCommand = new AdminCreateUserCommand({
//     UserPoolId: userPoolID,
//     Username: employee.email,
//     UserAttributes: userAttributes,
//   });

//   try {
//     await cognitoClient.send(createUserCommand);
//     console.log("Employee added to Cognito");

//     const addToGroupCommand = new AdminAddUserToGroupCommand({
//       UserPoolId: userPoolID,
//       Username: employee.email,
//       GroupName: 'employee',
//     });

//     await cognitoClient.send(addToGroupCommand);
//     console.log("Employee added to 'employee' group");
//   } catch (error) {
//     console.error("Error adding employee to Cognito:", error);
//     throw error;
//   }
// };

// export const updateEmployee = async (event: EmployeeInput): Promise<void> => {
//   if (!event.email || event.email === '') {
//     throw new Error('Email cannot be empty');
//   }

//   const region = process.env.AWS_REGION || 'ap-south-1';
//   const cognitoClient = new CognitoIdentityProviderClient({ region });

//   const userPoolID = process.env.COGNITO_USER_POOL_ID;
//   if (!userPoolID) {
//     throw new Error('Missing Cognito user pool ID');
//   }

//   const userAttributes: AttributeType[] = [];

//   if (event.firstName) {
//     userAttributes.push({ Name: 'custom:firstName', Value: event.firstName });
//   }
//   if (event.lastName) {
//     userAttributes.push({ Name: 'custom:lastName', Value: event.lastName });
//   }
//   if (event.gender) {
//     userAttributes.push({ Name: 'custom:gender', Value: event.gender });
//   }
//   if (event.image) {
//     userAttributes.push({ Name: 'custom:image', Value: event.image });
//   }
//   if (event.title) {
//     userAttributes.push({ Name: 'custom:title', Value: event.title });
//   }
//   if (event.dateOfBirth) {
//     userAttributes.push({ Name: 'custom:dateOfBirth', Value: event.dateOfBirth });
//   }
//   if (event.role) {
//     userAttributes.push({ Name: 'custom:role', Value: event.role });
//   }
//   if (event.updatedAt) {
//     userAttributes.push({ Name: 'custom:updatedAt', Value: event.updatedAt });
//   }

//   try {
//     const command = new AdminUpdateUserAttributesCommand({
//       UserPoolId: userPoolID,
//       Username: event.email,
//       UserAttributes: userAttributes,
//     });

//     await cognitoClient.send(command);
//     console.log('Employee updated successfully in Cognito');
//   } catch (error) {
//     console.error('Failed to update employee in Cognito:', error);
//     throw error;
//   }
// };

// export const getEmployeeDetails = async (id: string): Promise<AdminGetUserCommandOutput | null> => {
//   const region = process.env.AWS_REGION || 'ap-south-1';
//   const cognitoClient = new CognitoIdentityProviderClient({ region });

//   const userPoolID = process.env.COGNITO_USER_POOL_ID;
//   if (!userPoolID) {
//     throw new Error('Missing Cognito user pool ID');
//   }

//   const params: AdminGetUserCommandInput = {
//     UserPoolId: userPoolID,
//     Username: id
//   };

//   try {
//     const command = new AdminGetUserCommand(params);
//     const data = await cognitoClient.send(command);

//     if (data) {
//       console.log(`Username: ${data.Username}`);
//       data.UserAttributes?.forEach((attr) => {
//         console.log(`Attribute Name: ${attr.Name}, Value: ${attr.Value}`);
//       });
//     }

//     return data || null;
//   } catch (error) {
//     console.error(`Failed to get employee details:`, error);
//     throw error;
//   }
// };

// export const deleteEmployee = async (email: string): Promise<void> => {
//   if (!email || email === '') {
//     throw new Error('Email is required');
//   }

//   const region = process.env.AWS_REGION || 'ap-south-1';
//   const cognitoClient = new CognitoIdentityProviderClient({ region });

//   const userPoolID = process.env.COGNITO_USER_POOL_ID;
//   if (!userPoolID) {
//     throw new Error('Missing Cognito user pool ID');
//   }

//   const params: AdminDeleteUserCommandInput = {
//     UserPoolId: userPoolID,
//     Username: email
//   };

//   try {
//     const command = new AdminDeleteUserCommand(params);
//     await cognitoClient.send(command);
//     console.log('Employee deleted successfully from Cognito');
//   } catch (error) {
//     console.error('Failed to delete employee:', error);
//     throw error;
//   }
// };

// export const listEmployees = async (): Promise<any[]> => {
//   const region = process.env.AWS_REGION || 'ap-south-1';
//   const cognitoClient = new CognitoIdentityProviderClient({ region });

//   const userPoolID = process.env.COGNITO_USER_POOL_ID;
//   if (!userPoolID) {
//     throw new Error('Missing Cognito user pool ID');
//   }

//   const groupName = 'employee';
//   let allEmployees: any[] = [];

//   const params: ListUsersInGroupCommandInput = {
//     UserPoolId: userPoolID,
//     GroupName: groupName,
//   };

//   try {
//     let nextToken: string | undefined = undefined;
//     do {
//       const command: ListUsersInGroupCommand = new ListUsersInGroupCommand({
//         ...params,
//         NextToken: nextToken
//       });

//       const { Users, NextToken }: ListUsersInGroupCommandOutput = await cognitoClient.send(command);

//       if (Users) {
//         allEmployees = [...allEmployees, ...Users];
//       }

//       nextToken = NextToken; 
//     } while (nextToken); 

//     if (allEmployees.length === 0) {
//       console.log('No employees found in the group');
//     } else {
//       console.log('List of employees:');
//       allEmployees.forEach((employee) => {
//         console.log(`Username: ${employee.Username}`);
//         if (employee.Attributes) {
//           employee.Attributes.forEach((attr: any) => {
//             console.log(`Attribute Name: ${attr.Name}, Value: ${attr.Value}`);
//           });
//         }
//         console.log('-----');
//       });
//     }

//     return allEmployees;
//   } catch (error) {
//     console.error(`Failed to list employees in group '${groupName}':`, error);
//     throw error;
//   }
// };
