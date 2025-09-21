import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleChange}
        style={{ padding: '0.5rem', width: '100%' }}
      />
    </div>
  );
};

export default SearchBar;
