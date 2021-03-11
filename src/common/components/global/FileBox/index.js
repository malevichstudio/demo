import React from "react";
import useStyles from "./styles";
import RemoveFile from "../../icons/RemoveFile";
import AddFile from "../../icons/AddFile";
import FileLoader from "../FileLoader";

const FileBox = ({
  content,
  handler,
  hasFile,
  secure,
  isSvg,
  id,
 }) => {
  const classes = useStyles({ image: content });
  return (
    <div className={classes.box}>
      <div className={hasFile && !isSvg ? classes.image : classes.message}>
        {(!hasFile || isSvg) && content}
      </div>
      <div onClick={hasFile ? handler : undefined} className={classes.handler}>
        {hasFile
          ? <RemoveFile />
          : <FileLoader secure={secure} id={id} onSuccess={(res) => handler(res)}>
              <AddFile />
            </FileLoader>
        }
      </div>
    </div>
  )
};

export default FileBox;