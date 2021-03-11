import React from "react";
import useStyles from "./styles";
import { useIntl } from "react-intl";


const priceDescriptions = [
  'priceAttractive.bad',
  'priceAttractive.middle',
  'priceAttractive.good',
  'priceAttractive.nice',
];

const priceColors = [
  '#FF0900',
  '#FFC107',
  '#99E96F',
  '#5CE316',
];

const limits = [
  {
    "Clicks": 30,
    "Views": 350,
  },
  {
    "Clicks": 20,
    "Views": 210,
  },
  {
    "Clicks": 10,
    "Views": 50,
  },
]
const PriceAttractive = ({ price, type }) => {
  const { formatMessage } = useIntl();
  let priceIndex;
  if(price > limits[0][type]){
    priceIndex = 3;
  } else if(price > limits[1][type]){
    priceIndex = 2;
  } else if(price > limits[2][type]){
    priceIndex = 1;
  } else {
    priceIndex = 0;
  }
  const classes = useStyles({ color: priceColors[priceIndex] });
  return (
    <div>
      <div className={classes.line} />
      <div className={classes.message}>
        {formatMessage({ id: priceDescriptions[priceIndex] })}
      </div>
    </div>
  )
};

export default PriceAttractive;
