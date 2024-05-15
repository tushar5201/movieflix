import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema(
    {
        tmdb: String,
        name: String,
        image: { data: Buffer, contentType: String },
        story: String,
        cast: String,
        director: String,
        release: String,
        distributor: String,
        rated: String,
        genre: String,
        imdb: String,
        year: Number,
        category: String,
        seasonsandepisodes: [
            {
                sno: Number,
                eno: Number
            }
        ],
    }
);

const Series = mongoose.model('Series', seriesSchema);
export default Series;