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
    // <div className="App">
    //   <h1>Login</h1>
    //   <form onSubmit={loginUser}>
    //     <label>Email </label>
    //     <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" />
    //     <br />
    //     <label>Password </label>
    //     <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" />
    //     <br />
    //     <input type="submit" value="Login"></input>
    //   </form>
    // </div>
    <div className="login-container container mt-5" style={{maxWidth:'600px'}}>
    <h1 className="mb-2">Login User</h1>

    <form onSubmit={loginUser}>
        <div className="mb-3">
            <label for="email" className="form-label">Email address</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} name="password" type="password" className="form-control" id="exampleInputPassword1" required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <div id="emailHelp" className="form-text mt-3">Don't have an account <a href = '/register' >Register</a> </div>

    </form>
    </div>

  );
}

export default App;
