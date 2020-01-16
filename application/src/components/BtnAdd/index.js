import React from "react";
import Button from "muicss/lib/react/button";

export const BtnAdd = ({
  title,
  handleClick
}) =>
<Button
  variant="fab"
  color="primary"
  className='btn-fixed'
  title={title}
  onClick={handleClick}
>+</Button>;