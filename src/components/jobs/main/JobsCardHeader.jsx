function JobsCardHeader({ job }) {
  return (
    <div className="header">
      <h3 className="text-lg font-semibold text-gray-800">
        <a href={job.advertisementUrl}>{job.advertisement}</a>
      </h3>
      <p className="text-sm text-gray-600">
        <a href={job.advertiserWebsite}>{job.advertiser}</a>
      </p>
    </div>
  );
}

export default JobsCardHeader;
