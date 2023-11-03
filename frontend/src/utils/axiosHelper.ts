import axios, { AxiosResponse, Method } from 'axios';
import { PATHS } from './paths';
import { URL } from '../config';
import { RequestOptions } from '../types/types';

export const makeRequest = async (
  method: Method,
  path: keyof typeof PATHS,
  options: RequestOptions
): Promise<AxiosResponse<any>> => {
  try {
    const { token, ...others } = options;
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }

    const url = `${URL}${PATHS[path]}`;

    switch (method) {
      case 'GET':
        return await axios.get(url, { params: others, headers });
      case 'POST':
        return await axios.post(url, others, { headers });
      case 'PUT':
        return await axios.put(url, others, { headers });
      case 'DELETE':
        return await axios.delete(url, { params: others, headers });
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  } catch (error) {
    // Handle or log the error as needed
    console.error('Error making the request:', error);
    throw error; // Re-throw the error to let the caller handle it
  }
};
