'use client';
import React from 'react';
import Banner from 'components/admin/profile/Banner';
import General from 'components/admin/profile/General';
import Notification from 'components/admin/profile/Notification';
import Project from 'components/admin/profile/Project';
import Storage from 'components/admin/profile/Storage';
import Upload from 'components/admin/profile/Upload';
import StudentForm from 'components/studentForm';
import CourseForm from 'components/courseForm';

const CreateCoursePage: React.FC = () => {
  const handleCreateCourse = (courseData: any) => {
    // Implement the logic to handle course creation
    console.log('Creating course:', courseData);
    // You can add API calls or any other logic here to create the course
  };

  return (
    <div className="flex flex-col gap-5 lg:gap-5">
      <div className="w-full mt-3 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="col-span-4 lg:col-span-4">
          <Banner />
        </div>
        <div className="col-span-3 lg:col-span-3">
          <Storage />
        </div>
        <div className="col-span-5 lg:col-span-5">
          <Upload />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="col-span-5 lg:col-span-4">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-5">
          <General />
        </div>
        <div className="col-span-5 lg:col-span-3">
          <Notification />
        </div>
        <div className="col-span-5 lg:col-span-6">
          <StudentForm />
        </div>
        <div className="col-span-5 lg:col-span-6">
          <CourseForm onSubmit={handleCreateCourse} />
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;

