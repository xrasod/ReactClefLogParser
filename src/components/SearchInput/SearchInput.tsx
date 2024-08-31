import { useDebounce } from 'primereact/hooks';
import { InputText } from 'primereact/inputtext';
import { useEffect } from 'react';

export interface SearchInputProps {
  setSearchTerm: (val: string) => string;
  searchTerm: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ setSearchTerm, searchTerm = '' }) => {
  const [search, debouncedSearchTerm, setSearch] = useDebounce<string>(searchTerm, 300);
  

 useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }
  return (
    <div className="p-inputgroup">
      <InputText type="text" className="p-inputtext-lg" placeholder="Large" value={search} onChange={handleChange}/>
      <button className="p-button p-component">
        <span className="p-button-icon p-c">pi pi-search</span>
      </button>
    </div>
  )
}

export default SearchInput;