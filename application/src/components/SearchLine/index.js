import React, {useState} from 'react';
import Input from 'muicss/lib/react/input';

export const SearchLine = ({
  placeholder,
  handleSearch
}) => {
  const [ strSearch, setStrSearch ] = useState('');

  const handleChangeSearch = (e) => {
    setStrSearch(e.target.value)
  };

  const handleChangeEnter = (e) => {
    if (e.charCode === 13) handleSearch(strSearch)
  };

  return (
    <Input
      label={placeholder}
      floatingLabel={true}
      className='search-line'
      onChange={handleChangeSearch}
      onKeyPress={handleChangeEnter}
    />
  )
};
