const express = require('express');;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SESSION_KEY = 'Authorization';
const PRIVATE_KEY = 'jwtexample';

const sign = (data) => {
    return jwt.sign(data, PRIVATE_KEY, {
        expiresIn: '5m'
    });
};
 
const verifyToken = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, PRIVATE_KEY);
    } catch(error) {
        console.error("Error: ", error.message);
        return null;
    }
}

 
const getUsername = (token) => {
    try {
        const data = verifyToken(token);
        if (!data) return null;
        const user = users.find(user => user.login == data.login);
        if (!user) return null;
        return user.username;
    } catch(error) {
        console.error("Error: ", error.message);
        return null;
    }
}

app.use((req, res, next) => {
    let sessionId = req.get(SESSION_KEY);
    req.username = getUsername(sessionId);
    req.sessionId = sessionId;
    next();
 });
 

 app.get('/', (req, res) => {
    console.log(req.username);
    if (req.username) {
        return res.json({
            username: req.username,
            logout: 'http://localhost:3000/logout'
        })
    }
    res.sendFile(path.join(__dirname+'/index.html'));
 }); 

app.get('/logout', (req, res) => {
    res.redirect('/');
});

const users = [
    {
        login: 'Login',
        password: 'Password',
        username: 'Username',
    },
    {
        login: 'Login1',
        password: 'Password1',
        username: 'Username1',
    },
    {
        login: 'sanix',
        password: '12345',
        username: 'sanix',
    }
]

app.post('/api/login', (req, res) => {
    const { login, password } = req.body;
 
    const user = users.find((user) => {
        if (user.login == login && user.password == password) {
            return true;
        }
        return false
    });
 
    if (user) {
        const jwt = sign({ login: user.login });
        return res.json({ token: jwt });
    }
 
    res.status(401).send();
}); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
