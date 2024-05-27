import Cinema from "./pages/Cinema/container";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Movie from "./pages/Cinema/components/Movie/Movie";
import CreateRoom from "./pages/Cinema/components/CreateRoom/CreateRoom";
import CreateMovie from "./pages/Cinema/components/CreateMovie/CreateMovie";
import Seat from "./pages/Cinema/components/Seat/Seat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cinema />} />
        <Route path="/:id" element={<Movie />} />

        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/create-movie/:id" element={<CreateMovie />} />
        <Route path="/seat/:id" element={<Seat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
