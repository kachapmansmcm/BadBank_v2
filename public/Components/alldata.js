function AllData(props) {
  if (props.user == null) {
    return <Redirect to="/" />;
  }
  const ctx = React.useContext(UserContext);
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => props.setActivePage(location.hash));
  React.useEffect(() => getData(), []);
  
  const getData = async () => {
    let userListResponse = await fetch('/api/private/getAll', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.userToken}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    let userList = await userListResponse.json();
    setUsers(userList.data);

  };


  function renderTableData() {
    return users.map((user, i) => {
      const {username, email, accountBalance, isAdmin } = user;
      let convertedBalance = Number(accountBalance).toFixed(2)/100;

      const deleteUser = async (userToDelete) =>{
        const url = "/api/private/deleteUser"
        const response = await fetch(url, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.userToken}`
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
           body: JSON.stringify({"username": userToDelete}) // body data type must match "Content-Type" header
        });
        let deleteResponse = await response.json();
        console.log(deleteResponse);
        setUsers(deleteResponse.data);
      }

      return (
        <tr key={username}>
          <td>{username}</td>
          <td>{email}</td>
          <td>{isAdmin.toString()}</td>
          <td>${convertedBalance}</td>
          <td> <button className="btn btn-danger" onClick={() => deleteUser(username)}>Delete</button></td>
        </tr>
      );
    });
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Admin</th>
          <th scope="col">Balance</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  );
}
