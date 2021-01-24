import React from 'react';
import '../dashboard/dashboard.css'
import { getUser, removeUserSession } from '../../Utils/Common';
 
function Dashboard(props) {
  //const user = getUser();
  const user = {name: "Shiro"}
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    const { history } = props;
    console.log("--> " + history)
    history.push("/login")
    //props.history.push('/login');
  }
 
  return (
    <div className="dashboard-content">
      Welcome {user.name}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}
 
export default Dashboard;