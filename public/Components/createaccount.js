function CreateAccount(props){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [disableButton, setDisableButton] = React.useState(true);
  //const ctx = React.useContext(UserContext);  
  React.useEffect(() => props.setActivePage(location.hash));

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label + ' cannot be blank');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (label == "password") {
        if(field.length <  8) {
        setStatus('Error: Password must be at least 8 Characters');
        setTimeout(() => setStatus(''),3000);
        return false;
        }
      }
      return true;
  }

  const handleCreate = async () =>{

    if (!validate(name,     'name'))     return;

    if (!validate(email,    'email'))    return;

    if (!validate(password, 'password')) return;

    //ctx.users.push(user);
    const url = "/api/auth/register"
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
       body: JSON.stringify({"username": name, "email": email, "password": password}) // body data type must match "Content-Type" header
    });
    let createResponse = await response.json()

    //props.setUserList(ctx.users);
    if(createResponse.success == true){
      setShow(false);
    } else {
      setStatus(createResponse.error);
      setTimeout(() => setStatus(''),3000);
    }
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
    setDisableButton(true);
  }

  function nameSubmit(e){
    if(e.currentTarget.value == '') {
      setDisableButton(true);
      setName(e.currentTarget.value);
    } else {
      setName(e.currentTarget.value);
      setDisableButton(false);
    }
  }

  function emailSubmit(e){
    if(e.currentTarget.value == '') {
      setDisableButton(false);
      setEmail(e.currentTarget.value);
    } else {
      setEmail(e.currentTarget.value);
      setDisableButton(false);
    }
  }

  function passwordSubmit(e){
    if(e.currentTarget.value == '') {
      setDisableButton(true);
      setPassword(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
      setDisableButton(false);
    }
  }


  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => nameSubmit(e)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => emailSubmit(e)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => passwordSubmit(e)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate} disabled={disableButton}>Create Account</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>

            )}
    />
  )
}