import React, { useState, useEffect } from 'react';
import { directorsQuery } from "./queries";
import { useQuery } from "react-apollo";
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';
import Checkbox from 'muicss/lib/react/checkbox';

export const DialogMovie = ({ data, onClose, onSave }) => {
  const dataDirectors = useQuery(directorsQuery, {
    variables: { name: '' }
  });

  const {
    open,
    name,
    genre,
    directorId,
    rate,
    watched
  } = data;

  const [ dataForm, setDataForm ] = useState({
    id: '',
    name: '',
    genre: '',
    directorId: 0,
    rate: 0,
    watched: false
  });

  useEffect(() => {
    setDataForm({
      id: data.id,
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
      <div id='mui-overlay'>
        <Button
          variant="fab"
          color="primary"
          className='btn-fixed btn-close'
          title='Закрыть'
          onClick={onClose}
        >Закрыть</Button>
        <form action="#">
          <fieldset>
            <legend>{name ? 'Информация о фильме' : 'Добавить фильм'}</legend>
            <Input
              id='name'
              label="Название"
              type="text"
              floatingLabel={true}
              required={true}
              defaultValue={name}
              onChange={changeInputName}
            />

            <Input
              id='genre'
              label="Жанр"
              type="text"
              floatingLabel={true}
              required={true}
              defaultValue={genre}
              onChange={changeInputGenre}
            />

            <Input
              id='rate'
              label="Рейтинг"
              type="number"
              floatingLabel={true}
              required={true}
              defaultValue={rate}
              onChange={changeInputRate}
            />

            <Select name="Режисер" label="Режисер" defaultValue={directorId ? directorId : 0} onChange={changeSelectedDirector}>
              <Option disabled value='0' label="Выберете режисера" />
              {dataDirectors.data &&
              dataDirectors.data.directors.map(director =>
                <Option key={director.id} value={director.id} label={director.name} />
              )}
            </Select>

            <Checkbox name="watched" label="Фильм просмотрен?" defaultChecked={watched} onChange={changeInputWatched}/>

            <Button
              color="primary"
              onClick={() => onSave(dataForm)}
            >Сохранить</Button>
          </fieldset>
        </form>
      </div>
    : ''
  )
};
