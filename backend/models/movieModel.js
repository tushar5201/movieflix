import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        tmdb: String,
        name: String,
        image: String,
        story: String,
        cast: String,
        director: String,
        release: String,
        distributor: String,
        rated: String,
        duration: String,
        genre: String,
        imdb: String,
        year: Number,
        category: String
    }
);

const Movies = mongoose.model('Movies', movieSchema);
export default Movies;