import React, {useState} from 'react';
import { useQuery, useMutation } from "react-apollo";
import { moviesQuery } from "./queries";
import { DialogMovie } from "../DialogMovie";
import Button from 'muicss/lib/react/button';
import { SearchLine } from "../SearchLine";

import {
  addMovieMutation,
  deleteMovieMutation,
  updateMovieMutation
} from "../DialogMovie/mutation";
import { directorsQuery } from "../DirectorsTable/queries";

export const MoviesTable = () => {
  const [name, setName] = useState('');

  //Сомневаюсь в правильности обновления данных при поиске.
  const { loading, error, data } = useQuery(moviesQuery, {
    variables: { name }
  });
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
        refetchQueries: [
          { query: moviesQuery, variables: { name: '' }},
          { query: directorsQuery, variables: { name: '' }}
        ]
      })
    : addMovie( {
        variables: {
          name: name,
          genre: genre,
          directorId: directorId,
          rate: rate || 0,
          watched: Boolean(watched),
        },
        refetchQueries: [
          { query: moviesQuery, variables: { name: '' }},
          { query: directorsQuery, variables: { name: '' }}
        ]
      });

    handleClickClose();
  };

  const handleClickDelete = (idMovie) => {
    deleteMovie({
      variables: {
        id: idMovie
      },
      refetchQueries: [{ query: moviesQuery, variables: { name: '' }}]
    })
  };

  const handleSearch = (strSearch) => {
    setName(strSearch)
  };

  if (error) return 'Error';

  return (
    <>
      <SearchLine placeholder='Поиск фильма' handleSearch={handleSearch}/>
      {loading
        ? 'Loading...'
        : <>
          <Button
            variant="fab"
            color="primary"
            className='btn-fixed'
            title='Добавить фильм'
            onClick={handleClickOpen}
          >+</Button>
          <table className="mui-table mui-table--bordered">
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
                <tr key={movie.id}>
                  <td>{movie.name}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.director ? movie.director.name : 'Нет данных'}</td>
                  <td>{movie.rate}</td>
                  <td>
                    <input type='checkbox' disabled defaultChecked={movie.watched}/>
                  </td>
                  <td>
                    <Button
                      size="small"
                      color='primary'
                      onClick={() => handleClickOpen({
                        id: movie.id,
                        name: movie.name,
                        genre: movie.genre,
                        directorId: movie.director && movie.director.id,
                        rate: movie.rate,
                        watched: movie.watched
                      })}>
                      edit
                    </Button>

                    <Button
                      size="small"
                      color='primary'
                      onClick={() => handleClickDelete(movie.id)}>
                      delete
                    </Button>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>

          {name && !data.movies.length && <p>Фильм не найден</p>}
        </>
      }

      <DialogMovie
        data={infoDialog}
        onClose={handleClickClose}
        onSave={handleClickSave}
      />
    </>
  )
};