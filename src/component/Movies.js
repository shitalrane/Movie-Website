import { Component } from "react"
import css from './Movies.module.css'
export default class Movies extends Component {

    constructor(props) {
        super(props);
        this.state = { movies: [], isLoaded: false, error: false };
    }

    handleChange = (e) => {
        let title = e.target.value;
        this.getMovies(`https://www.omdbapi.com/?apikey=45f0782a&s=${title === "" ? "war" : title}`)
    }

    render() {
        let { movies, isLoaded, error } = this.state;
        if (error) {
            return <div><h3>Failed to fetch movies...</h3></div>
        } else if (!isLoaded) {
            return <div><h3>Loading...</h3></div>
        } else {
            return (
                <div>
                    <div><h1>Movie search website</h1>
                        <input onChange={this.handleChange} type="text" placeholder="Search for Movie Title" id={css.input} />
                    </div>
                    <div id={css.container}>
                        {movies.Search !== undefined ? movies.Search.map((item, pos) => {
                            return <article key={`${item.imdbID}${pos}`} className={css.card}>
                                <img src={item.Poster} alt="movieImage" />
                                <p>{item.Title}</p>
                            </article>
                        }) : <h3></h3>}
                    </div>
                </div>
            )
        }

    }

    componentDidMount() {
        this.getMovies('https://www.omdbapi.com/?apikey=45f0782a&s=war')
    }
    getMovies = (url) => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ movies: result, isLoaded: true, error: false })
                },
                (error) => {
                    console.log(error);
                    this.setState({ movies: [], isLoaded: true, error: true })
                }
            )
    }
}
