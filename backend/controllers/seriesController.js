import Series from "../models/seriesModel.js";

export const createSeries = async (req, res) => {
    try {
        const { tmdb, name, story, cast, director, release, image, distributor, rated, genre, imdb, year, category, sande } = req.body;
        const seasonsandepisodes = JSON.parse(sande);
        // console.log(seasonsandepisodes);
        const series = new Series({ tmdb, name, story, cast, director, image, release, distributor, rated, genre, imdb, year, category, seasonsandepisodes }).save();

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