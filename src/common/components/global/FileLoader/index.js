import React from "react";
import Http from "../../../../http";

const FileLoader = ({
  id,
  onSuccess,
  onError,
  setLoading,
  children,
  secure,
  ...props
  }) => {
    const inputChangeHandler = (e) => {
      const formData = new FormData();
      formData.append("file", e.currentTarget.files[0]);
      setLoading && setLoading();
      console.log(e.currentTarget.files[0].name.split('.'));
      Http.post(`/v1/upload${secure ? "/secure" : ""}`, formData)
        .then((res) => {
          onSuccess && onSuccess(res);
        })
        .catch((error) => onError && onError(error));
    };
  return (
    <>
      <input
        type="file"
        id={id}
        hidden
        onChange={inputChangeHandler}
        {...props}
      />
      <label style={{ cursor: "pointer" }} htmlFor={id}>
        {children}
      </label>
    </>
  )
};

export  default FileLoader;