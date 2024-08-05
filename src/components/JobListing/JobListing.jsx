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
    <div className="mx-12 my-7">
      {jobList.map(({ position, company, newJob, featured, id, logo}) => (
        <div key={id} className="bg-white m-4 p-6">
            <div className="flex">
            <div className="flex">
                <h4>{company}</h4>
                {newJob && <div>New</div>}
                {featured && <div>Featured </div>}
            </div>
            <h4>{position}</h4>
            </div>
            <div>
                <img src={logo} alt={company} />
                </div>
        </div>
      ))}
    </div>
  );
};

export default JobListing;
