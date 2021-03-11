import axios from "axios";
// const user = "vu";
const url = "http://localhost:5000/Student";
const getStudentEndPoint = `${url}/GetStudents`;
const addStudentEndPoint = `${url}/AddStudent`;
const modifyStudentEndPoint = `${url}/ModifyStudent`;
const getOneStudentEndPoint = `${url}/GetStudent`;

export const getStudent = async (search, page, pageSize) =>
  (
    await axios.get(getStudentEndPoint, {
      params: {
        search,
        page,
        pageSize,
      },
    })
  ).data;

export const addStudent = async (newStudent) => {
  let fd = new FormData();

  newStudent = {
    ...newStudent,
    gender: Number.parseInt(newStudent.gender),
  };
  for (const key in newStudent) {
    if (Object.hasOwnProperty.call(newStudent, key)) {
      const value = newStudent[key];
      fd.append(key, value);
    }
  }
  return await axios.post(addStudentEndPoint, fd, {
    headers: {
      "Content-Type": `multipart/form-data boundary=${fd._boundary}`,
    },
  });
};

export const modifyStudent = async (modifyStudent) => {
  let fd = new FormData();

  modifyStudent = {
    ...modifyStudent,
    gender: Number.parseInt(modifyStudent.gender),
  };
  for (const key in modifyStudent) {
    if (Object.hasOwnProperty.call(modifyStudent, key)) {
      const value = modifyStudent[key];
      fd.append(key, value);
    }
  }
  return await axios.post(modifyStudentEndPoint, fd, {
    headers: {
      "Content-Type": `multipart/form-data boundary=${fd._boundary}`,
    },
  });
};

export const getOneStudent = async id =>
  (
    await axios.get(getOneStudentEndPoint, {
      params: {
        id
      },
    })
  ).data;