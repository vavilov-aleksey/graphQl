import React, {useState} from 'react';
import { useQuery, useMutation } from "react-apollo";
import { directorsQuery } from "./queries";
import { DialogDirector } from "../DialogDirector";
import Button from 'muicss/lib/react/button';
import { SearchLine } from "../SearchLine";

import {
  addDirectorMutation,
  deleteDirectorMutation,
  updateDirectorMutation
} from "../DialogDirector/mutations";
import { BtnAdd } from "../BtnAdd";
import { moviesQuery } from "../MoviesTable/queries";

export const DirectorsTable = () => {
  const [name, setName] = useState('');

  //Сомневаюсь в правильности обновления данных при поиске.
  const { loading, error, data } = useQuery(directorsQuery, {
    variables: { name }
  });
  const [ addDirector ] = useMutation(addDirectorMutation);
  const [ deleteDirector ] = useMutation(deleteDirectorMutation);
  const [ updateDirector ] = useMutation(updateDirectorMutation);

  const [infoDialog, setInfoDialog] = useState({
    open: false,
    name: '',
    age: 0
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
      age: 0
    })
  };

  const optionRefetch = [
    { query: directorsQuery, variables: { name: '' }},
    { query: moviesQuery, variables: { name: '' }}
  ];

  const handleClickSave = (data) => {
    const { id, name, age } = data;

    id
      ? updateDirector( {
          variables: { id: id, name: name, age: age },
          refetchQueries: optionRefetch
        })
      : addDirector( {
          variables: { name: name, age: age },
          refetchQueries: optionRefetch
        });

    handleClickClose();
  };

  const handleClickDelete = (idDirector) => {
    deleteDirector({
      variables: {
        id: idDirector
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
      <SearchLine placeholder='Поиск режисера' handleSearch={handleSearch}/>
      {loading
        ? 'Loading...'
        : <>
          <BtnAdd title='Добавить режисера' handleClick={handleClickOpen}/>

          <table className="mui-table mui-table--bordered">
            <thead>
            <tr>
              <th>Ф.И.О</th>
              <th>Возраст</th>
              <th>Снятые фильмы</th>
              <th>&nbsp;</th>
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
                  <td>
                    <Button
                      size="small"
                      color='primary'
                      onClick={() => handleClickOpen({
                        id: director.id,
                        name: director.name,
                        age: director.age
                      })}>
                      edit
                    </Button>

                    <Button
                      size="small"
                      color='primary'
                      onClick={() => handleClickDelete(director.id)}>
                      delete
                    </Button>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>

          {name && !data.directors.length && <p>Режисер не найден</p>}
        </>
      }

      <DialogDirector
        data={infoDialog}
        onClose={handleClickClose}
        onSave={handleClickSave}
      />
    </>
  )
};