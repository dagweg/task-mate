'use client'


import React, { useState, useEffect } from 'react';

import { db } from '../lib/prisma';
import { Organization } from '@prisma/client';

const AddProjectDropdownButton = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization>();

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => { 
        const result:Organization[] = await fetch('http://localhost:3000/api/organization').then((res)=>res.json()) 
        if(result.length){
            console.log("this is the result",result)
            setOrganizations([...result])
        }
  };

  const handleCreateOrganization = () => {
    // Implement your logic here to handle the create organization action
    // const create  = await db.organization.create()
    console.log('Create new organization');
  };

  return (
    <div>
      <button>{selectedOrganization ? selectedOrganization.name : 'Choose Organization'}</button>
      <div>
        {organizations.length > 0 ? (
          organizations.map((organization:Organization) => (
            <div key={organization.id} onClick={() => setSelectedOrganization(organization)}>
              {organization.name}
            </div>
          ))
        ) : (
          <div>No organization created</div>
        )}
      </div>
      <button onClick={handleCreateOrganization}>Create New Organization</button>
    </div>
  );
};

export default AddProjectDropdownButton;