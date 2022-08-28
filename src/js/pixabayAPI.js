import { refs } from "./refs";
import axios from "axios";
import { Notify } from "notiflix";
import { page } from "../index";

const API_KEY = '29465617-58b26495e6043c09031550a99';
const PER_PAGE = 200;


axios.defaults.baseURL = 'https://pixabay.com/api';

export const getNumbersImgByPixabay = async (query) => {
    const { data } = await axios(`?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`);
    if (data.hits.length !== 0) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`)
    };
}

export const getImgByPixabay = async (query) => {
    const { data } = await axios(`?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`);
    if (data.hits.length === 0) {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    };
    const numbersPage = Math.ceil(data.totalHits / PER_PAGE);
    if (numbersPage >= page) {
        refs.btnMore.classList.remove('hidden')
    }
    if (numbersPage <= page) {
        Notify.failure("We're sorry, but you've reached the end of search results.")
        refs.btnMore.classList.add("hidden")
    }
    return data;
    // if (data.total)
}