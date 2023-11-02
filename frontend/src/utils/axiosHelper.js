import axios from 'axios';
import { PATHS } from './paths';
import { URL } from '../config';

export const makeRequest = async (method, path, options) => {
  try {
    const { token, ...others } = options;
    let response;

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }

    switch (method) {
      case 'GET':
        response = await axios.get(URL + PATHS[path], {
          params: others,
          headers
        });
        break;
      case 'POST':
        response = await axios.post(URL + PATHS[path], others, {
          headers
        });
        break;
      case 'PUT':
        response = await axios.put(URL + PATHS[path], others, {
          headers
        });
        break;
      case 'DELETE':
        response = await axios.delete(URL + PATHS[path], {
          params: others,
          headers
        });
        break;
      default:
        console.log('yurr');
    }

    return response;
  } catch (error) {
    // Handle or log the error as needed
    console.error('Error making the request:', error);
    throw error; // Re-throw the error to let the caller handle it
  }
};
