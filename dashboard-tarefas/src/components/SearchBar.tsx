import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Buscar Tarefas"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="lg:mb-4 mb-3 p-2 rounded-lg bg-zinc-300 lg:w-11/12 w-full lg:h-14 h-10 text-zinc-600 border-2 border-zinc-700 lg:mt-5"
    />
  );
};

export default SearchBar;
