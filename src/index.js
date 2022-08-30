
import { refs } from "./js/refs";
import { markup } from "./js/render";
import { getNumbersImgByPixabay } from "./js/pixabayAPI";
import { Loading } from "notiflix";

let query = refs.input.value;
export let page = 1;

const onSubmitBtn = (e) => {
    e.preventDefault();
    page = 1
    if (!e.currentTarget[0].value) {
        return refs.gallery.innerHTML = '';
    }
    refs.gallery.innerHTML = '';
    query = refs.input.value.trim();
    // add loading`s view
    Loading.circle('Loading...', { backgroundColor: 'rgba(0,0,0,0.5)', });
    getNumbersImgByPixabay(query);
    markup(query);
}

const onLoadMore = (e) => {
    page += 1;
    markup(query);
}

refs.form.addEventListener("submit", onSubmitBtn);

refs.btnMore.addEventListener('click', onLoadMore);

// Infinity scroll
export const InfinityScroll = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        console.log(entry.target);
        Loading.circle('Loading...', { backgroundColor: 'rgba(0,0,0,0.5)', });
        onLoadMore();
    }
}, {})
