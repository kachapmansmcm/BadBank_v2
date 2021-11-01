const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const Redirect = ReactRouterDOM.Redirect;
const UserContext = React.createContext(null);
const CurrentPage = React.createContext([location.hash]);


function User(name, email, currentBalance, isAdmin) {
  this.name = name;
  this.email = email;
  this.currentBalance = currentBalance;
  this.isAdmin = isAdmin;
}

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card shadow-lg mb-5 bg-white rounded";
  }

  return (
    <div className={classes()} style={{ maxWidth: "28rem", minWidth: "28rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}


