import axios from 'axios';
import { ENV_VAR } from '../config/envVars.js';

export const fetchfromTMDB = async (url) => {
    
    const options = {
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + ENV_VAR.TMDB_API_KEY
    }
};

const response = await axios.get(url, options);

return response.data;
}