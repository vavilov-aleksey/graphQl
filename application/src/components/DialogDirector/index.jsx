import React, {useEffect, useState} from 'react';

export const DialogDirector = ({ data, onClose, onSave }) => {
  const { open, name, age } = data;

  const [ dataForm, setDataForm ] = useState({
    name: name,
    age: age
  });

  useEffect(() => {
    setDataForm({
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
      <div className="dialog">
        <button
          className='btn-close'
          onClick={onClose}
        >Закрыть</button>
        <form action="#">
          <fieldset>
            <legend>{name ? 'Информация о режисере' : 'Добавить режисера'}</legend>
            <label htmlFor="name">
              Ф.И.О режисера
              <input id='name' type="text" defaultValue={name} onChange={changeInputName}/>
            </label>
            <label htmlFor="age">
              Возраст режисера
              <input id='age' type="number" defaultValue={age} onChange={changeInputAge}/>
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
