import AsyncSelect from 'react-select/async';
import debounce from 'debounce-promise';

const SearchInput = ({ placeholder, loadOptions, defaultOptions = true, cacheOptions = true, onSelect }) => {
  return (
    <AsyncSelect
      loadOptions={debounce((inputValue, callback) => loadOptions(inputValue, callback), 700)}
      cacheOptions={cacheOptions}
      placeholder={placeholder}
      onChange={onSelect}
      loadingMessage={() => {
        return 'Cargando...';
      }}
      isClearable
    />
  );
};

export default SearchInput;