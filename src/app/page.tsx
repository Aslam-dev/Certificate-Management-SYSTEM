'use client';
import React, { useState } from 'react';
import Banner from 'components/admin/profile/Banner';
import InputField from 'components/fields/InputField';
import FooterAuthDefault from 'components/footer/FooterAuthDefault';

export default function Home() {
  const [studentCode, setStudentCode] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setStudentCode(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/student?studentCode=${studentCode}`);

      if (!response.ok) {
        throw new Error('Student not found');
      }

      const data = await response.json();
      setStudentData(data);
      setError('');
    } catch (error) {
      setError(error.message);
      setStudentData(null);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-6xl p-5">
          <div className="mt-3 flex h-fit w-full flex-col gap-5 lg:grid">
            <div className="col-span-8 mx-auto w-full">
              <Banner />
            </div>

            <div className="col-span-8 mx-auto w-full max-w-xl">
              <form onSubmit={handleFormSubmit}>
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Insert Student NIC Number"
                  placeholder="Only Number Don't Put Any Letters"
                  id="studentCode"
                  type="text"
                  value={studentCode}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                >
                  Verify
                </button>
              </form>
              {error && <p className="text-red-500 mt-3">{error}</p>}
              {studentData && (
                <div className="mt-5">
                  <p><strong>Photo:</strong> <img src={studentData.photo} alt="Student Photo" /></p>
                  <p><strong>First Name:</strong> {studentData.firstName}</p>
                  <p><strong>Last Name:</strong> {studentData.lastName}</p>
                  <p><strong>Nationality:</strong> {studentData.nationality}</p>
                  <p><strong>Student Code:</strong> {studentData.studentCode}</p>
                  <p><strong>Certificate ID:</strong> {studentData.certificateId}</p>
                  <p><strong>Course:</strong> {studentData.course}</p>
                  <p><strong>Results:</strong> {studentData.results}</p>
                  <p><strong>Graduation Year:</strong> {studentData.graduationYear}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterAuthDefault />
    </>
  );
}
