function Login(props){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [shouldRedirect, setShouldRedirect] = React.useState(false);
  const ctx = React.useContext(UserContext);
  React.useEffect(() => props.setActivePage(location.hash));

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }



  const handleLogin = async () => {
    if (!validate(name,     'name'))     return;
    if (!validate(password, 'password')) return;

    const url = "/api/auth/login"
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
       body: JSON.stringify({"username": name, "password": password}) // body data type must match "Content-Type" header
    });
    let tokenResponse = await response.json()
    
    let userResponse = await fetch('/api/auth/getUserInfo', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenResponse.token}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    let authenticatedUser = await userResponse.json();

    if (!authenticatedUser.username) {
      setError('Bad Username or Password');
      clearForm();
    }
    else {
      let currentUser = new User(authenticatedUser.username, authenticatedUser.email, authenticatedUser.accountBalance, authenticatedUser.isAdmin);
      let newToken = tokenResponse.token;
      props.setUser(currentUser);
      props.setUserToken(newToken);
      setShow(false);
      setTimeout(function() {
        setShouldRedirect(true);
      }, 1000);
    }
  }    

  function clearForm(){
    setName('');
    setPassword('');    
    setShow(true);
  }

  if(shouldRedirect) return <Redirect to="/"/>
  
  return (
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={show ? (  
              <div>
                <h3 style={{color: 'red'}}> {error} </h3>
                Name<br/>
                <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
                </div>
            ):(              
              <div>
                <h5>Success</h5>
              </div>
            )}
    />
  )
}