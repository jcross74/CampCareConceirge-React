import React from "react";
import cn from "classnames";
import styles from "./Login.module.sass";
import Item from "../Item";
import TextInput from "../../../components/TextInput";

const Login = ({ className }) => {
  return (
    <Item
      className={cn(styles.card, className)}
      title="Login"
      classTitle="title-green"
    >
      
    </Item>
  );
};

export default Login;
