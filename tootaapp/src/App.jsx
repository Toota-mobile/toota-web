import React from "react";
import { Routes, Route } from "react-router-dom";  // <-- Make sure to import Routes and Route
import LandingPage from "./components/landingpage";
import Services from "./components/Services";
import Signup from "./components/Signup";
import About from "./components/About";
import DriverSignup from "./components/DriverSignup";
import BusinessSignup from "./components/BusinessSignup";
import IndividualSignup from "./components/IndividualSignup";
import SendParcel from "./components/SendParcel";
import IndividualProfilePage from "./components/IndividualProfilePage"; // Import the individual profile component
import ProfilePage from "./components/ProfilePage"; // ✅ Import ProfilePage
import DriverDashboard from "./components/DriverDashboard";
import DriverSignin from "./components/DriverSignin";
import IndividualSignin from "./components/IndividualSignin";
import Signin from "./components/Signin";
import DriverProfile from "./components/DriverProfile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/services" element={<Services />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/signin" element={<Signin />} />

      {/* Signup sub-pages */}
      <Route path="/signup/driver" element={<DriverSignup />} />
      <Route path="/signup/business" element={<BusinessSignup />} />
      <Route path="/signup/individual" element={<IndividualSignup />} />
      <Route path="/send-parcel" element={<SendParcel />} />
      <Route path="/profile" element={<IndividualProfilePage />} />
      <Route path="/driver-dashboard" element={<DriverDashboard />} />
      <Route path="/signin/driver" element={<DriverSignin />} />
      <Route path="/signin/individual" element={<IndividualSignin />} /> 
      <Route path="/driver-profile" element={<DriverProfile />} />
    </Routes>
  );
}

export default App;
