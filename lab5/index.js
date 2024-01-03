import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import loginUser from './loginUser.js';
import getAppToken from './getAppToken.js';
import createUser from './createUser.js';
import refreshToken from './refreshToken.js';
import { auth } from 'express-oauth2-jwt-bearer';

const __dirname = path.resolve();
dotenv.config();

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SESSION_KEY = 'Authorization';

const checkJwt = auth({
  audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,               
});

app.get('/', (req, res) => {
  const token = req.get(SESSION_KEY);

  if (token) {
    try {
      const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      const { email, exp } = decodedToken;
      
      const expiryTime = new Date(exp) * 1000 - (Date.now());

      return res.json({
        username: email,
        logout: 'http://localhost:3000/logout',
        expiryTime: Math.round(expiryTime / 1000),
      });
    } catch (e) {
      console.log(e);
      return res.status(401).send('Token is incorrect');
    }
  };
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/logout', (req, res) => {
    res.redirect('/');
});

app.get('/private-user-data', checkJwt, (req, res) => {
  const token = req.get(SESSION_KEY).split(' ')[1];

  if (token) {  
    try {
      return res.json({
        privateText: '{Some private data}',
      });
    } catch (e) {
      console.log(e);
      return res.status(401).send('Token is incorrect');
    }
  }
});

app.post('/api/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    const userTokens = await loginUser(login, password); // newPass$$123
    if (!userTokens) return;

    return res.json({ token: JSON.parse(userTokens)  });
  } catch (e) {
    console.log(e);
  }

  res.status(401).send();
});


app.post('/api/signup', async (req, res) => {
  const { login, password } = req.body;

  try {
    const appTokens = await getAppToken();
    const { access_token } = JSON.parse(appTokens);
    
    const user =  await createUser(access_token, login, password); //hello@gmail.com
    const { email } = JSON.parse(user);

    return res.json({ email });
  } catch (e) {
    console.log(e);
  }

  res.status(401).send();
});

app.post('/api/refreshToken', async (req, res) => {
  const { refresh_token } = req.body;

  try {
    console.log(`User's token was expired`);
    const refreshedToken = await refreshToken(refresh_token);
    console.log(`User's token was refreshed`);
    return res.json({ refreshedToken: JSON.parse(refreshedToken) });
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
