'use client';
import React, { useState, useEffect } from 'react';
import Banner from 'components/admin/profile/Banner';
import General from 'components/admin/profile/General';
import Notification from 'components/admin/profile/Notification';
import Project from 'components/admin/profile/Project';
import Storage from 'components/admin/profile/Storage';
import Upload from 'components/admin/profile/Upload';
import StudentForm from 'components/studentForm';

const CreateCoursePage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const handleCreateStudent = async (studentData: any) => {
    try {
      const response = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      const data = await response.json();

      if (response.ok) {
        // Student created successfully
        console.log('Student created:', data.student);
        // You can show a success message here
      } else {
        // Handle error
        console.error('Error creating student:', data.message);
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or unexpected errors
    }
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
          <StudentForm
            onSubmit={handleCreateStudent}
            courses={courses}
            subjects={subjects}
          />
        </div>
        <div className="col-span-5 lg:col-span-6"></div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
