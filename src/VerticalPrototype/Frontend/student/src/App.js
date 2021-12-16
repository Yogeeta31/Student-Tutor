import Layout from './hoc/layout';
import Home from './pages/home';
import SearchTutors from './pages/searchTutor';
import AboutUs from './pages/aboutUs';
import ContactUs from './pages/contactUs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/searchTutors" exact element={<SearchTutors />} />
          <Route path="/aboutus" exact element={<AboutUs />} />
          <Route path="/contactus" exact element={<ContactUs />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
