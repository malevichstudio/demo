import React, { useState } from 'react';
import { languages } from "../../../constants/languages";
import classNames from 'classnames';
import Flex from "../Flex";
import useStyles from './styles';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const InnerLangSwitcher = () => {
  const [lang, setLang] = useState("RU");
  const classes = useStyles();
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={lang}
      className={classes.select}
      inputProps={{
        classes: {
          root: classes.root,
          icon: classes.icon,
        }
      }}
      onChange={(event) => setLang(event.target.value)}
    >
      {languages.map(language => <MenuItem key={language} value={language}>{language}</MenuItem>)}
    </Select>
  )
}

export default InnerLangSwitcher;