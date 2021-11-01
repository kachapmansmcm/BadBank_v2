//this is terrible
function NavBar(props) {
  let isActiveHome = "";
  let isActiveCreate = "";
  let isActiveDeposit = "";
  let isActiveWithdraw = "";
  let isActiveAllData = "";
  let isActiveLogin = "";
  let isActiveLogout = "";
  
  switch (props.activePage) {
    case "#/":
      isActiveHome = "nav-link active";
      isActiveCreate = "nav-link";
      isActiveDeposit = "nav-link";
      isActiveWithdraw = "nav-link";
      isActiveAllData = "nav-link";
      isActiveLogin = "nav-link";
      isActiveLogout = "nav-link";
      break;
    case "#/CreateAccount/":
      isActiveHome = "nav-link";
      isActiveCreate = "nav-link active";
      isActiveDeposit = "nav-link";
      isActiveWithdraw = "nav-link";
      isActiveAllData = "nav-link";
      isActiveLogin = "nav-link";
      isActiveLogout = "nav-link";
      break;
    case "#/deposit/":
      isActiveHome = "nav-link";
      isActiveCreate = "nav-link";
      isActiveDeposit = "nav-link active";
      isActiveWithdraw = "nav-link";
      isActiveAllData = "nav-link";
      isActiveLogin = "nav-link";
      isActiveLogout = "nav-link";
      break;
    case "#/withdraw/":
      isActiveHome = "nav-link";
      isActiveCreate = "nav-link";
      isActiveDeposit = "nav-link";
      isActiveWithdraw = "nav-link active";
      isActiveAllData = "nav-link";
      isActiveLogin = "nav-link";
      isActiveLogout = "nav-link";
      break;
    case "#/alldata/":
      isActiveHome = "nav-link";
      isActiveCreate = "nav-link";
      isActiveDeposit = "nav-link";
      isActiveWithdraw = "nav-link";
      isActiveAllData = "nav-link active";
      isActiveLogin = "nav-link";
      isActiveLogout = "nav-link";
      break;
    case "#/login/":
      isActiveHome = "nav-link";
      isActiveCreate = "nav-link";
      isActiveDeposit = "nav-link";
      isActiveWithdraw = "nav-link";
      isActiveAllData = "nav-link";
      isActiveLogin = "nav-link active";
      isActiveLogout = "nav-link";
      break;
      case "#/logout/":
        isActiveHome = "nav-link";
        isActiveCreate = "nav-link";
        isActiveDeposit = "nav-link";
        isActiveWithdraw = "nav-link";
        isActiveAllData = "nav-link";
        isActiveLogin = "nav-link active";
        isActiveLogout = "nav-link active";
        break;
  }

  if (props.user != null) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
          <a className="navbar-brand" href="#">
            BadBank
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className={isActiveHome}
                  href="#/"
                  title="Return to Home Page"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={isActiveCreate}
                  href="#/CreateAccount/"
                  title="Create a new account"
                >
                  Create Account
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={isActiveDeposit}
                  href="#/deposit/"
                  title="Deposit new funds"
                >
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={isActiveWithdraw}
                  href="#/withdraw/"
                  title="Withdraw funds"
                >
                  Withdraw
                </a>
              </li>
              {props.user.isAdmin ?
              <li className="nav-item">
                <a
                  className={isActiveAllData}
                  href="#/alldata/"
                  title="Show all user's data"
                >
                  AllData
                </a>
              </li>
              : null}
              <li className="nav-item">
                <a
                  className={isActiveLogin}
                  href="#/logout/"
                  title="Logout"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
          <a className="navbar-brand" href="#">
            BadBank
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className={isActiveHome}
                  href="#/"
                  title="Return to Home Page"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={isActiveCreate}
                  href="#/CreateAccount/"
                  title="Create a new account"
                >
                  Create Account
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={isActiveLogin}
                  href="#/login/"
                  title="Switch User"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}
