import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PatientDetails from "./pages/PatientDetails";
import StudyDetails from "./pages/StudyDetails";
import SeriesDetails from "./pages/SeriesDetails";
import FileDetails from "./pages/FileDetails";
import ModalityDetails from "./pages/ModalityDetails";
import NoPage from "./pages/NoPage";
import './index.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="patient" element={<PatientDetails />} />
                    <Route path="study" element={<StudyDetails />} />
                    <Route path="series" element={<SeriesDetails />} />
                    <Route path="file" element={<FileDetails />} />
                    <Route path="modality" element={<ModalityDetails />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
