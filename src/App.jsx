import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addStudent,
  updateStudent,
  deleteStudent,
  clearAllStudents,
} from './store/studentsSlice';

function App() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.studentsData.students);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ id: null, name: '', age: '' });

  const handleAddStudent = () => {
    setCurrentStudent({ id: Date.now(), name: '', age: '' });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setEditMode(true);
    setShowModal(true);
  };

  const handleSaveStudent = () => {
    const { id, name, age } = currentStudent;

    if (!name || !age) {
      alert('Please fill out all fields');
      return;
    }

    if (editMode) {
      dispatch(updateStudent({ id, name, age }));
    } else {
      dispatch(addStudent({ id, name, age }));
    }
    setShowModal(false);
  };

  return (
    <div className="app flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-gray-200">
      <h1 className="text-3xl font-extrabold text-white mb-6">Student Management</h1>

      <button
        onClick={handleAddStudent}
        className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transform hover:scale-105 transition-transform duration-300"
      >
        Add Student
      </button>

      <div className="student-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="student-card p-6 bg-gray-800 border border-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-100">{student.name}</h2>
            <p className="text-gray-400">Age: {student.age}</p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEditStudent(student)}
                className="px-4 py-1 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteStudent(student.id))}
                className="px-4 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => dispatch(clearAllStudents())}
        className="mt-8 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transform hover:scale-105 transition-transform duration-300"
      >
        Clear All Students
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="modal bg-gray-800 p-6 rounded-lg shadow-lg w-80 md:w-96 text-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">
              {editMode ? 'Edit Student' : 'Add Student'}
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={currentStudent.name}
              onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
              className="w-full mb-3 p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              placeholder="Age"
              value={currentStudent.age}
              onChange={(e) => setCurrentStudent({ ...currentStudent, age: e.target.value })}
              className="w-full mb-4 p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg shadow hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStudent}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
