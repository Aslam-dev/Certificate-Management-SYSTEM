'use client';
import React, { useState } from 'react';
import Banner from 'components/admin/profile/Banner';
import InputField from 'components/fields/InputField';
import FooterAuthDefault from 'components/footer/FooterAuthDefault';

export default function StudentVerification() {
  const [code, setCode] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

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
      setShowModal(true);
    } catch (error) {
      setError(error.message);
      setStudentData(null);
      setShowModal(false);
    }
  };

  const handleDownload = () => {
    // Implement PDF download logic using libraries like jsPDF or html2canvas.
    alert('Download functionality is not implemented yet.');
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
                onChange={handleInputChange}
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
          <div
            id="a4-content"
            className="bg-white rounded-lg shadow-lg p-10 w-[210mm] h-[297mm] overflow-hidden"
          >
            <h1 className="text-2xl font-bold mt-4 text-center">Student Information</h1>
            <div className="text-center mb-4 mt-4">
              <img
                src={studentData.photo}
                alt="Student profile"
                className="w-24 h-24 object-cover rounded-full mx-auto border border-gray-300"
              />     
              <p style={{ fontSize: '1rem', marginLeft:'0.5rem', marginTop:'20px' }} className="text-center text-gray-600">{`${studentData.firstName} ${studentData.lastName}`}</p>
            </div>
            <div className="grid grid-cols-2 gap-8 border-t border-gray-300 pt-4 text-sm">
              <p style={{ marginLeft:'4rem', fontSize:'1.1rem', marginTop:'50px' }}>
                <strong>First Name:</strong> {studentData.firstName}
              </p>
              <p style={{ marginLeft:'3rem', fontSize:'1.1rem', marginTop:'50px' }}>
                <strong>Last Name:</strong> {studentData.lastName}
              </p>
              <p style={{ marginLeft:'4rem', fontSize:'1.1rem' }}>
                <strong>Nationality:</strong> {studentData.nationality}
              </p>
              <p style={{ marginLeft:'3rem', fontSize:'1.1rem' }}>
                <strong>Student Code:</strong> {studentData.studentCode}
              </p>
              <p style={{ marginLeft:'4rem', fontSize:'1.1rem' }}>
                <strong>Certificate ID:</strong> {studentData.certificateId}
              </p>
              <p style={{ marginLeft:'3rem', fontSize:'1.1rem' }}>
                <strong>Course:</strong> {studentData.course}
              </p>
              <p style={{ marginLeft:'4rem', fontSize:'1.1rem' }}>
                <strong>Result:</strong> {studentData.results}
              </p>
              <p style={{ marginLeft:'3rem', fontSize:'1.1rem' }}>
                <strong>Graduation Year:</strong> {studentData.graduationYear}
              </p>
            </div>
            <div style={{ marginTop:'22rem'}} className="flex justify-left items-left mt-16 border-t border-gray-300 pt-4 text-sm">
              <img
                src="/A2zLogo.PNG"
                alt="Logo"
                className="w-30 h-20 object-contain mt-0"
                style={{ marginLeft:'20px'}}
              />
            
            <div style={{ marginLeft:'4rem'}} className="mt-2 text-left text-gray-700 text-sm ">
              <p style={{ marginLeft:'-30px', marginRight:'0.5rem', fontSize: '0.9rem' }}>
              CHARTERED TAX INSTITUTE OF MALAYSIA (225750-T)
              </p>
              <p style={{ marginLeft:'-30px', marginRight:'0.5rem', fontSize: '0.7rem' }}>
              B-13-1, Megan Avenue II, No. 12 Jalan Yap Kwan Seng, 50450 Kuala Lumpur
              </p>
              <p style={{ marginLeft:'-30px', marginRight:'0.5rem', fontSize: '0.7rem' }}>
              Tel: 03-2162 8989 | Fax: 03-2162 8990 | Email: examination@ctim.org.my
              </p>
            </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setShowModal(false)}
                style={{marginTop:'10px'}}
              >
                Back
              </button>
              <div className=" flex-col">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  style={{marginTop:'10px', marginRight:'30px'}}
                  onClick={handleDownload}
                >
                  Download
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => window.print()}
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterAuthDefault />
    </>
  );
}

