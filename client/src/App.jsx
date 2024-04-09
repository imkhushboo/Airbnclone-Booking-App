import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./Layout";

import axios from "axios";
import { UserContextProvider } from "./UserContext";
import RegisterPage from "./pages/Registerpage";
import LoginPage from "./pages/Loginpage";
import IndexPage from "./pages/Indexpage";
import PlacesFormPage from "./pages/PlacesFormPage";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";


axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/account" element={<ProfilePage />}></Route>
              <Route path="/account/places" element={<PlacesPage />}></Route>
              <Route path="/account/places/new" element={<PlacesFormPage />}></Route>
              <Route path="/account/places/:id" element={<PlacesFormPage />}></Route>
              <Route path="/place/:id" element={<PlacePage />}></Route>
              <Route path="/account/bookings" element={<BookingsPage />} ></Route>
              <Route path="/account/bookings/:id" element={<BookingPage />} ></Route>


            </Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
