'use client';
import React from 'react';

import AddStudent from 'components/addStudentA';
import AddStudents from 'components/addStudent';

const CreateStudentPage: React.FC = () => {
  const handleCreateCourse = (courseData: any) => {
    // Implement the logic to handle course creation
    console.log('Creating course:', courseData);
    // You can add API calls or any other logic here to create the course
  };

  return (
    <div className="flex flex-col gap-5 lg:gap-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="col-span-5 lg:col-span-12">
          <AddStudent />
          <AddStudents />
        </div>
      </div>
    </div>
  );
};

export default CreateStudentPage;
