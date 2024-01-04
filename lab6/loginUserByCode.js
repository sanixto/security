import request from 'request';

const loginUserByCode = (code) => {
  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token/`,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      client_id: `${process.env.CLIENT_ID}`,
      client_secret: `${process.env.CLIENT_SECRET}`,
      redirect_uri: 'http://localhost:3000'
    })
  }

  return new Promise((resolve, reject) => {
    request(options, (error, _, body) => {
      if (error) reject(error);
      if (JSON.parse(body).error) reject(new Error(JSON.parse(body).error_description));
      resolve (body);
    })
  })
}

export default loginUserByCode;