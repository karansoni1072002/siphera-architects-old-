import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

const AdminLoginPage = () => {
  const navigateTo = useNavigate();
  const [user, setUser] = useState({
    username: "", password: ""
  });

  let fieldname, fieldvalue;
  const handleInputs = (e) => {
    fieldname = e.target.name;
    fieldvalue = e.target.value;

    setUser({ ...user, [fieldname]: fieldvalue });
  }

  const PostData = async (e) => {
    e.preventDefault();

    const { username, password } = user;
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, password
      })
    });
    const data = await res.json()
    if (data.status === 422 || !data) {
      window.alert("Invalid Credentials")
    } else {
      window.alert("Login Succesful")

      navigateTo("/admin")
    }
  }


  return (
    <div className="form-group">

      <form method='POST' className='container'>
        <h1 className=''>Login</h1>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" name='username' value={user.username} onChange={handleInputs} id="floatingInput" placeholder="Username" />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" name='password' value={user.password} onChange={handleInputs} id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="submit" onClick={PostData} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default AdminLoginPage