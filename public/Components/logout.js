const Redirect = ReactRouterDOM.Redirect;


function Logout(props){
    const [shouldRedirect, setShouldRedirect] = React.useState(false);
    const [show, setShow] = React.useState(true);
    React.useEffect(() => props.setActivePage(location.hash));
    const handleLogout = () => {
        props.setUser(null);
        props.setUserToken(null);
        setShow(false);
        setTimeout(function() {
          setShouldRedirect(true);
        }, 1000);
    } 

    if(shouldRedirect) return <Redirect to="/"/>

    return (
      <Card
        bgcolor="primary"
        header="Log Out"
        body={show ? (  
                <div>
                  <button type="submit" className="btn btn-light" onClick={handleLogout}>Log Out</button>
                </div>
        ):(           
                <div>
                  <h5>Successful Logout</h5>
                </div>              
        )
        }
        />
    )

  }