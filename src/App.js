import "./styles/App.css";
import "./styles/art.css";
import "./styles/book.css";
import "./styles/code.css";
import "./styles/Introduction.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import NavSite from "./components/NavSite";
import Introduction from "./components/Introduction";
import Code from "./components/Code";
import CodeSingle from "./components/CodeSingle";
import Books from "./components/Books";
import BookSingle from "./components/BookSingle";
import Art from "./components/Art";
import ArtSingle from "./components/ArtSingle";
import ArtCollage from "./components/ArtCollage";
import Series from "./components/Series";
import PiGrid from "./components/PiGrid";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <NavSite />
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/code" element={<Code />} />
          <Route path="/code/:project_id" element={<CodeSingle />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:book_id" element={<BookSingle />} />
          <Route path="/art" element={<Art />} />
          <Route path="/art/:art_id" element={<ArtSingle />} />
          <Route path="/art/collage/:threeWords" element={<ArtCollage />} />
          <Route path="/series/:series_id" element={<Series />} />
          <Route path="/pi" element={<PiGrid />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
