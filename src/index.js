
import { refs } from "./js/refs";
import markup from "./js/render";
import { getNumbersImgByPixabay } from "./js/pixabayAPI";



let query = refs.input.value;
export let page = 1;

const onSubmitBtn = (e) => {
    e.preventDefault();
    if (!e.currentTarget[0].value) {
        return refs.gallery.innerHTML = '';
    }
    refs.gallery.innerHTML = '';
    query = refs.input.value.trim();
    getNumbersImgByPixabay(query)
    markup(query);
}

const onLoadMore = (e) => {
    page += 1;
    markup(query);
}

refs.form.addEventListener("submit", onSubmitBtn);

refs.btnMore.addEventListener('click', onLoadMore)
