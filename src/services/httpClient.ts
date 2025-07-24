import { API_BASE_URL } from '@env';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});
