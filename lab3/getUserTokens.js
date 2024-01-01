import request from 'request';

const getUserTokens = (username, password) => {
  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    form: {
      grant_type: 'password',
      username: username,
      password: password,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      scope: 'openid offline_access',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }
  }

  return new Promise((resolve, reject) => {
    request(options, (error, _, body) => {
      if (error) reject(error);
      resolve (body);
    })
  })
}

export default getUserTokens;