import Layout from "./hoc/layout";
import PrivateRoute from "./hoc/auth";
import Home from "./pages/Home";
import SearchTutors from "./pages/SearchTutor";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ChatList from "./components/ChatList";
import ChatScreen from "./components/ChatScreen";
import PendingRequest from "./pages/moderator/PendingRequest";
import ChangeRequests from "./pages/moderator/ChangeRequests";
//import ViewTutor from './components/ViewTutor';
import ViewTutor from "./pages/ViewTutor";
import ViewMessageRequest from "./pages/tutor/ViewMessageRequest";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import StudentSignUp from "./pages/StudentSignUp";
import TutorSignUp from "./pages/tutor/TutorSignUp";
import SignUpChoice from "./pages/SignUpChoice";
import ErrorPage from "./pages/ErrorPage";
import ViewTutorProfile from "./pages/moderator/ViewTutorProfile";
import ApprovedTutors from "./pages/moderator/ApprovedTutors";

import { LoginStateProvider } from "./context/LoginContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App(props) {
  return (
    <BrowserRouter>
      <LoginStateProvider>
        <Layout>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/searchTutors" exact element={<SearchTutors />} />
            <Route path="/aboutus" exact element={<AboutUs />} />
            <Route path="/contactus" exact element={<ContactUs />} />
            <Route path="/chats" exact element={<PrivateRoute component={ChatList} role={["student", "tutor"]} />} />
            <Route path="/chat/:id" exact element={<PrivateRoute component={ChatScreen} role={["student", "tutor"]} />} />
            <Route path="/signupchoice" exact element={<SignUpChoice />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/logout" exact element={<Logout />} />
            <Route path="/errorpage" exact element={<ErrorPage />} />
            <Route path="/signUp/student" exact element={<StudentSignUp />} />
            <Route path="/signUp/tutor" exact element={<TutorSignUp />} />

            <Route path="/viewtutor/:id" exact element={<PrivateRoute component={ViewTutor} role={["student"]} />} />
            <Route path="/viewmessagerequest" exact element={<ViewMessageRequest />} />

            <Route path="/pendingrequests" exact element={<PrivateRoute component={PendingRequest} role={["moderator"]} />} />
            <Route path="/changerequests" exact element={<PrivateRoute component={ChangeRequests} role={["moderator"]} />} />
            <Route path="/viewTutorProfile/:id" exact element={<PrivateRoute component={ViewTutorProfile} role={["moderator"]} />} />
            <Route path="/approvedtutors" exact element={<PrivateRoute component={ApprovedTutors} role={"moderator"} />} />
          </Routes>
        </Layout>
      </LoginStateProvider>
    </BrowserRouter>
  );
}

export default App;
