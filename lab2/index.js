import dotenv from 'dotenv';

import getToken from './getToken.js';
import createUser from './createUser.js';
import createRole from './createRole.js';
import applyRoleToUser from './applyRoleToUser.js';

dotenv.config();

try {
  console.log('------------------------------------------------------\n');
  console.log('TOKEN:\n')
  const tokenObj = await getToken();
  console.log(tokenObj);
  console.log('\n')

  console.log('------------------------------------------------------\n');
  console.log('USER:\n')
  const token = JSON.parse(tokenObj).access_token;
  const user = await createUser(token);
  console.log(user);
  console.log('\n')

  console.log('------------------------------------------------------\n');
  console.log('ROLE:\n')
  const role = await createRole(token);
  console.log(role);
  console.log('\n')
  
  const userId = JSON.parse(user).user_id;
  const roleId = JSON.parse(role).id;
  await applyRoleToUser(token, userId, roleId);
} catch (error) {
  console.error(error);
}