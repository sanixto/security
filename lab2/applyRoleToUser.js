import request from 'request';

const applyRoleToUser = (token, userId, roleId) => {
  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/x-www-form-urlencoded'},
    form: {
      roles: [roleId]
    }
  }

  return new Promise((resolve, reject) => {
    request(options, (error, _, body) => {
      if (error) reject(error);
      resolve (body);
    })
  })
} 

export default applyRoleToUser;