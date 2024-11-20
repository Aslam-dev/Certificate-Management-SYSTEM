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
    <div className="max-w-auto mx-auto p-4">
      {alertMessage && (
        <div className="bg-green-200 text-green-800 p-2 rounded mb-4">
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-black dark:text-white text-sm font-medium">
            Course Name
          </label>
          <input
            type="text"
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none text-black dark:text-white bg-white dark:bg-gray-800  focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-black dark:text-white text-sm font-medium">
            Start Date
          </label>
          <input
            type="datetime-local"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-800 "
          />
        </div>

        <div>
          <label className="block text-black dark:text-white text-sm font-medium">
            End Date
          </label>
          <input
            type="datetime-local"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white bg-white dark:bg-gray-800 "
          />
        </div>

        <div>
          <label className="block text-black dark:text-white text-sm font-medium">
            Batch No
          </label>
          <input
            type="text"
            placeholder="Batch No"
            value={batchNo}
            onChange={(e) => setBatchNo(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 text-black dark:text-white bg-white dark:bg-gray-800  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full p-2 rounded-md bg-blue-500 text-gray-600 dark:text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
