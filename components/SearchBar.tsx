import { useState, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void; // Type for onSearch prop
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => { // Type for event parameter
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
        <button className="bg-black text-white rounded-full px-3 py-2 hover:bg-black/60" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
