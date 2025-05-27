const config = {
  apiUrl: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://your-backend-app-name.onrender.com'
};

export default config;