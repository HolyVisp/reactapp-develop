import {Route, Routes} from "react-router-dom";
import ErrorPage from "./Pages/404Page";
import HomePage from "./Pages/HomePage";
import StyleRoute from "./Components/Routes/StyleRoute";
import AuthorizationRoute from "./Components/Routes/AuthorizationRoute";
import TestPage from "./Pages/TestPage";
import SourceTypePage from "./Pages/SourceTypePage";
import ImageEditorPage from "./Pages/ImageEditorPage";
import DocumentsViewerPage from "./Pages/DocumentsViewerPage";
import IframeDetectionComponent from "./Components/IframeDetectionComponent";
import NavigationRoute from "./Components/Routes/NavigationRoute";

export default function App() {
  return (
    <IframeDetectionComponent>
      <Routes>
        <Route element={<StyleRoute />}>
          <Route element={<AuthorizationRoute/>}>
            <Route element={<NavigationRoute/>}>
              <Route path="/" element={<HomePage/>} />
              <Route path="sourceType" element={<SourceTypePage/>} />
              <Route path="archive/sourceType/imageEditor" element={<ImageEditorPage/>} />
              <Route path="archive/sourceType/documentsViewer" element={<DocumentsViewerPage/>} />
              <Route path="test" element={<TestPage/>}/>
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </IframeDetectionComponent>
  );
}