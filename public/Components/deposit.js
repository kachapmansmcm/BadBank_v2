function Deposit(props) {
  if (props.user == null) {
    return <Redirect to="/" />;
  }
  const [status, setStatus] = React.useState("");
  const [depositAmount, setDepositAmount] = React.useState(0);
  const [disableButton, setDisableButton] = React.useState(true);
  //const ctx = React.useContext(UserContext);
  //const index = ctx.users.findIndex((user) => user.name == props.user.name);
  const [balance, setBalance] = React.useState(
    parseFloat(props.user.currentBalance).toFixed(2) / 100
  );
  const user = props.user;
  React.useEffect(() => props.setActivePage(location.hash));

  function validate(field) {
    if (!field) {
      setStatus("Error: must add a valid value");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (field === NaN) {
      setStatus("Error: Must be a number");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (field < 0) {
      setStatus("Error: Must not be negative");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  const handleDeposit = async () => {
    if (!validate(depositAmount, "deposit")) return;
    let newBalance = Number(balance) + Number(depositAmount);
    setBalance(newBalance.toFixed(2));
    let updateBalance = newBalance * 100;

    const url = "/api/private/update"
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.userToken}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
       body: JSON.stringify({"username": props.user.name, "email": null, "password": null, "accountBalance": updateBalance}) // body data type must match "Content-Type" header
    });
    let createResponse = await response.json()
    if(createResponse.success == true){
      user.currentBalance = updateBalance;
      props.setUser(user);
      setStatus("Success: Your new balance is: $" + newBalance.toFixed(2));
    }
    setDepositAmount(0);
    setDisableButton(true);
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      body={
        <>
          Your Current Balance is:
          <br />${balance}
          <br />
          Enter the Amount of your Deposit
          <br />
          <input
            input="True"
            type="number"
            min="0.01"
            step="0.01"
            className="form-control"
            id="depositAmount"
            placeholder="Enter Deposit Amount"
            value={Number(depositAmount).toFixed(2)}
            onChange={(e) => {
              setDepositAmount(e.currentTarget.value);
              setDisableButton(false);
            }}
          />
          <br />
          <button
            type="submit"
            className="btn btn-light"
            disabled={disableButton}
            onClick={handleDeposit}
          >
            Deposit Amount
          </button>
        </>
      }
    />
  );
}
