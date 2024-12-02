'use client';
import React, { useState } from 'react';
import Banner from 'components/admin/profile/Banner';
import InputField from 'components/fields/InputField';
import FooterAuthDefault from 'components/footer/FooterAuthDefault';

export default function StudentVerification() {
  const [code, setCode] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setError('Code is required');
      return;
    }

    setError('');
    setStudentData(null);

    try {
      const response = await fetch(`/api/verification?code=${code}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
      }

      const data = await response.json();
      setStudentData(data);
      setError('');
      setShowModal(true); // Show modal on success
    } catch (error) {
      setError(error.message);
      setStudentData(null);
      setShowModal(false); // Hide modal on error
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <Banner />
          </div>
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <InputField
                variant="auth"
                extra="mb-3"
                label="Insert Student ID or Certificate ID"
                placeholder="Enter the code"
                id="code"
                type="text"
                value={code}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Verify
              </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>
        </div>
      </div>

      {showModal && studentData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-lg">
            <h2 className="text-sm font-semibold mb-4 text-gray-800">
              Student Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 pt-4 gap-4">
              <div className="col-span-2  text-center ">
                <img
                  src={studentData.photo}
                  alt="Student profile"
                  className="w-24 h-24 object-cover rounded-full  mx-auto border border-gray-300"
                />
                <div>
                  {' '}
                  <h2 className="text-xl font-semibold mb-4 mt-4 text-gray-800">
                    {studentData.firstName} {studentData.lastName}
                  </h2>
                </div>
              </div>
              <p>
                <strong>First Name:</strong> {studentData.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {studentData.lastName}
              </p>
              <p>
                <strong>Nationality:</strong> {studentData.nationality}
              </p>
              <p>
                <strong>Student Code:</strong> {studentData.studentCode}
              </p>
              <p>
                <strong>Certificate ID:</strong> {studentData.certificateId}
              </p>
              <p>
                <strong>Course:</strong> {studentData.course}
              </p>
              <p>
                <strong>Results:</strong> {studentData.results}
              </p>
              <p>
                <strong>Graduation Year:</strong> {studentData.graduationYear}
              </p>
            </div>
            <div className="text-right mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={() => setShowModal(false)} // Close modal
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterAuthDefault />
    </>
  );
}
