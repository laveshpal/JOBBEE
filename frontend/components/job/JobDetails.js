import React, {useEffect} from 'react'
import moment from "moment";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';


if (process.env.MAPBOX_ACCESS_TOKEN) {
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
} else {
    console.error("Mapbox access token not provided!");
}


const JobDetails = ({job, candidates}) => {

    useEffect(() => {
        document.documentElement.scrollTo(0, 0); // For modern browsers
        document.body.scrollTo(0, 0); // For older browsers

        const coordinates = job.point.split('(')[1].replace(')', '').split(' ');

        // Create map and set the center point
        const map = new mapboxgl.Map({
            container: 'map-data',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: coordinates,
            zoom: 11,
        });

        // Add Marker on map
        new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
        console.log('Map initialized');

        // Cleanup function
        return () => {
            // Remove the map instance when the component is unmounted
            map.remove();
        };
    }, [job.point]); // Added job.point as a dependency


    return (
        <div className="job-details-wrapper">
            <div className="container container-fluid">
                <div className="row">
                    <div className="col-xl-9 col-lg-8">
                        <div className="p-3 job-details">
                            <div className="p-4 job-header">
                                <h2>{job.title}</h2>
                                <span>
                  <i aria-hidden className="fas fa-building"></i>
                  <span>{job.company}</span>
                </span>
                                <span className="ml-4">
                  <i aria-hidden className="fas fa-map-marker-alt"></i>
                  <span>{job.address}</span>
                </span>

                                <div className="mt-3">
                  <span>
                    <button className="px-4 py-2 btn btn-primary apply-btn">
                      Apply Now
                    </button>
                    <span className="ml-4 text-success">
                      <b>{candidates}</b> candidates has applied to this job.
                    </span>
                  </span>
                                </div>
                            </div>

                            <div className="mt-5 job-description">
                                <h4>Description</h4>
                                <p>{job.description}</p>
                            </div>

                            <div className="job-summary">
                                <h4 className="mt-5 mb-4">Job Summary</h4>
                                <table className="table table-striped">
                                    <tbody>
                                    <tr>
                                        <td>Job Type</td>
                                        <td>:</td>
                                        <td>{job.jobType}</td>
                                    </tr>

                                    <tr>
                                        <td>Job Industry</td>
                                        <td>:</td>
                                        <td>{job.industry}</td>
                                    </tr>

                                    <tr>
                                        <td>Expected Salary</td>
                                        <td>:</td>
                                        <td>₹{job.salary}</td>
                                    </tr>

                                    <tr>
                                        <td>Education</td>
                                        <td>:</td>
                                        <td>{job.education}</td>
                                    </tr>

                                    <tr>
                                        <td>Experience</td>
                                        <td>:</td>
                                        <td>{job.experience}</td>
                                    </tr>

                                    <tr>
                                        <td>Company</td>
                                        <td>:</td>
                                        <td>{job.company}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="job-location">
                                <h4 className="mt-5 mb-4">Job Location</h4>
                                <div id="map-data" style={{height: 520, width: '100%'}}>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-4">
                        <div className="p-3 job-contact-details">
                            <h4 className="my-4">More Details</h4>
                            <hr/>
                            <h5>Email Address:</h5>
                            <p>{job.email}</p>

                            <h5>Job Posted:</h5>
                            <p>{moment.utc(job.createAt).local().startOf('seconds').fromNow()}</p>

                            <h5>Last Date:</h5>
                            <p>{moment(job.lastDate).format("DD-MM-YYYY")}</p>
                        </div>

                        <div className="mt-5 p-0">
                            <div className="alert alert-danger">
                                <h5>Note:</h5>
                                You can no longer apply to this job. This job is expired. Last
                                date to apply for this job was: <b>{moment(job.lastDate).format("DD-MM-YYYY")}</b>
                                <br/> Checkout others job on Jobbee.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JobDetails
