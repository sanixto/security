import request from 'request';

const createRole = (token) => {
  const options = {
  method: 'POST',
  url: `https://${process.env.AUTH0_DOMAIN}/api/v2/roles`,
  headers: {
    'Authorization': `Bearer ${token}`,
    'content-type': 'application/x-www-form-urlencoded'},
  form: {
    name: 'My Role',
    description: 'My role test'
  }
}

  return new Promise((resolve, reject) => {
    request(options, (error, _, body) => {
      if (error) reject(error);
      resolve (body);
    })
  })
} 

export default createRole;