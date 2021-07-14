import React, { useEffect, useState } from "react";

export const EnvVarForm = () => {
  const [clientID, setClientID] = useState(null);
  const [organization, setOrganization] = useState(null);

  const updateClientID = (e) => {
    setClientID(e.target.value);
    localStorage.setItem('tinaClientID', e.target.value);
  };

  const updateOrganization = (e) => {
    setOrganization(e.target.value);
    localStorage.setItem('tinaOrganization', e.target.value);
  };

  useEffect(() => {
    setClientID(localStorage.getItem('tinaClientID') ? localStorage.getItem('tinaClientID') : process.env.NEXT_PUBLIC_TINA_CLIENT_ID);
    setOrganization(localStorage.getItem('tinaOrganization') ? localStorage.getItem('tinaOrganization') : process.env.NEXT_PUBLIC_ORGANIZATION_NAME);
  });

  // conditionally render, need a way to hide
    return (
      <div>
        <h2>Tina Environment Variables</h2>
        <p>Description about needing env vars, where to get them in the dashboard ...NEXT_PUBLIC_TINA_CLIENT_ID & NEXT_PUBLIC_ORGANIZATION_NAME</p>

        <div>
          <label>Tina Client ID</label>
          <input type="text" value={clientID} onChange={updateClientID} size={50}/>
        </div>

        <div>
          <label>Tina Organization</label>
          <input type="text" value={organization} onChange={updateOrganization} size={50}/>
        </div>
      </div>
    )

}