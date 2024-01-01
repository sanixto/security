import request from 'request';

const changeUserPassword = (token, userId, newPassword) => {
  const options = {
    method: 'PATCH',
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    json: {
      password: newPassword,
      connection: 'Username-Password-Authentication',
    }
  }

  return new Promise((resolve, reject) => {
    request(options, (error, _, body) => {
      if (error) reject(error);
      resolve (body);
    })
  })
}

export default changeUserPassword;