import { withRouter } from "react-router-dom";
import React from "react";

function NoMatch(props) {
  return (
    <div>
      <h3>
        No match for 
        {/* <code>{props.location.pathname}</code> */}
      </h3>
    </div>
  );
}

export default withRouter(NoMatch);
