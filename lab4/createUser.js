import request from 'request';

const createUser = (appToken, email, password) => {
  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${appToken}`,
    },
    body: JSON.stringify({
      "email": email,
      "user_metadata": {},
      "blocked": false,
      "email_verified": false,
      "app_metadata": {},
      "connection": "Username-Password-Authentication",
      "password": password,
      "verify_email": false
    })
  }

  return new Promise((resolve, reject) => {
    request(options, (error, _, body) => {
      if (error) reject(error);
      if (JSON.parse(body).error) reject(new Error(JSON.parse(body).message));
      resolve (body);
    })
  })
} 

export default createUser;