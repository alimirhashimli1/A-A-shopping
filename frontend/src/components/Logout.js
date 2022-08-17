import React from "react";
import Landing from "../views/Landing";
const Logout = props => {
    return (
      <div>
      {props.logout}
       <Landing />
      </div>
    );
}

export default Logout;