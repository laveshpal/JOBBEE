
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from "../components/layout/Layout";
import Home from "../components/Home";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Index({data}) {
    // console.log(data)
    return (
        <Layout>
            <Home data={data}/>
        </Layout>

    )
}

export async function getServerSideProps({query}) {

    const jobType = query.jobType || "";
    const education = query.education || "";
    const experience = query.experience || "";
    const keyword = query.keyword || "";
    const location = query.location || "";
    const page = query.page || 1;

    let min_salary = ''
    let max_salary = ''

    if(query.salary){
        const [min, max] = query.salary.split('-');
        min_salary = min;
        max_salary = max
    }


    const queryStr = `keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}&education=${education}&experience=${experience}&min_salary=${min_salary}&max_salary=${max_salary}`;

    const res = await axios.get(`${process.env.API_URL}/api/jobs?${queryStr}`);
    const data = res.data;

    return {
        props: {
            data,
        },
    }
}