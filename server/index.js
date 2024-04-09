const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const fs = require('fs');
require('dotenv').config();
app.use(express.json());
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const { resolve } = require('path');
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}))

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fgdfgKJSFJGF';


app.use(cookieParser());
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
app.get('/test', (req, res) => {
    res.json('test');
})


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.status(200).json(userDoc);

    } catch (e) {
        res.status(422).send(e);
    }

}
);



app.post('/login', async (req, res) => {
    console.log("here login side!!");
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });
        console.log(userDoc);
        if (userDoc) {
            const passOk = await bcrypt.compare(password, userDoc.password);
            console.log(passOk);
            if (passOk) {
                jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json({ name: userDoc.name, email, password });

                });
            }
            else {
                const err = "password does not exist!";
                throw err;
            }
        }
        else {
            throw new Error("username does not Exist");
        }
    } catch (e) {

        res.status(500).send(e);

    }
})


app.get('/profile', async (req, res) => {
    try {

        const { token } = req.cookies;

        if (token) {
            // console.log(token);
            jwt.verify(token, jwtSecret, {}, async (err, user) => {
                if (err) throw err;
                const { name, email } = await User.findById({ _id: user.id });
                res.json({ name, email });

            })
        }
        else {
            res.status(500).send("Login first!");
        }


    } catch (e) {
        res.status(500).send(e);
    }
})


app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})




app.post('/upload-by-link', async (req, res) => {
    console.log(req.body);
    console.log(__dirname);
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    })

    res.json(newName);

})

const photomiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photomiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));

    }
    res.json(uploadedFiles);

})


app.post('/places', async (req, res) => {
    const { token } = req.cookies;
    const { title, description, address, extrainfo, perks, maxguest, checkin, checkout, photos } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const placedoc = await Place.create({
            owner: user.id,
            title,
            description,
            address,
            extrainfo,
            perks,
            maxguest,
            checkin,
            checkout,
            photos
        });


        res.json(placedoc);

    })
})



app.get('/user-places', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;

        const placedoc = await Place.find({ owner: user.id });

        res.json(placedoc);


    })

})


app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    const placedoc = await Place.findById(id);
    res.json(placedoc);

})


app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const { id,
        title,
        description,
        address,
        extrainfo,
        perks,
        maxguest,
        checkin,
        checkout,
        photos } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const placedoc = await Place.findById(id);

        if (user.id === placedoc.owner.toString()) {
            placedoc.set({
                id,
                title,
                description,
                address,
                extrainfo,
                perks,
                maxguest,
                checkin,
                checkout,
                photos
            });
            await placedoc.save();

            res.json(placedoc);
        }
    })
})



app.get('/places', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        res.json(await Place.find({ owner: user.id }));
    })
})

function getUserDetails(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, user) => {
            if (err) reject(err);
            resolve(user);
        }
        )
    }
    )

}

app.post('/booking', async (req, res) => {
    const { name, mobile, totalNights, checkin, checkout, prices, maxguest, place } = req.body;
    const user = await getUserDetails(req);
    // console.log(user.id);
    const response = await Booking.create({
        place,
        user: user.id,
        name,
        mobile,
        totalNights,
        checkin,
        checkout,
        prices,
        maxguest
    })

    res.json(response);
})




app.get('/bookings', async (req, res) => {
    const user = await getUserDetails(req);
    // console.log(user);
    const response = await Booking.find({ user: user.id }).populate('place');

    res.json(response);

})

app.listen(4000, () => {
    console.log("running finee");
});