import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { setUserSession } from '../../Utils/Common';
import './login.css'
function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const MySwal = withReactContent(Swal)
  // handle button click of login form
  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    console.log(username.value + password.value)
    try {
    let response = await axios.post('http://127.0.0.1:3000/members/login', { 
      
        username: username.value, 
        password: password.value,
      
      
      
    }
    );
      global.isLogin = true;
      setLoading(false);
      setUserSession("loginSuccess", response.data.user);
      setError("Dang nhap thanh cong.");
      console.log(global.isLogin);
      MySwal.fire({
        title: <p>Login Successfully</p>,
      }).then(function(isConfirm) {
        if (isConfirm) {
        window.location = "http://localhost:3001/list"
        }}
      )
    }
    catch(error ) {
      setLoading(false);
      console.log(error);
      if (error.response && error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    };
  }
  
  return (
    <div>
      <ProvideAuth>
      <Router>
        <div id="choose-login">
          <AuthButton />

          <ul>
            <li>
              <Link to="/public">Register</Link>
            </li>
            <li>
              <Link to="/protected">Login</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/public">
              <PublicPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/protected">
              <ProtectedPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
    <div id="login-form" className="login-form" style={{display: "none"}}>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = cb => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PublicPage() {
  document.getElementById("login-form").style.display = "none";
  return <h3>Public</h3>;
}

function ProtectedPage() {
  //document.getElementById("login-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  return <h3>Protected</h3>;
}

function LoginPage() {
  document.getElementById("login-form").style.display = "block";
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    
    auth.signin(() => {
      history.replace(from);
    });
  };
  
  return (
    <div>
      <script>
      
      </script>
      <p>You must log in to view the page at {from.pathname}</p>
      {/* <button onClick={login}>Log in</button> */}
    </div>
  );
}


export default Login;