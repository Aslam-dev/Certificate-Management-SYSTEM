// src/components/addStudent.tsx

import React, { useState } from 'react';

const AddStudents = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [course, setCourse] = useState('');
  const [results, setResults] = useState('');
  const [graduationYear, setGraduationYear] = useState<number | ''>('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !nationality ||
      !studentCode ||
      !certificateId ||
      !course ||
      !results ||
      !graduationYear ||
      !photo
    ) {
      alert('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('nationality', nationality);
    formData.append('studentCode', studentCode);
    formData.append('certificateId', certificateId);
    formData.append('course', course);
    formData.append('results', results);
    formData.append('graduationYear', graduationYear.toString()); // Convert to string for form data
    formData.append('photo', photo);

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to create student');
      }

      const newStudent = await res.json();
      console.log('Student created successfully:', newStudent);
      // Reset form fields
      setFirstName('');
      setLastName('');
      setNationality('');
      setStudentCode('');
      setCertificateId('');
      setCourse('');
      setResults('');
      setGraduationYear('');
      setPhoto(null);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="text"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
        placeholder="Nationality"
        required
      />
      <input
        type="text"
        value={studentCode}
        onChange={(e) => setStudentCode(e.target.value)}
        placeholder="Student Code"
        required
      />
      <input
        type="text"
        value={certificateId}
        onChange={(e) => setCertificateId(e.target.value)}
        placeholder="Certificate ID"
        required
      />
      <input
        type="text"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        placeholder="Course"
        required
      />
      <input
        type="text"
        value={results}
        onChange={(e) => setResults(e.target.value)}
        placeholder="Results"
        required
      />
      <input
        type="number"
        value={graduationYear}
        onChange={(e) => setGraduationYear(parseInt(e.target.value))}
        placeholder="Graduation Year"
        required
      />
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudents;
