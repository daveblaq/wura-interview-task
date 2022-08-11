import React, { useEffect, useState } from "react";
import { RiSoundModuleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Home/Filter";
import SearchBox from "../components/Home/SearchBox";
import Loader from "../components/Home/Loader";
import {
  clearState,
  fetchData,
  userSelector,
} from "../components/redux/slices/dataReducer";

const HomePage = () => {
  const [filterValue, setFilterValue] = useState("Films");
  const [isLoading, setIsLoading] = useState(true);


const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  

  const filters = [
    "Films",
    "People",
    "Planets",
    "Species",
    "Starships",
    "Vehicles",
  ];
  const [headers, setHeaders] = useState([]);

  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const { feeds } = useSelector(userSelector);

  useEffect(() => {
    dispatch(fetchData(filterValue.toLowerCase()));
    setTimeout(() => setIsLoading(false), 3000);
  }, [dispatch, filterValue]);

  useEffect(() => {
    if (feeds) {
      setHeaders([]);
      Object.entries(feeds.payload.results[0]).forEach(([key]) => {
        setHeaders((prevState) => [...prevState, key]);
      });
    }
  }, [feeds]);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
  }, [isError, dispatch]);



  const search = (e) => {
    let searchField;
    setQuery(e.target.value);
    if (
      filterValue.toLowerCase() === "people" ||
      filterValue.toLowerCase() === "planets" ||
      filterValue.toLowerCase() === "species"
    ) {
       
       searchField = "name";
    }

    else if (
      filterValue.toLowerCase() === "films"
    ) {
      searchField = "title";
    }
   
  
    const searchedField = feeds.payload.results.filter(
      (data) => {
         if (searchField === "name" || searchField === "title") {
           return data[searchField]
             .toLowerCase()
             .includes(e.target.value.toLowerCase());
         }
         else {
             return (
               data.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
               data.model.toLowerCase().includes(e.target.value.toLowerCase())
             );
        }
       
      }
     
    );

   
     setFilteredData(searchedField);

  }
  

   const handleClick = () => {
     alert('e work');
  };

  const TableHead = () => {
    return (
      <thead className="bg-blue-400 border-b-2 border-gray-200 hover:w-full">
        <tr>
          {headers.map((header) => {
            return (
              <th
                className="p-3 text-sm font-semibold text-white tracking-wide text-left capitalize"
                key={header}
              >
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return (
      <div className="mx-2 my-2 max-w-full w-full overflow-auto">
        <table className="table-auto w-full hover:w-full ">
          <TableHead />
          <tbody className="divide-y divide-blue-200 divide-dashed">
            {query.length > 0
              ? filteredData.map((feed, index) => (
                  <tr
                    className="bg-white even:bg-gray-50 max-w-full"
                    key={index}
                  >
                    {headers.map((fd, i) => (
                      <td
                        key={fd + i}
                        className="p-3 text-sm max-w-xs whitespace-nowrap overflow-auto text-gray-700"
                      >
                        {Array.isArray(feed[fd])
                          ? feed[fd].map((value, i) => {
                              if (value.includes("https://")) {
                                return (
                                  <span key={value}>
                                    <a
                                      href={value}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {value}
                                    </a>
                                    <span>;&nbsp;</span>
                                  </span>
                                );
                              }
                              return (
                                <span key={value}>
                                  <span>{value};&nbsp;</span>
                                </span>
                              );
                            })
                          : feed[fd]}
                      </td>
                    ))}
                  </tr>
                ))
              : feeds &&
                feeds.payload.results.map((feed, index) => (
                  <tr
                    className="bg-white even:bg-gray-50 max-w-full"
                    key={index}
                  >
                    {headers.map((fd, i) => (
                      <td
                        key={fd + i}
                        className="p-3 text-sm max-w-xs whitespace-nowrap overflow-auto text-gray-700"
                      >
                        {Array.isArray(feed[fd])
                          ? feed[fd].map((value, i) => {
                              if (value.includes("https://")) {
                                return (
                                  <span key={value}>
                                    <a
                                      href={value}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {value}
                                    </a>
                                    <span>;&nbsp;</span>
                                  </span>
                                );
                              }
                              return (
                                <span key={value}>
                                  <span>{value};&nbsp;</span>
                                </span>
                              );
                            })
                          : feed[fd]}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    );
  }

  const Pagination = () => {
    return (
      <div className="my-8 flex items-end justify-end pr-3">
        <div className={`px-5 py-2 bg-blue-400`} onClick={handleClick}>
          <h2 className="text-sm text-wh"> Prev </h2>
        </div>
        <div className={`px-5 py-2 bg-gray-100`} onClick={handleClick}>
          <h2 className="text-sm text-black"> Next </h2>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="p-1 min-h-screen w-full py-5 grid items-center justify-items-center">
        <div
          className="overflow-hidden w-full rounded-xl shadow"
          style={{ width: "90%" }}
        >
          <SearchBox handleSearch={search} query={query} />
          <div className="flex items-center justify-between px-3 py-4">
            <h1 className="text-black-500 text-xl">All {filterValue}</h1>
            <div className="px-2 py-2 bg-blue-50 rounded-md flex">
              <RiSoundModuleLine size={18} className="text-sm text-blue-400" />

              <select
                className="bg-blue-50 outline-none"
                onChange={(e) => {
                  setFilterValue(e.target.value);
                }}
              >
                <option disabled>Filter By</option>
                {filters.map((filter, index) => (
                  <Filter item={filter} key={index} />
                ))}
              </select>
            </div>
          </div>
          {isLoading ? <Loader /> : <TableBody />}

          <Pagination />
        </div>
      </div>
    </>
  );
};

export default HomePage;
