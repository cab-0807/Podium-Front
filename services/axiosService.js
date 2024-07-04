// axiosService.js

import axios from 'axios';
import { environment } from '../env/environment';

const instance = axios.create({
  baseURL: environment.ApIPath, // Ensure environment.ApIPath is correctly configured
  timeout: 10000, // Adjust timeout as necessary
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosService = {
  login: (user) => {
    return instance.post('auth/login', user)
      .then(response => {
        return response.data; 
      })
      .catch(error => {
        console.error('Error login:', error);
        throw error; 
      });
  },

  register: (user) => {

    return instance.post('auth/register', user)
      .then(response => {
        return response.data; 
      })
      .catch(error => {
        console.error('Error registering:', error);
        throw error; 
      });
  },

  createCommunity: (community) => {

    return instance.post('community', community)
      .then(response => {
        return response.data; 
      })
      .catch(error => {
        console.error('Error creating community:', error);
        throw error; 
      });
  },
};

export default axiosService;
