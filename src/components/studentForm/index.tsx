


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
  onSubmit: (studentData: any) => void; // Define the type of studentData based on your API
  courses: Course[];
  subjects: Subject[];
}

const StudentForm: React.FC<Props> = ({ onSubmit, courses, subjects }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nic, setNic] = useState('');
  const [photo, setPhoto] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [subjectResults, setSubjectResults] = useState<{ [key: number]: string }>({});

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseId = parseInt(e.target.value);
    setSelectedCourses((prevSelected) => [...prevSelected, courseId]);
  };

  const handleSubjectResultChange = (e: React.ChangeEvent<HTMLInputElement>, subjectId: number) => {
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={{ color: '#D2B48C' }}>
          First Name
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc' }}
          />
        </label>
      </div>

      <div>
      <label style={{ color: '#D2B48C' }}> Last Name
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc' }}
      />
      </label>
      </div>

      <div>
      <label style={{ color: '#D2B48C' }}>NIC
      <input
        type="text"
        placeholder="NIC"
        value={nic}
        onChange={(e) => setNic(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc' }}
        />
      </label>
      </div>

      <div style={{ color: '#D2B48C' }} >
      <label>Photo URL
      <input
        type="text"
        placeholder="Photo URL"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc' }}
        />
      </label>
      </div>

      {courses ? (
        <select value="" onChange={handleCourseChange}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      ) : (
        <p style={{color:'#D2B48C'}}>Loading courses...</p>
      )}
      {selectedCourses.map((courseId) => (
        <div key={courseId}>
          <h3>Course: {courses.find((course) => course.id === courseId)?.name}</h3>
          {subjects.map((subject) => (
            <div key={subject.id}>
              <input
                type="text"
                placeholder={`${subject.name} Result`}
                value={subjectResults[subject.id] || ''}
                onChange={(e) => handleSubjectResultChange(e, subject.id)}
              />
            </div>
          ))}
        </div>
      ))}
      <div>
      <button type="submit" 
      style={{ width: '100%', padding: '0.5rem', borderRadius: '10px', border: '1px solid #ccc', backgroundColor:'Blue' }}
      >Submit</button>
      </div>
    </form>
  );
};

export default StudentForm;
