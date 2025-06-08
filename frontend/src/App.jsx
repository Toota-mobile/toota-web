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
import UserDashboard from "./components/IndividualProfilePage"; // Import the individual profile component
import ProfilePage from "./components/ProfilePage"; // ✅ Import ProfilePage
import DriverDashboard from "./components/DriverDashboard";
import DriverSignin from "./components/DriverSignin";
import IndividualSignin from "./components/IndividualSignin";
import Signin from "./components/Signin";
import DriverProfile from "./components/DriverProfile";
import EmailVerification from "./components/EmailVerify"; // Import the email verification component
import ResetPassword from "./components/ResetPassword";
import TripsWebSocket from "./components/Test";
import TripDetailsTab from "./components/Payment";
import PaymentSuccess from "./components/PaymentSuccess";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/services" element={<Services />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/verify-email" element={<EmailVerification />} /> {/* Add the email verification route */}      
      <Route path="/reset-pwd" element={<ResetPassword />} />

      {/* Signup sub-pages */}
      <Route path="/signup/driver" element={<DriverSignup />} />
      <Route path="/signup/business" element={<BusinessSignup />} />
      <Route path="/signup/individual" element={<IndividualSignup />} />
      {/* Individual profile page */}
      <Route path="/send-parcel" element={<SendParcel />} />
      <Route path="/profile" element={<UserDashboard />} />
      <Route path="/driver-dashboard" element={<DriverDashboard />} />
      <Route path="/signin/driver" element={<DriverSignin />} />
      <Route path="/signin/individual" element={<IndividualSignin />} /> 
      <Route path="/driver-profile" element={<DriverProfile />} />
      <Route path="/test" element={<TripsWebSocket />} />
      <Route path="/payment" element={<TripDetailsTab />} /> {/* Add the payment component route */}
      <Route path="/verify_payment" element={<PaymentSuccess />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
