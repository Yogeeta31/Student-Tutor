import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home";
import SearchTutorsPage from "./pages/SearchTutors";
import AboutUsPage from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUs";
import Layout from "./layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact={true} path="/" element={<HomePage />} />
        <Route
          exact={true}
          path="/search-tutors"
          element={<SearchTutorsPage />}
        />
        <Route exact={true} path="/about-us" element={<AboutUsPage />} />
        <Route exact={true} path="/contact-us" element={<ContactUsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
