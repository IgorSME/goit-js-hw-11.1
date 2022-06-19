
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";
import cardsMarkup from "./js/template"
// import './css/style.css';


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('div.gallery'),
    loadMore: document.querySelector('.load-more')
}
// const API_KEY = '28041908-d52a5e823497e2788f8c70142';
// const URL = 'https://pixabay.com/api/';

refs.searchForm.addEventListener('submit', onSearch);


async function onSearch(e) {
    try {
    e.preventDefault();
        const formInput = e.currentTarget.elements.searchQuery.value;
        if (!formInput) {
            Notify.failure("Sorry, empty search. Please try again.");
            return
        }
        let page = 1;
        const imageCollection = await fetchImages(formInput, page);
        imageMarkup(imageCollection.hits);

        if (!imageCollection.total) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        return
        }
        if (refs.loadMore.classList.contains('is-hidden')) {
            refs.loadMore.classList.toggle('is-hidden');
        }
        e.target.reset();
    
    } catch (error) {
        error => console.log(error);
    }
    
    
}


async function fetchImages(search, page) {
    const res = await axios(`https://pixabay.com/api/?key=28071781-459ddb4c5fc455b50beadddbb&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)

    return res.data;
}

function imageMarkup(arr) {
    refs.gallery.innerHTML = cardsMarkup(arr);
}

