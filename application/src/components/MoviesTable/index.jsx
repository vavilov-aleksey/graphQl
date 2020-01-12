import React, {useState} from 'react';
import { useQuery, useMutation } from "react-apollo";
import { moviesQuery } from "./queries";
import { DialogMovie } from "../DialogMovie";
import {
  addMovieMutation,
  deleteMovieMutation,
  updateMovieMutation
} from "../DialogMovie/mutation";

export const MoviesTable = () => {
  const { loading, error, data } = useQuery(moviesQuery);
  const [ addMovie ] = useMutation(addMovieMutation);
  const [ deleteMovie ] = useMutation(deleteMovieMutation);
  const [ updateMovie ] = useMutation(updateMovieMutation);

  const [infoDialog, setInfoDialog] = useState({
    open: false,
    name: '',
    genre: '',
    directorId: '',
    rate: 0,
    watched: false
  });

  const handleClickOpen = (data) => {
    setInfoDialog({
      open: true,
      ...data
    })
  };

  const handleClickClose = () => {
    setInfoDialog({
      open: false,
      name: '',
      genre: '',
      directorId: '',
      rate: 0,
      watched: false
    })
  };

  const handleClickSave = (data) => {
    const {
      id,
      name,
      genre,
      directorId,
      rate,
      watched
    } = data;

    console.table(data)

    id
    ? updateMovie( {
        variables: {
          id: id,
          name: name,
          genre: genre,
          directorId: directorId,
          rate: rate || 0,
          watched: Boolean(watched),
        },
        refetchQueries: [{ query: moviesQuery}]
      })
    : addMovie( {
        variables: {
          name: name,
          genre: genre,
          directorId: directorId,
          rate: rate || 0,
          watched: Boolean(watched),
        },
        refetchQueries: [{ query: moviesQuery}]
      });



    handleClickClose();
  };

  const handleClickDelete = (idMovie) => {
    deleteMovie({
      variables: {
        id: idMovie
      },
      refetchQueries: [{ query: moviesQuery}]
    })
  };

  if (loading) return 'Loading...';
  if (error) return 'Error';

  return (
    <>
      <div className="search-line">
        <input type="text" onChange={() => {}} placeholder='Поиск фильма'/>
        <button
          className='btn-adding'
          title='Добавить фильм'
          onClick={handleClickOpen}
        >
          +
        </button>
      </div>
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
                <td>{movie.director ? movie.director.name : 'Нет данных'}</td>
                <td>{movie.rate}</td>
                <td>
                  <input type='checkbox' disabled defaultChecked={movie.watched}/>
                </td>
                <td>
                  <button onClick={() => handleClickOpen({
                    id: movie.id,
                    name: movie.name,
                    genre: movie.genre,
                    directorId: movie.director && movie.director.id,
                    rate: movie.rate,
                    watched: movie.watched
                  })}>
                    edit
                  </button>

                  <button onClick={() => handleClickDelete(movie.id)}>
                    delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <DialogMovie
        data={infoDialog}
        onClose={handleClickClose}
        onSave={handleClickSave}
      />
    </>
  )
};