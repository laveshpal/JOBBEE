import React from 'react'
import Layout from "../../components/layout/Layout";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import JobDetails from "../../components/job/JobDetails";
import NotFound from "../../components/layout/NotFound";

const JobDetailPage = ({job, candidates, error}) => {


    if (error?.includes('Not found')) return <NotFound/>

    return (
        <Layout title={job.title}>
            <JobDetails job={job} candidates={candidates}/>
        </Layout>
    )
}
export default JobDetailPage


export async function getServerSideProps({params}) {

    try {
        const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}/`)
        const job = res.data.job;
        const candidates = res.data.candidates;

        return {
            props: {
                job,
                candidates,
            }

        };

    } catch (error) {
        return {
            props: {
                error: error.response.data.detail
            }
        }

    }


}