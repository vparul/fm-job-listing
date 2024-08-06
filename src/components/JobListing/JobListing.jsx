import React, { useEffect, useState } from "react";
import { getJobs } from "../../services/Jobs";

const JobListing = () => {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    return async () => {
      await getJobs().then((response) => setJobList(response));
    };
  }, []);

  return (
    <div className="mx-44 my-7">
      {jobList.map(
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
              <div className="flex">
                <h4 className="text-cyan-500 font-bold mr-3">{company}</h4>
                {newJob && (
                  <span className="text-white bg-cyan-500 rounded-2xl mr-2 uppercase px-2 py-1 text-xs">
                    New!
                  </span>
                )}
                {featured && (
                  <div className="text-white bg-cyan-900 rounded-2xl uppercase px-2 py-1 text-xs">
                    Featured{" "}
                  </div>
                )}
              </div>
              <h4 className="text-cyan-900 font-bold my-2 font-lg">
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
            <div className="flex flex-1 justify-between">
              {[role, level, ...languages, ...tools]?.map((item) => (
                <div
                  key={item}
                  className="bg-cyan-100 text-cyan-500 rounded text-xs px-2 py-1 font-bold"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default JobListing;
