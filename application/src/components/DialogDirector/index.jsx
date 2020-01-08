import React from 'react';

export const DialogDirector = ({ data, onClose, onSave }) => {
  const { open, name, age } = data;

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
              <input id='name' type="text" defaultValue={name}/>
            </label>
            <label htmlFor="age">
              Возраст режисера
              <input id='age' type="number" defaultValue={age}/>
            </label>
            <button
              className='btn-submit'
              onClick={onSave}
            >Сохранить</button>
          </fieldset>
        </form>
      </div>
    : ''
  )
};