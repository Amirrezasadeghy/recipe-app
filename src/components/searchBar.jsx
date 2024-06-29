import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Logo from '../assets/vectors/logo';


import React from 'react'

const SearchBar = ({searchQuery, setSearchQuery, handleSearch}) => {
  return (

        <div className="flex flex-col items-center justify-center">
            <div className=' flex flex-col justify-center items-center'>
                <Logo />
                <label htmlFor="recipe" className="text-lg font-medium leading-6 text-gray-900 mt-10">
                    What would you like to eat today?
                </label>
                <div className="flex flex-row rounded-md items-center mt-10">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        name="recipe"
                        id="recipe"
                        className="w-50 h-14 rounded-full border-0 py-1.5 pl-7 pr-20 bg-amber-500 text-white shadow-inner-custom placeholder-white placeholder-opacity-50 placeholder-text-sm sm:text-sm sm:leading-6 border-solid border-x-2 border-y-2 border-black"
                        placeholder="Search recipes"
                    />
                    <button 
                    onClick={handleSearch}
                    className="group flex ml-5 items-center justify-center w-14 h-14 bg-white text-white rounded-3xl border-solid border-x-2 border-y-2 border-black transition-all hover:bg-amber-500 focus:outline-none shadow-xl"
                    >
                        <FontAwesomeIcon icon={faSearch} className="text-lg text-amber-500 group-hover:text-white" />
                    </button>
                </div>
            </div>
        </div>

  );
}

export default SearchBar;