'use client';
import React from 'react';

import AddStudents from 'components/addStudentA';
import AddStudent from 'components/addStudent';
import CourseForm from 'components/courseForm';

const CreateCourse: React.FC = () => {
  const handleCourseSubmit = async (courseData) => {
    const response = await fetch('/api/course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error('Failed to create course');
    }

    const data = await response.json();
    return data;
  };

  return (
    <div className="flex flex-col gap-5 lg:gap-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="col-span-5 lg:col-span-12">
          <CourseForm onSubmit={handleCourseSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
