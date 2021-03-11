import React from 'react';
import { languages } from "../../../constants/languages";
import classNames from 'classnames';
import Flex from "../Flex";
import useStyles from './styles';

const OutsideLangSwitcher = () => {
  const classes = useStyles();
  const currentLanguage = "RU";
  return (
    <Flex container className={classes.languagesWrap} xs="100%" flex spacing={20}>
      {languages.map(language => {
        const rootClasses = classNames({
          [classes.language]: true,
          [classes.active]: language === currentLanguage,
        })
        return <Flex className={rootClasses}>
          {language}
        </Flex>
      })}
    </Flex>
  )
}

export default OutsideLangSwitcher;