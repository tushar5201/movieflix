import Movies from "../models/movieModel.js";
import fs from 'fs';

export const createMovie = async (req, res) => {
    try {
        const { name, slug, story, cast, release, director, distributor, rated, duration, genre, imdb, year, category, tmdb } = req.body;
        const movie = new Movies({ name, slug, story, cast, release, director, distributor, rated, duration, genre, imdb, year, category, tmdb })

        // if (req.file) {
        //     movie.image.data = fs.readFileSync(req.file.path);
        //     movie.image.contentType = req.file.type;
        // }
        await movie.save();
        res.status(200).send({
            success: true,
            message: 'movie created.',
            movie
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'error'
        })
    }
}

// export const movieImageController = async (req, res) => {
//     try {
//         const movies = await Movies.findById(req.params.imgid).select('image');
//         if (movies.image) {
//             res.set('content-type', movies.image.name)
//             return res.status(200).send(movies.image.data)
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: 'err'
//         })
//     }
// }

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.body;
        const del = await Movies.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'movie deleted successfull.'
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'err in deleting',
            err
        })
    }
}

export const updateMovie = async (req, res) => {
    try {
        let { id, name, slug, story, cast, image, release, director, distributor, rated, duration, genre, imdb, year, category, tmdb } = req.body;
        // const image = req.file;
        const exist = await Movies.findById(id);
        if (exist) {
            if (name === '') {
                name = exist.name
            }
            if (image === '') {
                image = exist.image
            }
            if (story === '') {
                story = exist.story
            }
            if (slug === '') {
                slug = exist.slug
            }
            if (cast === '') {
                cast = exist.cast
            }
            if (release === '') {
                release = exist.release
            }
            if (director === '') {
                director = exist.director
            }
            if (distributor === '') {
                distributor = exist.distributor
            }
            if (rated === '') {
                rated = exist.rated
            }
            if (duration === '') {
                duration = exist.duration
            }
            if (genre === '') {
                genre = exist.genre
            }
            if (imdb === '') {
                imdb = exist.imdb
            }
            if (year === '') {
                year = exist.year
            }
            if (category === '') {
                category = exist.category
            }
            if (tmdb === '') {
                tmdb = exist.tmdb
            }
            const movie = await Movies.findByIdAndUpdate(id, { name, slug, story, cast, image, release, director, distributor, rated, duration, genre, imdb, year, category, tmdb })

            await movie.save();

            res.status(201).send({
                success: true,
                message: 'movie updated.',
                movie
            });
        } else {
            res.status(405).send({
                success: false,
                message: 'err in updating',
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'err in updating',
            err
        })
    }
}