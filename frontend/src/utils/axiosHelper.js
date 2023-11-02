import axios from 'axios';
import { PATHS } from './paths';

export const makeRequest = async (method, path, options) => {
  try {
    const backend = 'http://localhost:5005/'
    const { token, ...others } = options;
    let response;

    switch (method) {
      case 'GET':
        response = await axios.get(backend + PATHS[path], {
          params: others,
          headers: { token },
        });
        break;
      case 'POST':
        response = await axios.post(backend + PATHS[path], others, {
          headers: { token },
        });
        break;
      case 'PUT':
        response = await axios.put(backend + PATHS[path], others, {
          headers: { token },
        });
        break;
      case 'DELETE':
        response = await axios.delete(backend + PATHS[path], {
          params: others,
          headers: { token },
        });
        break;
      case 'GETNOAUTH':
        console.log(backend + PATHS[path]);
        response = await axios.get(backend + PATHS[path], {
          params: others,
        });
        break;
      case 'POSTNOAUTH':
        response = await axios.post(backend + PATHS[path], others);
        break;
      case 'PUTNOAUTH':
        response = await axios.put(backend + PATHS[path], others);
        break;
      case 'DELETENOAUTH':
        response = await axios.delete(backend + PATHS[path], {
          params: others,
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
