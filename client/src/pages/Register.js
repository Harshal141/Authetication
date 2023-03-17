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
    // <div className="App">
    //   <h1>Register</h1>
    //   <form onSubmit={registerUser}>
    //     <label>Username </label>
    //     <input value={name} onChange={(e)=>setName(e.target.value)}  type="text" name="username" />
    //     <br />
    //     <label>Email </label>
    //     <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" />
    //     <br />
    //     <label>Password </label>
    //     <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" />
    //     <br />
    //     <input type="submit" value="register"></input>
    //   </form>
    // </div>

    <div className="register-container container mt-5">
        <h1 className="mb-2">Register User</h1>

        <form onSubmit={registerUser}>
            <div className="mb-3">
                <label for="name" className="form-label">Enter Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" name ="name" />
            </div>
            <div className="mb-3">
                <label for="email" className="form-label">Email address</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} name="password" type="password" className="form-control" id="exampleInputPassword1" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <div id="emailHelp" className="form-text mt-3">Already have an account <a href = '/login' >Login</a> </div>
        </form>
    </div>
    

  );
}

export default App;
