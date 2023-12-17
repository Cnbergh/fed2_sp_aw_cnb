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
    <div className="text-center my-10 border-y-2 border-stone-700/50">
      <form onSubmit={handleSubmit} className="flex flex-row">
        <input
          className="hover: text-black border-4 border-accent/70 rounded-xl input max-w-xs"
          type="text"
          placeholder="Search listing..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="text-black/60 px-6 py-2 hover:text-black hover:after:content-['↚']" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
