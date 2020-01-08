import React, {useState} from 'react';
import { useQuery, useMutation } from "react-apollo";
import { directorsQuery } from "./queries";
import { DialogDirector } from "../DialogDirector";
import { addDirectorMutation } from "../DialogDirector/mutations";

export const DirectorsTable = () => {
  const { loading, error, data } = useQuery(directorsQuery);
  const [ addDirector ] = useMutation(addDirectorMutation);

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

  const handleClickSave = () => {
    // Error
    addDirector( {"name": "test name", "age": 555});
  };

  if (loading) return 'Loading...';
  if (error) return 'Error';

  return (
    <>
      <button
        className='btn-adding'
        title='Добавить режисера'
        onClick={handleClickOpen}
      >
        +
      </button>
      <table border={1}>
        <caption>Список режисеров</caption>
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
                  <button onClick={() => handleClickOpen({
                    name: director.name,
                    age: director.age
                  })}>
                    edit
                  </button>
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