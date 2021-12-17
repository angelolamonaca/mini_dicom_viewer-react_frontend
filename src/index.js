import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/explorer/Home";
import PatientEditor from "./pages/explorer/PatientEditor";
import StudyEditor from "./pages/explorer/StudyEditor";
import StudyExplorer from "./pages/explorer/StudyExplorer";
import SeriesEditor from "./pages/explorer/SeriesEditor";
import SeriesExplorer from "./pages/explorer/SeriesExplorer";
import FileEditor from "./pages/explorer/FileInfo";
import NoPage from "./pages/explorer/NoPage";
import './index.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="patient/:idPatient" element={<PatientEditor/>}/>
                    <Route path="patient/:idPatient/study/:idStudy" element={<StudyEditor/>}/>
                    <Route path="patient/:idPatient/study/:idStudy/explorer" element={<StudyExplorer/>}/>
                    <Route path="patient/:idPatient/study/:idStudy/series/:idSeries" element={<SeriesEditor/>}/>
                    <Route path="patient/:idPatient/study/:idStudy/series/:idSeries/explorer"
                           element={<SeriesExplorer/>}/>
                    <Route path="patient/:idPatient/study/:idStudy/series/:idSeries/file/:idFile"
                           element={<FileEditor/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));
