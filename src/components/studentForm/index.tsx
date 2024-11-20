import { useState } from 'react';

interface Course {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  name: string;
}

interface Props {
  onSubmit: (studentData: any) => void;
  courses: Course[];
  subjects: Subject[];
}

const StudentForm: React.FC<Props> = ({ onSubmit, courses, subjects }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nic, setNic] = useState('');
  const [photo, setPhoto] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [subjectResults, setSubjectResults] = useState<{
    [key: number]: string;
  }>({});

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseId = parseInt(e.target.value);
    setSelectedCourses((prevSelected) => [...prevSelected, courseId]);
  };

  const handleSubjectResultChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    subjectId: number,
  ) => {
    setSubjectResults((prevResults) => ({
      ...prevResults,
      [subjectId]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subjectsForCourses = selectedCourses.map((courseId) => ({
      courseId,
      subjects: subjects.map((subject) => ({
        subjectId: subject.id,
        result: subjectResults[subject.id] || '',
      })),
    }));
    const studentData = {
      firstName,
      lastName,
      nic,
      photo,
      courses: subjectsForCourses,
    };
    onSubmit(studentData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-black dark:text-white block">
          First Name
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
        </label>
      </div>

      <div>
        <label className="text-black dark:text-white block">
          Last Name
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
        </label>
      </div>

      <div>
        <label className="text-black dark:text-white block">
          NIC
          <input
            type="text"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            className="w-full p-2 text-black dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
        </label>
      </div>

      <div>
        <label className="text-black dark:text-white block">
          Photo URL
          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full text-black dark:text-white p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
          />
        </label>
      </div>

      {courses ? (
        <select
          value=""
          onChange={handleCourseChange}
          className="w-full text-black dark:text-white p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-black dark:text-white">Loading courses...</p>
      )}

      {selectedCourses.map((courseId) => (
        <div key={courseId}>
          <h3 className="font-bold text-black dark:text-white">
            Course: {courses.find((course) => course.id === courseId)?.name}
          </h3>
          {subjects.map((subject) => (
            <div key={subject.id} className="mt-2">
              <input
                type="text"
                placeholder={`${subject.name} Result`}
                value={subjectResults[subject.id] || ''}
                onChange={(e) => handleSubjectResultChange(e, subject.id)}
                className="w-full text-black dark:text-white bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>
          ))}
        </div>
      ))}

      <div>
        <button
          type="submit"
          className="w-full p-2 rounded-md bg-blue-500 text-gray-600 dark:text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
