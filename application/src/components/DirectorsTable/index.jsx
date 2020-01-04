import React from 'react';
import { useQuery } from "react-apollo";
import { directorsQuery } from "./queries";

export const DirectorsTable = () => {
  const { loading, error, data } = useQuery(directorsQuery);

  if (loading) return 'Loading...';
  if (error) return 'Error';
  console.log('loading: ', loading)
  console.log('error: ', error)
  console.log('data: ', data)

  return (
    <table border={1}>
      <caption>Список режисеров</caption>
      <thead>
        <tr>
          <th>Ф.И.О</th>
          <th>Возраст</th>
          <th>Снятые фильмы</th>
        </tr>
      </thead>
      <tbody>
        { data.directors &&  data.directors.map(director => {
          return (
            <tr key={director.id}>
              <td>{director.name}</td>
              <td>{director.age}</td>
              <td>
                {!director.movies
                  ? 'Нет снятых фильмов.'
                  : <ul>
                    {director.movies.map(movie =>
                      <li key={movie.id}>{movie.name}</li>
                    )}
                  </ul>
                }
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};