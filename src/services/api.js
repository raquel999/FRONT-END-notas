import axios  from 'axios';

export const api = axios.create({
    baseURL:'https://rocketnotes-api-4k6y.onrender.com'
});