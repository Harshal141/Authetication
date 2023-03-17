import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()
    
    if(data.status === 'ok'){
      alert('Registration successful')
      navigate('/login')
    }else{
      alert(data.error)
    }

	}

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <label>Username </label>
        <input value={name} onChange={(e)=>setName(e.target.value)}  type="text" name="username" />
        <br />
        <label>Email </label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" />
        <br />
        <label>Password </label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" />
        <br />
        <input type="submit" value="register"></input>
      </form>
    </div>

  );
}

export default App;
