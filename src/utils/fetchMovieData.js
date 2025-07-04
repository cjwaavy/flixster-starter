const fetchMovieConfig = async () => { //technically the proper way to get image link prefix, so following suit
    const url = 'https://api.themoviedb.org/3/configuration';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie config:', error);
        return null;
    }
}

const fetchMovieData = async (pageNumber) => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return null;
    }
}

const fetchMoivesByTitle = async (pageNumber, title) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${pageNumber}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie search qury results:', error);
        return null;
    }
}
const fetchMovieDetails = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
}
const fetchMovieVideo = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie trailers:', error);
        return null;
    }
}

const getmoviedetails = async (id) =>{
    const url = 'https://api.themoviedb.org/3/movie/MOVIE_ID?language=en-US';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzcwMTVlMDVjODU1MTc5MDMxMWQ2ODdjZjVkZDg4NSIsIm5iZiI6MTc0OTM2ODE2NC4xNTM5OTk4LCJzdWIiOiI2ODQ1M2Q2NDYzYTUwZjBlZGUzNDIyZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.72rFjxqEL_v7RGl_zrR1eNk8yGCqZWoVnIWqYFWhZ5Q'
    }
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
    }
export { fetchMovieData, fetchMovieConfig, fetchMoivesByTitle, fetchMovieDetails, fetchMovieVideo};
