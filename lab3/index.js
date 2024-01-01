import dotenv from 'dotenv';

import getToken from './getUserTokens.js';
import refreshToken from './refreshToken.js';
// import changeUserPassword from './changePassword.js';

dotenv.config();

const USERNAME = 'sanix.to@gmail.com';
const PASSWORD = 'newPass$$123'; //'123olek_sandr123';
// const USER_ID = 'auth0|abc';

try {
  console.log('------------------------------------------------------\n');
  console.log('TOKEN:\n');
  const tokens = await getToken(USERNAME, PASSWORD);
  console.log(tokens);
  console.log('\n')

  console.log('------------------------------------------------------\n');
  console.log('Refreshed Token:\n');
  const refToken = JSON.parse(tokens).refresh_token;
  const refreshedTokenObj = await refreshToken(refToken);
  console.log(refreshedTokenObj);
  console.log('\n')

  // console.log('------------------------------------------------------\n');
  // console.log('Updated User:\n');
  // const newPassword = 'newPass$$123';
  // const updatedUser = await changeUserPassword(process.env.APP_TOKEN, USER_ID, newPassword);
  // console.log(updatedUser);
  // console.log('\n')
} catch (error) {
  console.error(error);
}