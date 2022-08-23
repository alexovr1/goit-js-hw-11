// https://pixabay.com/api/?key=29465617-58b26495e6043c09031550a99&q=yellow+flowers&image_type=photo&pretty=true
import axios from "axios";

const API_KEY = '29465617-58b26495e6043c09031550a99';

axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}`;

export const getImgByPixabay = (query) => {
    return axios(`&q=${query}&orientation=horizontal`)
}