import React, { useState, useEffect } from "react";
// import "./Challenges.css";

import queryString from "query-string";

const Challenges = ({ location }: any) => {
  const { code } = queryString.parse(location.search);
  const [credential, setcredential] = useState("none");

  useEffect(() => {
    fetch(`http://localhost:3001/challenges?code=${code}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
    .then(res => res.json())
    .then(res => setcredential(JSON.stringify(res)))
  }, [code]);

  return (
    <div className="Credential-body">
      <h3>Your credential</h3>
      <h5 className="Content">{credential}</h5>
    </div>
  );
};

export default Credential;