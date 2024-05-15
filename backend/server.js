import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Movies from "./models/movieModel.js";
import Users from "./models/userModel.js";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import Otp from "./models/otpModel.js";
import authentication from "./middleware/authentication.js";
import cookieParser from "cookie-parser";
import Carousel from "./models/carouselModel.js";
import { createCarousel, deleteCarousel, getCarouselImage, updateCarousel } from "./controllers/carouselController.js";
import multer from "multer";
import path from 'path'
import { createMovie, deleteMovie, movieImageController, updateMovie } from "./controllers/movieController.js";
import { createCategory, deleteCategory } from "./controllers/caetgoryController.js";
import Category from "./models/categoryModel.js";
import { GridFsStorage } from 'multer-gridfs-storage'
import crypto from 'crypto'
import { createSeries, seriesImageController } from "./controllers/seriesController.js";
import Series from "./models/seriesModel.js";
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cookieParser());

app.use(cors(
    {
        origin: ["https://movieflix.vercel.app"],
        methods: ["POST", "GET", "DELETE", "PUT"],
        ceadentials: "true"
    }
))
dotenv.config();

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(() => {
    console.log('connected to db');
}).catch(err => {
    console.log(err.message);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });



// conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('videos');
// });

// app.get('/api/movies',async (req, res) => {
//     // await Movies.remove({})
//     const movie = await Movies.insertMany(data.movies);
//     res.send({movie})
// });

app.get('/api/movies', async (req, res) => {
    const movies = await Movies.find();
    res.send(movies);
})

app.get('/api/movies/:id', async (req, res) => {
    const movie = await Movies.findOne({ _id: req.params.id });
    if (movie) {
        res.send(movie);
    } else {
        res.status(404).send({ message: 'Your Search Not Found' })
    }
});

app.get('/api/series', async (req, res) => {
    const series = await Series.find();
    res.send(series);
});

app.get('/api/series/:id', async (req, res) => {
    const series = await Series.findOne({_id: req.params.id});
    if(series) {
        res.send(series);
    } else {
        res.status(404).send({message: "Not found"})
    }
})

app.get('/api/carousel', async (req, res) => {
    const carousel = await Carousel.find();
    res.send(carousel);
});

app.get('/api/categories', async (req, res) => {
    const category = await Category.find();
    res.send(category);
})

app.post('/sign_up', async (req, res) => {
    const { name, email, password, isAdmin, otp } = req.body;

    try {
        const userExist = await Users.findOne({ email: email });
        const userVerify = await Otp.findOne({ email });
        if (userExist) {
            return res.status(422).json({ err: 'User exist.' })
        }

        if (userVerify) {
            const verify = bcrypt.compareSync(otp, userVerify.otp);
            if (verify) {
                const user = new Users({ name, email, password, isAdmin });
                user.save().then(() => {
                    res.status(201).send('user created')
                })
            } else {
                res.status(402).send('User cant verified');
            }
        }
    } catch (error) {
        console.log(error);
    }
})

app.post('/sign_in', async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (user) {
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            const isAdmin = user.isAdmin;
            if (isAdmin) {
                const token = await user.generateAuthToken();
                // console.log(token);
                res.cookie("movieflix", token, {
                    expires: new Date(Date.now() + 25892000000),
                    secure: false
                });
            }
            res.status(200).send(user)
        }
    } else {
        res.status(401).send("Invalid credentials.")
    }
})

app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: 'tlakadiya5@gmail.com',
            pass: 'lvxiyorjhvwywcqp'
        }
    });

    let mailOptions = ({
        from: 'tlakadiya5@gmail.com',
        to: email,
        subject: 'OTP verification',
        text: '\n Yor otp for Movieflix \nOTP = ' + otp
    });

    // const hashedOtp = bcrypt.hashSync(otp, 12);
    const newOtp = new Otp({
        email,
        otp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000
    });
    await newOtp.save();

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(500).send('err in sending mail.')
        } else {
            res.status(200).send('Mail sent');
        }
    });
});

app.get('/admin', authentication, (req, res) => {
    res.send(req.rootUser);
})


// Carousel Route

app.post('/admin/create-carousel', upload.single('image'), authentication, createCarousel);
app.get('/admin/get-carousel-image/:cid', getCarouselImage);
app.delete('/admin/delete-carousel', authentication, deleteCarousel);
app.put('/admin/update-carousel', upload.single('image'), authentication, updateCarousel);

// Movie Route
// app.post('/admin/create-movie', uploadGrid.fields([{name: 'image', maxCount:1},{name: 'video', maxCount: 1}]), authentication, createMovie);
app.post('/admin/create-movie', upload.single('image'), authentication, createMovie);
app.delete('/admin/delete-movie', authentication, deleteMovie);
app.get('/admin/get-movie-image/:imgid', movieImageController);
app.put('/admin/update-movie', upload.single('image'), authentication, updateMovie);

// Series Routes
app.post('/admin/create-series', upload.single('image'), authentication, createSeries);
app.get('/admin/get-series-image/:imgid', seriesImageController);

//category Route
app.post('/admin/create-category', authentication, createCategory);
app.delete('/admin/delete-category', authentication, deleteCategory);

app.listen(5000, () => {
    console.log('serve at http://localhost:5000');
})