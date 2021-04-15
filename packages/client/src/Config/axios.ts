import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.SERVER || 'http://localhost:8082/',
});

export default instance;
