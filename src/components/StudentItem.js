import React from "react";
import style from "./StudentItem.module.css";
import { Male, Female } from "react-gender";
import { push } from "connected-react-router";
import { Utils } from "../utils/Utils";
import { getOneStudent } from "../studentService";
import { useDispatch } from 'react-redux';

export default function StudentItem({ student }) {
  const dispatch = useDispatch();
  const showGender = () => {
    if (student.gender === 1)
      return <Male color="#419fcf" className={style.genderType} />;
    else return <Female color="#f378ac" className={style.genderType} />;
  };

  const handleBeginModifyStudent = async () => {
    const modifiedStudent = await getOneStudent(student.id);
    dispatch(push({
      pathname: `/ModifyStudent/${student.id}`,
      state: {
        modifiedStudent: modifiedStudent
      }
    }));
  };

  return (
    <div className={style.studentItem} onClick={handleBeginModifyStudent}>
      <div className={style.img_container}>
        <img
          src={Utils.getAvatarUrlFromFileName(student.img)}
          alt={student.name}
        />
      </div>
      <div className={style.details_area}>
        <div className={style.name}>{student.name}</div>
        <div className={style.phoneNumber}>{student.phoneNumber}</div>
      </div>
      <div className={style.gender_container}>{showGender()}</div>
    </div>
  );
}
