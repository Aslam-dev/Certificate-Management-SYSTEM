import React, { useState, useEffect } from 'react';
import { MdFileUpload } from 'react-icons/md';

type Student = {
  id: number;
  photo: string | null;
  firstName: string;
  lastName: string;
  nationality: string;
  studentCode: string;
  certificateId: string;
  course: string;
  results: string;
  graduationYear: number;
};

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    studentCode: '',
    certificateId: '',
    course: '',
    results: '',
    graduationYear: '', // Initialize with an empty string or a default value
    photo: null,
  });

  const [updateId, setUpdateId] = useState<number | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);

      if (!res.ok) throw new Error('Failed to fetch students');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = updateId ? 'PUT' : 'POST';
      const url = updateId ? `/api/students/${updateId}` : '/api/students';

      const form = new FormData();
      form.append('firstName', formData.firstName);
      form.append('lastName', formData.lastName);
      form.append('nationality', formData.nationality);
      form.append('studentCode', formData.studentCode);
      form.append('certificateId', formData.certificateId);
      form.append('course', formData.course);
      form.append('results', formData.results);

      if (formData.graduationYear) {
        form.append('graduationYear', formData.graduationYear.toString());
      }

      if (formData.photo) {
        form.append('photo', formData.photo); // Append the file here
      }

      const res = await fetch(url, {
        method,
        body: form,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to save student: ${errorText}`);
      }

      const savedStudent = await res.json();
      // Update your state with the saved student
      if (updateId) {
        setStudents((prev) =>
          prev.map((student) =>
            student.id === updateId ? savedStudent : student,
          ),
        );
      } else {
        setStudents((prev) => [...prev, savedStudent]);
      }

      resetForm(); // Reset the form after successful save
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      photo: null,
      firstName: '',
      lastName: '',
      nationality: '',
      studentCode: '',
      certificateId: '',
      course: '',
      results: '',
      graduationYear: '',
    });
    setUpdateId(null);
  };

  const deleteStudent = async (id: number) => {
    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete student');
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-[#0b1436]">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Student Management
      </h1>

      {/* Form Section */}
      <div className="bg-white shadow-md bg-white dark:bg-[#0b1436] rounded-md p-6 mb-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Nationality"
            required
            className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <input
            type="text"
            name="studentCode"
            value={formData.studentCode}
            onChange={handleChange}
            placeholder="Student Code"
            required
            className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <input
            type="text"
            name="certificateId"
            value={formData.certificateId}
            onChange={handleChange}
            placeholder="Certificate ID"
            required
            className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course"
            required
            className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <input
            type="text"
            name="results"
            value={formData.results}
            onChange={handleChange}
            placeholder="Results"
            required
            className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <input
            type="number"
            name="graduationYear"
            value={formData.graduationYear || ''}
            onChange={handleChange}
            placeholder="Graduation Year"
            required
            className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <div className="flex items-center space-x-3">
            <label
              htmlFor="photo"
              className="flex items-center justify-center w-full bg-gray-100 dark:bg-gray-800  border-dashed border-2 dark:text-white border-gray-300 dark:border-white-600 rounded-lg p-3 cursor-pointer hover:bg-gray-200"
            >
              <MdFileUpload className="text-2xl text-blue-500 dark:text-white mr-2" />
              <span>Upload Photo</span>
            </label>
            <input
              id="photo"
              type="file"
              className="hidden"
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.files?.[0] || null })
              }
            />
          </div>
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-lg"
          >
            {updateId ? 'Update Student' : 'Add Student'}
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-[#0b1436] shadow-md rounded-md overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-2 dark:bg-[#0b1436] dark-text-white border border-gray-300 text-left">
          <thead className="bg-gray-100 text-gray-700 dark:bg-[#0b1336] dark:text-white">
            <tr>
              <th className="border border-gray-300 p-3">Photo</th>
              <th className="border border-gray-300 p-3">First Name</th>
              <th className="border border-gray-300 p-3">Last Name</th>
              <th className="border border-gray-300 p-3">Nationality</th>
              <th className="border border-gray-300 p-3">Student Code</th>
              <th className="border border-gray-300 p-3">Certificate ID</th>
              <th className="border border-gray-300 p-3">Course</th>
              <th className="border border-gray-300 p-3">Results</th>
              <th className="border border-gray-300 p-3">Graduation Year</th>
              <th className="border border-gray-300 p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="dark:bg-[#0b1436]  dark:text-white">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-100 dark:hover:bg-[#2d386b]"
              >
                <td className="border border-gray-300 p-3">
                  {student.photo ? (
                    <img
                      src={student.photo} // Display the updated or existing photo
                      alt={`${student.firstName} ${student.lastName}`}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    'No Photo'
                  )}
                </td>

                <td className="border border-gray-300 p-3">
                  {student.firstName}
                </td>
                <td className="border border-gray-300 p-3">
                  {student.lastName}
                </td>
                <td className="border border-gray-300 p-3">
                  {student.nationality}
                </td>
                <td className="border border-gray-300 p-3">
                  {student.studentCode}
                </td>
                <td className="border border-gray-300 p-3">
                  {student.certificateId}
                </td>
                <td className="border border-gray-300 p-3">{student.course}</td>
                <td className="border border-gray-300 p-3">
                  {student.results}
                </td>
                <td className="border border-gray-300 p-3">
                  {student.graduationYear}
                </td>
                <td className=" border-gray-300 p-3 flex space-x-2">
                  <button
                    onClick={() => {
                      setFormData(student);
                      setUpdateId(student.id);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
