import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      "id": "1",
      "Title": "Silence of the Lambs",
      "Description": "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      "Genre": {
        "Name": "Thriller",
        "Description": "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
      },
      "Director": {
        "Name": "Jonathan Demme",
        "Bio": "Robert Jonathan Demme was an American director, producer, and screenwriter.",
        "Birth": "1944",
        "Death": "2017"
      },
      "ImagePath": "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg",
      "Featured": true
    },
    {
      "id": "2",
      "Title": "Law Abiding Citizen",
      "Description": "In Philadelphia, Clyde Shelton becomes the victim of a brutal crime. His wife and daughter are murdered and Clyde can't help but watch as the perpetrator is set free by the justice system. Nitem. Nick Rice is the prosecutor and responsible for the release of the perpetrator. Ten years later, Clyde decides to take revenge and take the law into her own hands.",
      "Genre": {
        "Name": "Thriller",
        "Description": "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible."
      },
      "Director": {
        "Name": "Felix Gary Gray",
        "Bio": "Felix Gray is an American music video and film director.",
        "Birth": "1969",
        "Death": "N/A"
      },
      "ImagePath": "https://www.moviemeter.nl/images/cover/52000/52019.jpg",
      "Featured": true
    },
    {
      "id":"3",
      "Title": "Straight Outta Compton",
      "Description": "Straight Outta Compton is a 2015 American biographical drama film about the hip hop group N.WA.",
      "Genre": {
        "Name": "Biological Drama",
        "Description": "A drama based on the life of an actual person or persons."
      },
      "Director": {
        "Name": "Felix Gary Gray",
        "Bio": "Felix Gray is an American music video and film director.",
        "Birth": "1969",
        "Death": "N/A"
      },
      "ImagePath": "https://m.media-amazon.com/images/M/MV5BMTA5MzkyMzIxNjJeQTJeQWpwZ15BbWU4MDU0MDk0OTUx._V1_FMjpg_UX1000_.jpg",
      "Featured": true
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedBook(null)}/>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};