import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        story: String,
        cast: String,
        release: String,
        director: String,
        distributor: String,
        rated: String,
        duration: String,
        genre: String,
        imdb: String,
        year: Number,
        category: String,
        tmdb: String
    }
);

const Movies = mongoose.model('Movies', movieSchema);
export default Movies;