'use client';
import React, { useState } from 'react';
import Banner from 'components/admin/profile/Banner';
import InputField from 'components/fields/InputField';
import FooterAuthDefault from 'components/footer/FooterAuthDefault';

export default function StudentVerification() {
  const [code, setCode] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

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
      setIsVerified(true);
    } catch (error) {
      setError(error.message);
      setStudentData(null);
    }
  };

  const handleClose = () => {
    setIsVerified(false);
    setCode('');
    setStudentData(null);
    setError('');
  };

  const handleDownloadPDF = () => {
    // Placeholder for PDF download functionality
    alert('PDF download functionality to be implemented!');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <Banner />
          </div>
          {!isVerified ? (
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
              {error && (
                <p className="text-red-500 mt-4 text-center">{error}</p>
              )}
            </div>
          ) : (
            <div>
              {/* Header Section */}
              <div className="flex align items-center gap-10 mb-6">
                <img
                  src={studentData.photo}
                  alt="Student profile"
                  className="w-24 h-24 object-cover rounded-full border ml-20 border-gray-300"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-gray-800">
                    {studentData.firstName.toUpperCase()}{' '}
                    {studentData.lastName.toUpperCase()}
                  </h2>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-t border-gray-300 my-6" />

              {/* Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-8 text-center">
                  Student Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <p className="font-semibold text-gray-600">First Name:</p>
                    <p className="text-gray-800">{studentData.firstName}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <p className="font-semibold text-gray-600">Last Name:</p>
                    <p className="text-gray-800 bg-">{studentData.lastName}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <p className="font-semibold text-gray-600">Nationality:</p>
                    <p className="text-gray-800">{studentData.nationality}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <p className="font-semibold text-gray-600">Student Code:</p>
                    <p className="text-gray-800">{studentData.studentCode}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <p className="font-semibold text-gray-600">
                      Certificate ID:
                    </p>
                    <p className="text-gray-800">{studentData.certificateId}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <p className="font-semibold text-gray-600">Course:</p>
                    <p className="text-gray-800">
                      {studentData.course.toUpperCase()}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <p className="font-semibold text-gray-600">Results:</p>
                    <p className="text-gray-800">{studentData.results}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <p className="font-semibold text-gray-600">
                      Graduation Year:
                    </p>
                    <p className="text-gray-800">
                      {studentData.graduationYear}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end items-center gap-4 mt-6">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    onClick={handleDownloadPDF}
                  >
                    Download PDF
                  </button>
                  <button
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    onClick={handleClose}
                  >
                    X Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterAuthDefault />
    </>
  );
}
