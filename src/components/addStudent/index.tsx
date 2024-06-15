import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Input,
  Button,
  Card,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";

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
  const [formData, setFormData] = useState<Student>({
    id: 0,
    photo: null,
    firstName: '',
    lastName: '',
    nationality: '',
    studentCode: '',
    certificateId: '',
    course: '',
    results: '',
    graduationYear: 0,
  });
  const [updateId, setUpdateId] = useState<number | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      if (!res.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const addStudent = async () => {
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error('Failed to add student');
      }
      const newStudent = await res.json();
      setStudents([...students, newStudent]);
      resetForm();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const updateStudent = async () => {
    try {
      const res = await fetch(`/api/students/${updateId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error('Failed to update student');
      }
      const updatedStudent = await res.json();
      setStudents(students.map(student => (student.id === updateId ? updatedStudent : student)));
      resetForm();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete student');
      }
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
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
      graduationYear: 0,
    });
    setUpdateId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        photo: file,
      });
    }
  };

  const editStudent = (student: Student) => {
    setFormData(student);
    setUpdateId(student.id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Students</h1>
      <Grid templateColumns="1fr" gap={4}>
        <Box mb={8}>
          <Card>
            <Box p={4}>
              <form onSubmit={updateId ? updateStudent : addStudent}>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
                <Input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="Nationality"
                  required
                />
                <Input
                  type="text"
                  name="studentCode"
                  value={formData.studentCode}
                  onChange={handleChange}
                  placeholder="Student Code"
                  required
                />
                <Input
                  type="text"
                  name="certificateId"
                  value={formData.certificateId}
                  onChange={handleChange}
                  placeholder="Certificate ID"
                  required
                />
                <Input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="Course"
                  required
                />
                <Input
                  type="text"
                  name="results"
                  value={formData.results}
                  onChange={handleChange}
                  placeholder="Results"
                  required
                />
                <Input
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear.toString()}
                  onChange={handleChange}
                  placeholder="Graduation Year"
                  required
                />
                <Input
                  type="file"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-3 space-x-2 hover:bg-gray-100">
                    <MdFileUpload className="text-4xl text-blue-600" />
                    <span className="text-xl font-semibold text-blue-600">Upload Photo</span>
                  </label>
                  <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                </div>
                <Button type="submit" mt={4} colorScheme="blue" size="lg" width="100%">
                  {updateId ? 'Update Student' : 'Add Student'}
                </Button>
              </form>
            </Box>
          </Card>
        </Box>
        <Box>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Photo</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Nationality</Th>
                <Th>Student Code</Th>
                <Th>Certificate ID</Th>
                <Th>Course</Th>
                <Th>Results</Th>
                <Th>Graduation Year</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.map(student => (
                <Tr key={student.id}>
                  <Td>
                    <img
                      src={student.photo || '/default-avatar.png'}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="rounded-lg w-full mb-2"
                    />
                  </Td>
                  <Td>{student.firstName}</Td>
                  <Td>{student.lastName}</Td>
                  <Td>{student.nationality}</Td>
                  <Td>{student.studentCode}</Td>
                  <Td>{student.certificateId}</Td>
                  <Td>{student.course}</Td>
                  <Td>{student.results}</Td>
                  <Td>{student.graduationYear}</Td>
                  <Td>
                    <Button onClick={() => editStudent(student)} size="sm" mr={2}>
                      Edit
                    </Button>
                    <Button onClick={() => deleteStudent(student.id)} size="sm" colorScheme="red">
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Grid>
    </div>
  );
}
