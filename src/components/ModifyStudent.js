import React from "react";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import style from "./NewStudent.module.css";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { ErrorMessage, Field, Formik } from "formik";
import { Utils } from "../utils/Utils";
import { modifyStudent } from '../studentService';

const { confirm } = Modal;

function showConfirm(onOk, onCancel) {
  confirm({
    title: "Bạn có thực sự muốn huỷ?",
    icon: <ExclamationCircleOutlined />,
    content: "Các thay đổi sẽ không được lưu",
    okType: "default",
    cancelButtonProps: {
      type: "primary",
    },
    onOk() {
      onOk();
    },
    onCancel() {
      onCancel();
    },
  });
}

export default function ModifyStudent(props) {
  const studentId = useParams().id;

  const student = useSelector((state) =>
    state.students.studentList.find((s) => s.id === studentId)
  );

  const history = useHistory();
  const location = useLocation();
  const modifiedStudent = location.state.modifiedStudent.data;
  console.log(modifiedStudent);

  const handleSaveStudent = (values) => {
    values.createdDate = new Date(values.createdDate).toLocaleDateString('en-CA');
    delete values.img;
    delete values.id;
    console.log(values);
      modifyStudent(values);
      history.push("/");
    
  };

  const handleCancelModify = (dirty) => {
    if (!dirty) history.push("/");
    else
      showConfirm(
        () => history.push("/"),
        () => {}
      );
  };


  return (
    
    <div className={style.newStudent}>
      <Formik
        initialValues={{ ...modifiedStudent,
          birthday: new Date(modifiedStudent.birthday).toLocaleDateString('en-CA'),
          admissionDate: new Date(modifiedStudent.admissionDate).toLocaleDateString('en-CA'),
          imageFile: ""
         }}
        validationSchema={Yup.object().shape({
          img: Yup.string().required(),
          name: Yup.string()
            .required("Vui lòng nhập tên")
            .matches(
              /^[^`~!@#$%^&*()_+={}[\]|\\:;“’<,>.?๐฿]*$/,
              "Tên không được chứa ký tự đặc biệt"
            ),
          phoneNumber: Yup.string()
            .required("Vui lòng nhập số điện thoại")
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              "Số điện thoại không hợp lệ "
            ),
          birthday: Yup.string().required("Vui lòng nhập ngày sinh"),
          gender: Yup.string().required("Vui lòng chọn giới tính"),
          admissionDate: Yup.string().required("Vui lòng chọn ngày nhập học"),
        })}
        onSubmit={values => handleSaveStudent(values)}
      >
        {({ values, setFieldValue, handleSubmit, isValid, dirty }) => {
          return (
            <React.Fragment>
              <div
                className={style.topbar}
                onClick={() => handleCancelModify(dirty)}
              >
                <ArrowBackIosIcon className={style.arrowIcon} />
                <h2>Danh sách</h2>
              </div>
              <form className={style.form}>
                <div className={style.firstContent}>
                  <div className={style.img_container}>
                    <label htmlFor="imageUpload">
                      <input
                        type="file"
                        id="imageUpload"
                        className={style.file}
                        onChange={(e) => {
                          // const urlImg = URL.createObjectURL(e.target.files[0]);
                          setFieldValue("img", e.target.files[0].name, true);
                          setFieldValue("imageFile", e.target.files[0].name, true);
                        }}
                      />
                      <img
                        src={Utils.getAvatarUrlFromFileName(values.img)}
                        alt={values.name}
                      />
                    </label>
                  </div>
                  <Field className={style.standard2} type="text" name="name" value={values.name} />
                </div>
                <ErrorMessage name="name" />
                <div>
                  <label htmlFor="">Ngày sinh</label>
                  <Field
                    className={style.standard1}
                    type="date"
                    name="birthday"
                    value={values.birthday}
                  />
                </div>
                <ErrorMessage name="birthday" />
                <div>
                  <label htmlFor="gender">Giới tính</label>
                  <div className={style.gender}>
                    <div className={style.manCheckBox}>
                      <Field
                        className={style.standard3}
                        type="radio"
                        name="gender"
                        value="1"
                      />
                      <label htmlFor="Nam">Nam</label>
                    </div>
                    <div>
                      <Field
                        className={style.standard3}
                        type="radio"
                        name="gender"
                        value="2"
                      />
                      <label htmlFor="Nữ">Nữ</label>
                    </div>
                  </div>
                </div>
                <ErrorMessage name="gender" />
                <div>
                  <label htmlFor="admissionDate">Ngày nhập học</label>
                  <Field
                    className={style.standard1}
                    type="date"
                    name="admissionDate"
                    value={values.admissionDate}
                  />
                </div>
                <ErrorMessage name="admissionDate" />
                <div>
                  <label htmlFor="phoneNumber">Điện thoại</label>
                  <Field
                    className={style.standard1}
                    type="text"
                    name="phoneNumber"
                    value={values.phoneNumber}
                  />
                </div>
                <ErrorMessage name="phoneNumber" />
              </form>
              <div className={style.button_group}>
                <Space>
                  <Button
                    type="primary"
                    className={style.add_butt}
                    disabled={!isValid}
                    onClick={handleSubmit}
                  >
                    Sửa
                  </Button>
                  <Button
                    className={style.cancel_butt}
                    onClick={() => handleCancelModify(dirty)}
                  >
                    Huỷ
                  </Button>
                </Space>
              </div>
            </React.Fragment>
          );
        }}
      </Formik>
    </div>
  );
}
