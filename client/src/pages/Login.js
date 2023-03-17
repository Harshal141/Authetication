import {useState} from 'react';

function App() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()
    if(data.status === 'ok'){
      localStorage.setItem('token', data.user)
      alert('Login successful')
      window.location.href = '/home'
    }else{
      alert(data.error)
    }

	}

  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <label>Email </label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" />
        <br />
        <label>Password </label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" />
        <br />
        <input type="submit" value="Login"></input>
      </form>
    </div>

  );
}

export default App;
