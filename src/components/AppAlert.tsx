import React, { FC, useState } from "react";
import { AlertDataType } from "../types";

import SuccessIcon from "../assets/images/svg/success.svg";
import ErrorIcon from "../assets/images/svg/error.svg";
import WarningIcon from "../assets/images/svg/warning.svg";
import Close from "../assets/images/svg/close.svg";

const AppAlert: FC<AlertDataType> = ({
  type = "success",
  message = "",
  show = false,
  setShow = () => {},
  cancelBtnText = "Cancel",
  actionBtnText = "Continue",
  actionBtnClick = () => {},
}) => {
  const [showAlert, setShowAlert] = useState<Boolean>(show);

  const handleClose = () => {
    setShow(false);
    setShowAlert(false);
  };

  return (
    <>
      {showAlert === true && (
        <>
          <div className={`app-alert ${type}`}>
            <span className="close-btn" onClick={handleClose}>
              <img src={Close} alt="" />
            </span>
            <div className="head">
              <p>
                <i className={`${type}-alert`}>
                  <img
                    src={
                      type === "warning"
                        ? WarningIcon
                        : type === "success"
                        ? SuccessIcon
                        : ErrorIcon
                    }
                    alt=""
                  />
                </i>
                {type}
              </p>
            </div>
            <div className="content">
              <p>{message}</p>
            </div>
            <div className="btn-wrap">
              <button
                type="button"
                className="btn text-btn"
                onClick={handleClose}
              >
                {cancelBtnText}
              </button>
              <button
                type="button"
                className="btn secondary-btn"
                onClick={actionBtnClick}
              >
                {actionBtnText}
              </button>
            </div>
          </div>
          <div className="alert-backdrop"></div>
        </>
      )}
    </>
  );
};

export default AppAlert;
