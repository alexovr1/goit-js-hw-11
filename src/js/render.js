import { getImgByPixabay } from "./pixabayAPI";
import { refs } from "./refs";
import lightbox from "./lightbox";
import { Loading } from "notiflix";
import { PER_PAGE } from "./pixabayAPI";
import { page } from "../index";
import { Notify } from "notiflix";



export default markup = async (query) => {
  try {
    const tempdata = await getImgByPixabay(query);
    const numbersPage = Math.ceil(tempdata.totalHits / PER_PAGE);
    if (numbersPage >= page) {
      refs.btnMore.classList.remove('hidden')
    }
    if (numbersPage <= page) {
      refs.btnMore.classList.add("hidden")
      Notify.failure("We're sorry, but you've reached the end of search results.", {
        timeout: 5000,
      })
    }
    // Check answer request
    if (!tempdata) {
      refs.gallery.innerHTML = '';

      // Check button`s view
      if (!refs.btnMore.classList.contains('hidden')) {
        refs.btnMore.classList.add('hidden')
      }
      return;
    };

    // render items to memory
    const markupCards = tempdata.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
      `<div class="gallery" height=255px><a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"loading="lazy"/></a>
    <div class="info">
    <p class="info-item">
    <b>Likes</b>
      <b class=info-item__value>${likes}</b>
    </p>
    <p class="info-item">
    <b>Views</b>
      <b class=info-item__value>${views}</b>
    </p>
    <p class="info-item">
    <b>Comments</b>
      <b class=info-item__value>${comments}</b>
    </p>
    <p class="info-item">
    <b>Downloads</b>
      <b class=info-item__value>${downloads}</b>
    </p>
    </div>
</div>`).join('');

    // render items to HTML
    refs.gallery.insertAdjacentHTML('beforeend', markupCards);
    // Update item`s lib
    lightbox.refresh();
    // remore loading`s view
    Loading.remove();
  }

  catch (error) {
    console.log(error);
  }
}

