import Series from "../models/seriesModel.js";
import fs from "fs"

export const createSeries = async (req, res) => {
    try {
        const { tmdb, name, story, cast, director, release, image, distributor, rated, genre, imdb, year, category, sande } = req.body;
        const seasonsandepisodes = JSON.parse(sande);
        // console.log(seasonsandepisodes);
        const series = new Series({ tmdb, name, story, cast, director, image, release, distributor, rated, genre, imdb, year, category, seasonsandepisodes });

        // if (req.file) {
        //     series.image.data = fs.readFileSync(req.file.path);
        //     series.image.contentType = req.file.type;
        // }
        await series.save();

        res.status(200).send({
            success: true,
            message: 'Series Created Successfully',
            series
        });
    } catch (error) {
        console.log(error);
        return res.status().send({
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