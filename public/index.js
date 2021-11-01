

function Spa() {
  const [user, setUser] = React.useState(null);
  const [activePage, setActivePage] = React.useState('#/');
  const [userToken, setUserToken] = React.useState('token not set');
  return (
    <HashRouter>
      <NavBar user={user} activePage={activePage}/>
      <UserContext.Provider value={user}>
          <div className="container d-flex justify-content-center" style={{padding: "20px"}}>
            <Route path="/" exact render={(props)=>(<Home {...props} userToken={userToken} user={user} setActivePage={setActivePage}/>) } />
            <Route path="/CreateAccount/" exact render={(props)=>(<CreateAccount {...props} userToken={userToken} setUserToken={setUserToken} setActivePage={setActivePage}/>)}/>
            <Route path="/login/" exact render={(props)=>(<Login {...props} userToken={userToken} setUserToken={setUserToken} setUser={setUser} setActivePage={setActivePage}/>)} />
            <Route path="/deposit/" exact render={(props)=>(<Deposit {...props} userToken={userToken} user={user} setUser={setUser} setActivePage={setActivePage}/>)} />
            <Route path="/withdraw/" exact render={(props)=>(<Withdraw {...props} userToken={userToken}  user={user} setUser={setUser} setActivePage={setActivePage}/>)} />
            <Route path="/alldata/" exact render={(props)=>(<AllData {...props} userToken={userToken}  user={user} setActivePage={setActivePage}/>)} />
            <Route path="/logout/" exact render={(props)=>(<Logout {...props} userToken={userToken} setUserToken={setUserToken} user={user} setUser={setUser} setActivePage={setActivePage}/>)} />
          </div>     
      </UserContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
