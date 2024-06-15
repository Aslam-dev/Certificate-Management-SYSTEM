import React, { useState } from 'react';

interface Props {
  onSubmit: (courseData: any) => Promise<void>; // Use Promise for async onSubmit
}

const CourseForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const courseData = {
      name,
      startDate,
      endDate,
      batchNo,
    };
    try {
      await onSubmit(courseData);
      // Update state to show success message
      setAlertMessage('Course created successfully!');
    } catch (error) {
      // Update state to show error message
      setAlertMessage('Error creating course. Please try again.');
    }
    // Optionally, clear form fields after submission
    setName('');
    setStartDate('');
    setEndDate('');
    setBatchNo('');
  };

  return (
    <div>
      {alertMessage && <div className="alert">{alertMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Batch No"
          value={batchNo}
          onChange={(e) => setBatchNo(e.target.value)}
        />
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CourseForm;
