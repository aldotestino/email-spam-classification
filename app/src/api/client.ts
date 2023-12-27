import axios from 'axios';
import { QueryClient } from 'react-query';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

const queryClient = new QueryClient();

export { client, queryClient };