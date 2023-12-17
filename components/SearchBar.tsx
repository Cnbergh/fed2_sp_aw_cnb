import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="text-center my-20">
      <form onSubmit={handleSubmit}>
        <input 
          className="text-black border-2 border-black rounded-full px-3 py-2" 
          type="text" 
          placeholder="Search listing..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="bg-black text-white rounded-full px-3 py-2 hover:bg-black/60" 
          type="submit">
          Search
        </button>
      </form>
    </div>
  );
}