const express = require('express');
const bodyParser = require('body-parser'); // for the username and pass
const app = express();
const port = 3000;
let users = [];
let photos = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/public', express.static('public'));


app.get('/user/login', (req, res) => { //why it's only working when its hight orderd??
    res.render('login.ejs')
    // res.render('login.ejs', { name: 'kyle' });
});

app.post('/user/login', (req, res, err) => {//why it's only working when its hight orderd??
    let email = req.body.email;
    let password = req.body.password;
    let hasUser = false;
    let name;
    users.find(user => {
        if (user.email === email && user.password === password) {
            name = user.name;
            return hasUser = true;
        }
    });
    if (hasUser) {
        res.render('dashboard.ejs');
        // console.log(name);
        console.log('work');
        res.status(200).send();
    } else {
        res.render('err.ejs', { err: "Email and / or password is inncorrect" });
        res.status(403).send();
        return;
    }
});


app.get('/user', (req, res) => {
    res.render('register.ejs')
    // res.json(users);  //get all users
});


app.post('/user', (req, res) => { //create user
    users.push({
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    console.log(users);
    res.redirect('user/login');
    res.status(201).send();
});


app.get('/user/:id', (req, res) => { //get specific user
    const requestedUser = users.find(user => {
        return user.id === parseInt(req.params.id);
    });
    if (!requestedUser) {
        res.status(404).send();
        return;
    }
    res.json(requestedUser);
});


app.post('/user/:id', (req, res) => { //edit specific user
    const requestedUser = users.find(user => {
        return user.id === parseInt(req.params.id);
    });
    if (!requestedUser) {
        res.status(404).send();
        return;
    }
    const index = users.indexOf(requestedUser);
    users[index].username = req.body.username;
    users[index].password = req.body.password;
    res.status(200).send()
});


app.delete('/user/:id', (req, res) => {
    const requestedUser = users.find(user => {
        return user.id === parseInt(req.params.id);
    });
    if (!requestedUser) {
        res.status(404).send();
        return;
    }
    const index = users.indexOf(requestedUser);
    users.splice(index, 1);
    res.status(204).send();
});


app.put('/photo', (req, res) => {
    photos.push({
        id: photos.length + 1,
        title: req.body.title,
        filename: req.body.filename
    });
    res.status(201).send();
});


app.get('/photo', (req, res) => {
    res.json(photos);
});


app.get('/photo/:id', (req, res) => {
    const requestedPhoto = photos.find(photo => {
        return photo.id === parseInt(req.params.id);
    });
    if (!requestedPhoto) {
        res.status(404).send()
    }
    res.json(requestedPhoto);
});


app.post('/photo/:id', (req, res) => {
    const requestedPhoto = photos.find(photo => {
        return photo.id === parseInt(req.params.id);
    });
    if (!requestedPhoto) {
        res.status(404).send()
    }
    const index = photos.indexOf(requestedPhoto);
    photos[index].title = req.body.title;
    photos[index].filename = req.body.filename;
    res.status(200).send()
});


app.delete('/photo/:id', (req, res) => {
    const requestedPhoto = photos.find(photo => {
        return photo.id === parseInt(req.params.id);
    });
    if (!requestedPhoto) {
        res.status(404).send()
    }
    const index = photos.indexOf(requestedPhoto);
    photos.splice(index, 1);
    res.status(202).send();
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));