import { getImgByPixabay } from "./pixabayAPI";
import { refs } from "./refs";
import SimpleLightbox from "simplelightbox";
import lightbox from "./lightbox";


export default markup = async (query) => {
  try {
    const tempdata = await getImgByPixabay(query)
    if (!tempdata) {
      refs.gallery.innerHTML = '';
      if (!refs.btnMore.classList.contains('hidden')) {
        refs.btnMore.classList.add('hidden')
      }
      return;
    };
    // console.log(tempdata.total);
    const markupCards = tempdata.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
      `<div class="gallery">
          <a href="${largeImageURL}">
     <img src="${webformatURL}" alt="${tags}"loading="lazy"/></a>
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
    
</div>`)
      .join('');
    refs.gallery.insertAdjacentHTML('beforeend', markupCards);
    lightbox.refresh();
    // if (tempdata) {
    //   refs.btnMore.classList.remove('hidden');
    // }


  }
  catch (error) {
    console.log(error);
  }
}

// onclick = "return false"

