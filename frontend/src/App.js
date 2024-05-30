import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexScreen from "./screens/IndexScreen";
import MovieScreen from "./screens/MovieScreen";
import SignInScreen from "./screens/SignInScreen";
import SignupScreen from "./screens/SignupScreen";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminView from "./screens/admin/AdminView";
import CarouselController, { CreateCarousel, UpdateCarousel } from "./screens/admin/CarouselController";
import MovieController, { CreateMovie, UpdateMovie } from "./screens/admin/MovieController";
import CategoryController, { CreateCategory } from "./screens/admin/CategoryController";
import FilterScreen from "./screens/FilterScreen";
import SeriesController, { CreateSeries, UpdateSeries } from "./screens/admin/SeriesController";
import { SeriesScreen } from "./screens/SeriesScreen";
import Pricing from "./components/Pricing";
import { VideoScreen } from "./screens/VideoScreen";

function App() {
  return (
    <BrowserRouter>
      <div>
        <main>
          <ToastContainer position="bottom-center" limit={1} />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/index" element={<IndexScreen />} />
            <Route path="/movie/:id" element={<MovieScreen />}></Route>
            <Route path="/series/:id" element={<SeriesScreen />}></Route>
            <Route path="/signin" element={<SignInScreen />}></Route>
            <Route path="/signup" element={<SignupScreen />}></Route>

            <Route path="/admin/profile" element={<AdminView />}></Route>

            <Route path='/dashboard/carousel' element={<CarouselController />}></Route>
            <Route path="/dashboard/create_carousel" element={<CreateCarousel />}></Route>
            <Route path='/dashboard/update_carousel/:id' element={<UpdateCarousel />}></Route>

            <Route path='/dashboard/movies' element={<MovieController />}></Route>
            <Route path='/dashboard/create_movie' element={<CreateMovie />}></Route>
            <Route path='/dashboard/update_movie/:id' element={<UpdateMovie />}></Route>
            <Route path='/videoplayer/:cat/:tmdb' element={<VideoScreen />}></Route>

            <Route path='/videoplayer/:cat/:tmdb-:sno-:eno' element={<VideoScreen />}></Route>

            <Route path="/dashboard/series" element={<SeriesController />}></Route>
            <Route path='/dashboard/create_series' element={<CreateSeries />}></Route>
            <Route path='/dashboard/update_series/:id' element={<UpdateSeries />}></Route>

            <Route path='/dashboard/categories' element={<CategoryController />}></Route>
            <Route path='/dashboard/create_category' element={<CreateCategory />}></Route>

            <Route path='/pricing' element={<Pricing />}></Route>

            <Route path='/search' element={<FilterScreen />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
