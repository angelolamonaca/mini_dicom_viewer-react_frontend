import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PatientDetails from "./pages/PatientDetails";
import StudyEdit from "./pages/StudyEdit";
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
                    <Route path="patient/:id" element={<PatientDetails />} />
                    <Route path="study/:id" element={<StudyEdit />} />
                    <Route path="study/:id/explorer" element={<StudyDetails />} />
                    <Route path="series/:id" element={<SeriesDetails />} />
                    <Route path="file" element={<FileDetails />} />
                    <Route path="modality" element={<ModalityDetails />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
