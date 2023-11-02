import axios from 'axios'
import { URL } from '../config';

export const createInstance = (token = null) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }

  return axios.create({
    baseURL: URL,
    headers
  });
}
