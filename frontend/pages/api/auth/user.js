import axios from "axios";
import cookie from 'cookie'
export default async (req, res) => {

    if (req.method === 'POST') {
        const {username, password} = req.body;

        try {

            const response = await axios.post(`${process.env.API_URL}/api/token/`, {
                username,
                password
            }, {headers: {'Content-Type': 'application/json',},})



        } catch (error) {
            console.log(error.response)
            res.status(error.response.status).json({error: 'Something went wrong while retrieving user' ,})

        }
    }
};