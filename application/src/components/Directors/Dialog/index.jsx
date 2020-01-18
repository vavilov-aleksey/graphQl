import React, {useEffect, useState} from 'react';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

export const DialogDirector = ({ data, onClose, onSave }) => {
  const { open, id, name, age } = data;

  const [ dataForm, setDataForm ] = useState({
    id: id,
    name: name,
    age: age
  });

  useEffect(() => {
    setDataForm({
      id: data.id,
      name: data.name,
      age: data.age
    })
  }, [data]);

  const changeInputName = (event) => {
    setDataForm({
      ...dataForm,
      name: event.target.value
    })
  };

  const changeInputAge = (event) => {
    setDataForm({
      ...dataForm,
      age: Number(event.target.value)
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
            <legend>{name ? 'Информация о режисере' : 'Добавить режисера'}</legend>
            <Input
              id='name'
              label="Ф.И.О"
              type="text"
              floatingLabel={true}
              required={true}
              defaultValue={name}
              onChange={changeInputName}
            />

            <Input
              id='age'
              label="Возраст"
              type="number"
              floatingLabel={true}
              required={true}
              defaultValue={age}
              onChange={changeInputAge}
            />

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
