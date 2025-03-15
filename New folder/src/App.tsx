import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesConfig from "./routes/RoutesConfig";
import { useSelector } from "react-redux";
import { RootState } from "./State Management/Store/Store";
import { ToastContainer } from "react-toastify";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.root.isAuthenticated
  );

  return (
    <BrowserRouter>
      <RoutesConfig isAuthenticated={isAuthenticated} />
      <ToastContainer limit={1} />
    </BrowserRouter>
  );
}

export default App;
