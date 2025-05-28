import process from 'process'

const config = {
  apiUrl: process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://your-backend-app-name.onrender.com'
};

export default config;