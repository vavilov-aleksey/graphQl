import React, {useState} from 'react';
import { useQuery, useMutation } from "react-apollo";
import { directorsQuery } from "./queries";
import { DialogDirector } from "../DialogDirector";
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

import {
  addDirectorMutation,
  deleteDirectorMutation,
  updateDirectorMutation
} from "../DialogDirector/mutations";

export const DirectorsTable = () => {
  const { loading, error, data } = useQuery(directorsQuery);
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

  const handleClickSave = (data) => {
    const { id, name, age } = data;

    id
    ? updateDirector( {
        variables: { id: id, name: name, age: age },
        refetchQueries: [{ query: directorsQuery}]
      })
    : addDirector( {
      variables: { name: name, age: age },
      refetchQueries: [{ query: directorsQuery}]
      });

    handleClickClose();
  };

  const handleClickDelete = (idDirector) => {
    deleteDirector({
      variables: {
        id: idDirector
      },
      refetchQueries: [{ query: directorsQuery}]
    })
  };

  const handleChangeSearch = (event) => {
    console.log(event.target.value)
  };

  if (loading) return 'Loading...';
  if (error) return 'Error';

  return (
    <>
      <Input label="Поиск режисера" floatingLabel={true} className='search-line'/>
      <Button
        variant="fab"
        color="primary"
        className='btn-fixed'
        title='Добавить режисера'
        onClick={handleClickOpen}
      >+</Button>
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

      <DialogDirector
        data={infoDialog}
        onClose={handleClickClose}
        onSave={handleClickSave}
      />
    </>
  )
};