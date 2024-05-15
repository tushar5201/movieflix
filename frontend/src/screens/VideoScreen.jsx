import { useParams } from "react-router-dom"

export function VideoScreen() {
    const { cat, sno, eno, tmdb } = useParams();
    // const { tmdb } = useParams();

    console.log(sno,eno,tmdb);
    const src = `https://vidsrc.in/embed/tv?tmdb=${tmdb}&season=${sno}&episode=${eno}`
    console.log(src);

    return (
        <div className="vid">
            {/* <h1>{cat}</h1> */}
            {/* Video Screen {tmdb} */}
            {cat === "movie" ? (
                <iframe src={`https://vidsrc.in/embed/movie?tmdb=${tmdb}`} title="a" allowFullScreen height="720px" width="100%" />
            )
                : (
                    <iframe src={`https://vidsrc.in/embed/tv?tmdb=${tmdb}`} referrerpolicy="origin" title="a" allowFullScreen height="720px" width="100%" />
                )
            }
            {/* <iframe src="https://vidsrc.in/embed/movie?tmdb=814215" style="width: 100%; height: 100%;" frameborder="0" referrerpolicy="origin" allowfullscreen></iframe> */}
            {/* <iframe src="https://vidsrc.in/embed/tv?tmdb=66732&season=1&episode=5" style="width: 100%; height: 100%;" frameborder="0" referrerpolicy="origin" allowfullscreen></iframe> */}
        </div>
    )
}