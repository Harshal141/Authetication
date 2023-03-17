import React from 'react';
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Home = () => {

    const history = useNavigate();

    async function populate() {
        const req = await fetch('http://localhost:1337/api/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
        })
        const data = await req.json();
        console.log(data)
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const user = jwtDecode(token)
            if(!user){
                localStorage.removeItem('token');
                history.replace('/login')
            }else{
                populate();
            }
        }
    }, []);

    return (
        <div>
        <h1>Home</h1>
        </div>
    );
}


export default Home;
        