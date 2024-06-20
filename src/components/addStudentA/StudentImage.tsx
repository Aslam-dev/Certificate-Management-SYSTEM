import React from 'react';

const StudentImage = ({ photo, firstName, lastName }) => {
  return (
    <div className="relative group w-24 h-24">
      <img
        src={photo || '/ds.jpg'}
        alt={`${firstName} ${lastName}`}
        className="rounded-lg w-full h-full object-cover mb-2"
      />
      <div className="hidden group-hover:block absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
        <img
          src={photo || '/ds.jpg'}
          alt={`${firstName} ${lastName}`}
          className="rounded-lg w-48 h-auto"
        />
      </div>
    </div>
  );
};

export default StudentImage;
