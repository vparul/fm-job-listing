import React, { useEffect, useState } from "react";
import { getJobs } from "../../services/Jobs";
import Chip from "../Chip";

const JobListing = () => {
  const [jobList, setJobList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    return async () => {
      await getJobs().then((response) => {
        setJobList(response);
        setFilteredList(response);
      });
    };
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
    <div className={`mx-44 relative ${filters?.length ? "my-16" : "my-7"}`}>
      {filters?.length ? (
        <div className="bg-white justify-between w-full top-[-93px] py-4 px-9 flex items-center shadow-cyan-500/5 shadow-xl absolute">
          {filters?.map((item) => (
            <Chip item={item} isRemoveEnabled onRemoveClick={removeFilter} />
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="text-cyan-500 font-spartan text-sm font-bold underline"
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
            className={`bg-white m-4 py-6 px-9 flex items-center shadow-cyan-500/5 shadow-xl ${
              featured ? "border-l-4 border-cyan-500 rounded" : ""
            }`}
          >
            <div>
              <img src={logo} alt={company} />
            </div>
            <div className="flex flex-col ml-5 w-3/5">
              <div className="flex font-spartan">
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
              <div className="text-gray-500 text-sm">
                <span className="pr-3">{postedAt}</span>
                <span>•</span>
                <span className="px-3">{contract}</span>
                <span>•</span>
                <span className="px-3">{location}</span>
              </div>
            </div>
            <div className="flex flex-1 justify-end">
              {[role, level, ...(languages || []), ...(tools || [])]?.map(
                (item) => (
                  <Chip
                    item={item}
                    key={item}
                    onClick={() => {
                      setFilterList([...filters, item]);
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
