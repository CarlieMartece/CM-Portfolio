import "./styles/App.css";
import "./styles/code.css";
import "./styles/Introduction.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import NavSite from "./components/NavSite";
import Introduction from "./components/Introduction";
import Code from "./components/Code";
import CodeSingle from "./components/CodeSingle";


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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
