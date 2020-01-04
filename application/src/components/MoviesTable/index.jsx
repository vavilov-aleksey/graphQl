import React from 'react';
import { useQuery } from "react-apollo";
import { moviesQuery } from "./queries";

export const MoviesTable = () => {
  const { loading, error, data } = useQuery(moviesQuery);

  if (loading) return 'Loading...';
  if (error) return 'Error';
  console.log('loading: ', loading)
  console.log('error: ', error)
  console.log('data: ', data)

  return (
    <table border={1}>
      <caption>Список фильмов</caption>
      <thead>
        <tr>
          <th>Название</th>
          <th>Жанр</th>
          <th>Режисер</th>
          <th>Рейтинг</th>
        </tr>
      </thead>
      <tbody>
        { data.movies &&  data.movies.map(movie => {
          return (
            <tr key={movie.id} bgcolor={movie.watched ? '#FAD2C9' : '#D8FAE7'}>
              <td>{movie.name}</td>
              <td>{movie.genre}</td>
              <td>{movie.director.name}</td>
              <td>{movie.rate}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};