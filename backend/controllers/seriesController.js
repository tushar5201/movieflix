import Series from "../models/seriesModel.js";

export const createSeries = async (req, res) => {
    try {
        const { tmdb, name, image, story, cast, director, release, distributor, rated, genre, imdb, year, category, sande1 } = req.body;
        const seasonsandepisodes = JSON.parse(sande1);
        // console.log(seasonsandepisodes);
        const series = await new Series({ tmdb, name, story, cast, director, image, release, distributor, rated, genre, imdb, year, category, seasonsandepisodes }).save();

        res.status(200).send({
            success: true,
            message: 'Series Created Successfully',
            series
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: 'Err in creating series'
        })
    }
}

export const updateSeries = async (req, res) => {
    try {
        let { id, tmdb, name, image, story, cast, director, release, distributor, rated, genre, imdb, year, category, seasonsandepisodes } = req.body;
        const sande = [{ sno: null, eno: null }];
        const exist = await Series.findById(id);
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
            if (genre === '') {
                genre = exist.genre
            }
            if (imdb === '') {
                imdb = exist.imdb
            }
            if (year === null) {
                year = exist.year
            }
            if (category === '') {
                category = exist.category
            }
            if (tmdb === '') {
                tmdb = exist.tmdb
            }
            if (seasonsandepisodes === sande) {
                seasonsandepisodes = exist.seasonsandepisodes
            }
            const series = await Series.findByIdAndUpdate(id, { tmdb, name, image, story, cast, director, release, distributor, rated, genre, imdb, year, category, $push: { seasonsandepisodes } });

            res.status(201).send({
                success: true,
                message: 'series updated.',
                series
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

// export const seriesImageController = async (req, res) => {
//     try {
//         const series = await Series.findById(req.params.imgid).select('image');
//         if(series.image) {
//             res.set('content-type', series.image.name);
//             return res.status(200).send(series.image.data);
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             message: "Couldn't get image",
//             success: false
//         })
//     }
// }

export const deleteSeries = async (req, res) => {
    try {
        const id = req.body;
        const series = await Series.findById(id);
        if (series) {
            const del = await Series.findByIdAndDelete(id);
            if (del) {
                res.status(200).send("Deleted Successfully");
            } else {
                res.status(401).send("Couldn't be deleted");
            }
        } else {
            res.status(404).send("Series not found");
        }
    } catch (error) {

    }
}