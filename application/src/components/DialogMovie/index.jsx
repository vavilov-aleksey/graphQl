import React from 'react';

export const DialogMovie = ({open, onClose}) => {
  return (
    open ?
      <div className="dialog">
        <button
          className='btn-close'
          onClick={onClose}
        >Закрыть</button>
        <form action="#">
          <fieldset>
            <legend>Информация о фильме</legend>
            <label htmlFor="name">
              Название фильма
              <input id='name' type="text"/>
            </label>
            <label htmlFor="genre">
              Жанр фильма
              <input id='genre' type="text"/>
            </label>
            <label htmlFor="rate">
              Рейтинг фильма
              <input id='rate' type="number"/>
            </label>
            <label htmlFor="director">
              Режисер
              <select name="Режисер" id="director">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </select>
            </label>
            <label htmlFor="watched" className='label-row'>
              <input type="checkbox" id='watched'/>
              Фильм просмотрен?
            </label>
            <button type='submit' className='btn-submit'>Сохранить</button>
          </fieldset>
        </form>
      </div>
    : ''
  )
};