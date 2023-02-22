let movieNameRef = document.querySelector('#movie-name');
let searchBtn = document.querySelector('#search-btn');
let result = document.querySelector('#result');
const form = document.querySelector('#movie-form')

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=72196977`;
    movieNameRef.value = '';

    if (movieName.length === 0) {
        result.innerHTML = '';
        const h3 = document.createElement('h3');
        h3.textContent = 'Please enter a movie name';
        h3.classList.add('msg');
        result.append(h3);
    } else {
        axios.get(url).then(res => {
            const data = res.data;
            result.innerHTML = '';
            if (data.Response === "True") {
                const info = document.createElement('div');
                info.classList.add('info');
                const poster = document.createElement('img');
                poster.classList.add('poster');
                poster.src = data.Poster;

                const div = document.createElement('div')
                const title = document.createElement('h2');
                title.textContent = data.Title;

                const rating = document.createElement('div');
                rating.classList.add('rating');
                const star = document.createElement('img');
                star.src = './star-icon.svg';
                const imdb = document.createElement('h4');
                imdb.textContent = data.imdbRating;
                rating.append(star, imdb);

                const details = document.createElement('div')
                details.classList.add('details');
                const span1 = document.createElement('span');
                const span2 = document.createElement('span');
                const span3 = document.createElement('span');
                span1.textContent = data.Rated;
                span2.textContent = data.Year;
                span3.textContent = data.Runtime;
                details.append(span1, span2, span3);
                
                const genre = document.createElement('div');
                genre.classList.add('genre');
                const gens = data.Genre.split(",")
                gens.forEach(gen => {
                    const container = document.createElement('div');
                    container.append(gen);
                    genre.append(container);
                })
                
                div.append(title, rating, details, genre)
                info.append(poster, div)


                const h3Plot = document.createElement('h3');
                h3Plot.textContent = 'Plot:';
                const pPlot = document.createElement('p');
                pPlot.textContent = data.Plot
                const h3Cast = document.createElement('h3');
                h3Cast.textContent = 'Cast:'
                const pCast = document.createElement('p');
                pCast.textContent = data.Actors

                result.append(info, h3Plot, pPlot, h3Cast, pCast)
            }
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3> `
            }
        })

        .catch(() => {
            result.innerHTML = '';
            result.innerHTML = `<h3 class="msg">Error Occured</h3>`
        })
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    getMovie();
})
