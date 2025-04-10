import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Central from "./components/Central/Central";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Central />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
