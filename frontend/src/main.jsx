import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> 
      {/* Wrapping App with Router ensures routing works */}
      <App />
    </Router>
  </React.StrictMode>
);
