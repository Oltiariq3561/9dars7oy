import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('students');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.warn('Failed to load students from local storage', e);
    return [];
  }
};

const saveToLocalStorage = (students) => {
  try {
    const serializedState = JSON.stringify(students);
    localStorage.setItem('students', serializedState);
  } catch (e) {
    console.warn('Failed to save students to local storage', e);
  }
};

const initialState = {
  students: loadFromLocalStorage(),
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
      saveToLocalStorage(state.students);
    },
    updateStudent: (state, action) => {
      const { id, name, age } = action.payload;
      const student = state.students.find((student) => student.id === id);
      if (student) {
        student.name = name;
        student.age = age;
        saveToLocalStorage(state.students);
      }
    },
    updateStudentName: (state, action) => {
      const { id, name } = action.payload;
      const student = state.students.find((student) => student.id === id);
      if (student) {
        student.name = name;
        saveToLocalStorage(state.students);
      }
    },
    updateStudentAge: (state, action) => {
      const { id, age } = action.payload;
      const student = state.students.find((student) => student.id === id);
      if (student) {
        student.age = age;
        saveToLocalStorage(state.students);
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter((student) => student.id !== action.payload);
      saveToLocalStorage(state.students);
    },
    clearAllStudents: (state) => {
      state.students = [];
      saveToLocalStorage(state.students);
    },
    getStudentById: (state, action) => {
      return state.students.find((student) => student.id === action.payload);
    },
  },
});

export const {
  addStudent,
  updateStudent,
  updateStudentName,
  updateStudentAge,
  deleteStudent,
  clearAllStudents,
  getStudentById,
} = studentsSlice.actions;

export default studentsSlice.reducer;
