import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";

export default function Tables() {
  return (
    <>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full px-4 mb-12'>
          <CardTable />
        </div>
      </div>
    </>
  );
}

