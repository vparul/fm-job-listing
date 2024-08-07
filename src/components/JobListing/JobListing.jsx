import React, { useEffect, useState } from "react";
import { getJobs } from "../../services/Jobs";
import Chip from "../Chip";

const JobListing = () => {
  const [jobList, setJobList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
     getJobs().then((response) => {
        setJobList(response);
        setFilteredList(response);
      });
  }, []);

  useEffect(() => {
    filterList();
  }, [filters]);

  const setFilterList = (list) => {
    setFilters(list);
  };

  const filterList = () => {
    if (filters?.length) {
      const list = jobList.filter(({ role, level, languages, tools }) => {
        const combinedItems = [role, level, ...languages, ...tools];
        return combinedItems.some((item) => filters.includes(item));
      });
      setFilteredList(list);
    } else {
      setFilteredList(jobList);
    }
  };

  const removeFilter = (key) => {
    setFilterList(filters?.filter((item) => item !== key));
  };

  const clearAll = () => {
    setFilterList([]);
  };

  return (
    <div
      className={`mx-3 md:mx-10 lg:mx-44 relative ${filters?.length ? "my-16" : "mt-7"}`}
    >
      {filters?.length ? (
        <div className="bg-white justify-between w-full top-[-93px] py-4 px-9 flex items-center shadow-cyan-500/5 shadow-xl absolute">
          <div className="flex flex-wrap">
          {filters?.map((item) => (
            <Chip key={item} item={item} isRemoveEnabled onRemoveClick={removeFilter} />
          ))}
          </div>
          <button
            type="button"
            onClick={clearAll}
            className="text-gray-500 font-spartan text-sm font-bold hover:underline hover:text-cyan-500"
          >
            Clear{" "}
          </button>
        </div>
      ) : null}
      {filteredList.map(
        ({
          position,
          company,
          newJob,
          featured,
          id,
          logo,
          postedAt,
          contract,
          location,
          languages,
          tools,
          role,
          level,
        }) => (
          <div
            key={id}
            className={`bg-white flex-col md:flex-row relative my-14 last:mb-0 md:m-4 py-6 px-3 md:px-9 flex md:items-center shadow-cyan-500/5 shadow-xl ${
              featured ? "border-l-4 border-cyan-500 rounded" : ""
            }`}
          >
            <img
              src={logo}
              alt={company}
              className="absolute top-[-20px] md:mt-5 md:relative md:w-24 md:h-24 w-12 h-12"
            />
            <div className="flex flex-col ml-3 md:ml-5 w-full md:w-2/5">
              <div className="flex font-spartan md:m-0 mt-5">
                <h4 className="text-cyan-500 font-bold mr-3">{company}</h4>
                {newJob && (
                  <span className="text-white font-spartan bg-cyan-500 rounded-2xl mr-2 uppercase px-2 py-1 text-xs">
                    New!
                  </span>
                )}
                {featured && (
                  <div className="text-white bg-cyan-900 rounded-2xl uppercase px-2 py-1 text-xs">
                    Featured
                  </div>
                )}
              </div>
              <h4 className="text-cyan-900 font-bold my-2 cursor-pointer font-lg hover:text-cyan-500">
                {position}
              </h4>
              <div className="text-gray-500 text-sm mb-5">
                <span className="pr-3">{postedAt}</span>
                <span>•</span>
                <span className="px-3">{contract}</span>
                <span>•</span>
                <span className="px-3">{location}</span>
              </div>
            </div>
            <div className="flex flex-1 flex-wrap justify-start md:justify-end pt-5 ml-5 border-t-[1px] md:border-0 border-gray-400 md:m-0">
              {[role, level, ...(languages || []), ...(tools || [])]?.map(
                (item) => (
                  <Chip
                    item={item}
                    key={item}
                    onClick={() => {
                      if (!filters?.includes(item)) setFilterList([...filters, item]);
                    }}
                  />
                )
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default JobListing;
