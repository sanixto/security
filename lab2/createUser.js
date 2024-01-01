import request from 'request';

const createUser = (token) => {
  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      "email": "sanix.to@gmail.com",
      "user_metadata": {},
      "blocked": false,
      "email_verified": false,
      "app_metadata": {},
      "given_name": "Oleksandr",
      "family_name": "Hakavyi",
      "name": "Oleksandr Hakavyi",
      "nickname": "Sanix",
      "picture": "https://scontent.fudj1-1.fna.fbcdn.net/v/t39.30808-6/290663832_3023051187915515_8268552731214649956_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=FJU2_C642RcAX8wESpo&_nc_ht=scontent.fudj1-1.fna&oh=00_AfDC-tIvIABPit6evBVx7TbacpLI-XPOpy8vuRCIud-xRg&oe=6593FF70",
      "user_id": "abc",
      "connection": "Username-Password-Authentication",
      "password": "123olek_sandr123",
      "verify_email": false
    })
  }

  return new Promise((resolve, reject) => {
    request(options, (error, _, body) => {
      if (error) reject(error);
      resolve (body);
    })
  })
} 

export default createUser;