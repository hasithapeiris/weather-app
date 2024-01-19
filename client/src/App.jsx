import styles from "./App.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, blueGrey } from "@mui/material/colors";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const theme = createTheme({
  palette: {
    primary: grey,
    secondary: blueGrey,
  },
  typography: {
    fontFamily: "Jost",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <div className={styles.content}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>
          </div>
          <Footer />
        </Router>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default App;
