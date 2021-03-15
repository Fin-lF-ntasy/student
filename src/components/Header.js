import React from "react";
import style from "./Header.module.css";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import { changeSearchingValue } from "../action/actionCreator";
import { useDispatch } from "react-redux";
import { push } from 'connected-react-router';

export default function Header() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = React.useState("");

  const handleMoveToNewStudentPage = () => {
    dispatch(push('/NewStudent'));
  };

  return (
    <div className={style.header}>
      <div className={style.top_area}>
        <h2>Quản lý sinh viên</h2>
        <button onClick={handleMoveToNewStudentPage}>
          <AddIcon className={style.plus} />
          <span>Thêm mới</span>
        </button>
      </div>
      <div className={style.search_area}>
        <input
          type="text"
          value={searchText}
          placeholder="  Type Name or Phone Number"
          onChange={(e) => {
            setSearchText(e.target.value);
            if (!e.target.value) {
              dispatch(changeSearchingValue(e.target.value));
            }
          }}
        />
        <SearchIcon
          className={style.search_button}
          onClick={() => dispatch(changeSearchingValue(searchText))}
        />
      </div>
    </div>
  );
}
