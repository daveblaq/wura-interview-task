import React from 'react'
import { IoSearch } from "react-icons/io5";

const SearchBox = ({handleSearch, query, placeholder}) => {
		return (
      <>
        <div className="my-2 mx-2 rounded-md py-2 px-4 flex bg-blue-50 items-center justify-between">
          <input
            type="text"
            className="py-2 bg-blue-50 px-2 w-full focus:outline-none"
            placeholder={placeholder}
            onChange={handleSearch}
            value={query}
          />
          <IoSearch className="text-lg text-blue-400" size={25} />
        </div>
      </>
    );
}

export default SearchBox
