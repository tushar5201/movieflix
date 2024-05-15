import Carousel from "../models/carouselModel.js";
import fs from 'fs'

export const createCarousel = async (req, res) => {
    try {
        const { name, story, link } = req.body;
        const carousel = new Carousel({ name, story, link });
        if (req.file) {
            carousel.image.data = fs.readFileSync(req.file.path);
            carousel.image.contentType = req.file.type
        }
        await carousel.save();
        res.status(201).send({
            success: true,
            message: 'Carousel added successfully.'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'err in creating',
            error
        })
    }
}

export const getCarouselImage = async (req, res) => {
    try {
        const carousel = await Carousel.findById(req.params.cid).select('image');
        if (carousel.image) {
            res.set('content-type', carousel.image.name)
            return res.status(200).send(carousel.image.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'err'
        })
    }
}

export const deleteCarousel = async (req, res) => {
    try {
        const { id } = req.body;
        const del = await Carousel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'carousel deleted successfully.'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: true,
            message: 'err in deleting carousel.',
            err
        })
    }
}

export const updateCarousel = async (req, res) => {
    let { id, name, story, link } = req.body;
    const image = req.file;
    const exist = await Carousel.findById(id);
    if(exist) {
        if(name === '') {
            name = exist.name
        } 
        if(story === '') {
            story = exist.story
        }
        if(link === '') {
            link = exist.link
        }

        const carousel =  await Carousel.findByIdAndUpdate(id, {name, story, link})
        if(image) {
            carousel.image.data = fs.readFileSync(image.path);
            carousel.image.contentType = image.type;
        } else {
            carousel.image.data = exist.image.data;
            carousel.image.contentType = exist.image.contentType;
        }
        await carousel.save();

        res.status(201).send({
            success: true,
            message: 'carousel updated.',
            carousel
        });
    } else {
        res.status(401).send({
            success: true,
            message: 'carousel not found.',
            itSkills
        });
    }
}