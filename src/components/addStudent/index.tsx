import React, { useState, useEffect } from 'react';

type Course = {
  id: string;
  name: string;
};

const AddStudents = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [results, setResults] = useState('');
  const [graduationYear, setGraduationYear] = useState<number | ''>('');
  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/course');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data: Course[] = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

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
    formData.append('graduationYear', graduationYear.toString());
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

      // Reset form after successful submission
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
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Student Registration
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[calc(50%-0.5rem)]">
            <label className="text-tan dark:text-white">
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter First Name"
                required
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </label>
            <label className="text-tan dark:text-white">
              Nationality
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="Enter Nationality"
                required
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </label>
            <label className="text-tan dark:text-white">
              Certificate ID
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter Certificate ID"
                required
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </label>
            <label className="text-tan dark:text-white">
              Results
              <input
                type="text"
                value={results}
                onChange={(e) => setResults(e.target.value)}
                placeholder="Enter Results"
                required
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </label>
          </div>
          <div className="flex-1 min-w-[calc(50%-0.5rem)]">
            <label className="text-tan dark:text-white">
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter Last Name"
                required
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </label>
            <label className="text-tan dark:text-white">
              Student Code
              <input
                type="text"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                placeholder="Enter Student Code"
                required
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </label>
            <label className="text-tan dark:text-white">
              Course
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
                required
              >
                <option value="">Select a course</option>
                {courses.map((courseItem) => (
                  <option key={courseItem.id} value={courseItem.name}>
                    {courseItem.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-tan dark:text-white">
              Graduation Year
              <input
                type="number"
                value={graduationYear}
                onChange={(e) =>
                  setGraduationYear(parseInt(e.target.value) || '')
                }
                placeholder="Enter Graduation Year"
                required
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </label>
          </div>
        </div>
        <label className="text-tan dark:text-white">
          Photo
          <input
            type="file"
            onChange={(e) =>
              setPhoto(e.target.files ? e.target.files[0] : null)
            }
            required
            className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
        </label>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudents;
