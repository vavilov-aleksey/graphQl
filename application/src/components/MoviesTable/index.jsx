import React, {useState} from 'react';
import { useQuery } from "react-apollo";
import { moviesQuery } from "./queries";
import { DialogMovie } from "../DialogMovie";

export const MoviesTable = () => {
  const { loading, error, data } = useQuery(moviesQuery);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  if (loading) return 'Loading...';
  if (error) return 'Error';

  return (
    <>
      <button
        className='btn-adding'
        title='Добавить фильм'
        onClick={() => setIsOpenDialog(true)}
      >
        +
      </button>
      <table border={1}>
        <caption>Список фильмов</caption>
        <thead>
          <tr>
            <th>Название</th>
            <th>Жанр</th>
            <th>Режисер</th>
            <th>Рейтинг</th>
            <th>Просмотрен</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          { data.movies &&  data.movies.map(movie => {
            return (
              <tr key={movie.id} bgcolor={movie.watched ? '#D8FAE7' : '#FAD2C9'}>
                <td>{movie.name}</td>
                <td>{movie.genre}</td>
                <td>{movie.director.name}</td>
                <td>{movie.rate}</td>
                <td>
                  <input type='checkbox' defaultChecked={movie.watched}/>
                </td>
                <td>
                  <button>
                    edit
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <DialogMovie
        open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
      />
    </>
  )
};