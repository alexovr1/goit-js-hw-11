import { refs } from "./refs";
import axios from "axios";
import { Notify } from "notiflix";
import { Loading } from "notiflix";
import { page } from "../index";

const API_KEY = '29465617-58b26495e6043c09031550a99';
export const PER_PAGE = 40;

axios.defaults.baseURL = 'https://pixabay.com/api';

// Notification quantity images
export const getNumbersImgByPixabay = async (query) => {
    const { data } = await axios(`?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`);
    if (data.hits.length !== 0) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`)
    };
}

// Notification bad query & pagination pages
export const getImgByPixabay = async (query) => {
    const { data } = await axios(`?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`);
    if (data.hits.length === 0) {
        Loading.remove();
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    };
    return data;
}