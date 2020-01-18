import React, {useState} from 'react';
import { useQuery, useMutation } from "react-apollo";
import { moviesQuery } from "./queries";
import { DialogMovie } from "../Dialog";
import Button from 'muicss/lib/react/button';
import { SearchLine } from "../../SearchLine";

import {
  addMovieMutation,
  deleteMovieMutation,
  updateMovieMutation
} from "../Dialog/mutation";
import { directorsQuery } from "../../Directors/Table/queries";

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

  const optionRefetch = [
    { query: moviesQuery, variables: { name: '' }},
    { query: directorsQuery, variables: { name: '' }}
  ];

  const optionForUpdate = (data) => {
    const {
      id,
      name,
      genre,
      directorId,
      rate = 0,
      watched
    } = data;

    return ({
      variables: {
        id,
        name,
        genre,
        directorId,
        rate,
        watched: Boolean(watched),
      },
      refetchQueries: optionRefetch
    })};

  const handleClickSave = (data) => {
    data.id
      ? updateMovie( optionForUpdate(data))
      : addMovie( optionForUpdate(data));

    handleClickClose();
  };

  const handleClickDelete = (idMovie) => {
    deleteMovie({
      variables: {
        id: idMovie
      },
      refetchQueries: optionRefetch
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
            { data.movies &&  data.movies.map(movie =>
              <tr key={movie.id}>
                <td>{movie.name}</td>
                <td>{movie.genre}</td>
                <td>{movie.director ? movie.director.name : 'Нет данных'}</td>
                <td>{movie.rate}</td>
                <td>{movie.watched ? 'Да' : 'Нет'}</td>
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
            )}
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
