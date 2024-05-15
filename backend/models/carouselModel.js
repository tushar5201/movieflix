import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema (
    {
        name: String,
        image: {
            data: Buffer,
            contentType: String
        },
        story: String,
        link: String
    }
);

const Carousel = mongoose.model('Carousel', carouselSchema);
export default Carousel;