import React, { useState, useEffect } from 'react';
import { directorsQuery } from "./queries";
import { useQuery } from "react-apollo";

export const DialogMovie = ({ data, onClose, onSave }) => {
  const dataDirectors = useQuery(directorsQuery);

  const {
    open,
    name,
    genre,
    directorId,
    rate,
    watched
  } = data;

  const [ dataForm, setDataForm ] = useState({
    name: '',
    genre: '',
    directorId: 0,
    rate: 0,
    watched: false
  });

  useEffect(() => {
    setDataForm({
      name: data.name,
      genre: data.genre,
      directorId: data.directorId,
      rate: data.rate,
      watched: Boolean(data.watched)
    })
  }, [data]);

  const changeInputName = (event) => {
    setDataForm({
      ...dataForm,
      name: event.target.value
    })
  };

  const changeInputGenre = (event) => {
    setDataForm({
      ...dataForm,
      genre: event.target.value
    })
  };

  const changeInputRate = (event) => {
    setDataForm({
      ...dataForm,
      rate: Number(event.target.value)
    })
  };

  const changeInputWatched = (event) => {
    setDataForm({
      ...dataForm,
      watched: Number(event.target.checked)
    })
  };

  const changeSelectedDirector = (event) => {
    setDataForm({
      ...dataForm,
      directorId: event.target.value
    })
  };

  return (
    open ?
      <div className="dialog">
        <button
          className='btn-close'
          onClick={onClose}
        >Закрыть</button>
        <form action="#">
          <fieldset>
            <legend>{name ? 'Информация о фильме' : 'Добавить фильм'}</legend>
            <label htmlFor="name">
              Название фильма
              <input id='name' type="text" defaultValue={name} onChange={changeInputName}/>
            </label>
            <label htmlFor="genre">
              Жанр фильма
              <input id='genre' type="text" defaultValue={genre} onChange={changeInputGenre}/>
            </label>
            <label htmlFor="rate">
              Рейтинг фильма
              <input id='rate' type="number" defaultValue={rate} onChange={changeInputRate}/>
            </label>
            <label htmlFor="director">
              Режисер
              <select name="Режисер" id="director" defaultValue={directorId ? directorId : 0} onChange={changeSelectedDirector}>
                <option disabled value='0'>Выберете режисера</option>
                {dataDirectors.data &&
                dataDirectors.data.directors.map(director =>
                  <option value={director.id} key={director.id} >
                    {director.name}
                  </option>
                )}
              </select>
            </label>
            <label htmlFor="watched" className='label-row'>
              <input type="checkbox" id='watched' defaultChecked={watched} onChange={changeInputWatched}/>
              Фильм просмотрен?
            </label>
            <button
              className='btn-submit'
              onClick={() => onSave(dataForm)}
            >Сохранить</button>
          </fieldset>
        </form>
      </div>
    : ''
  )
};
