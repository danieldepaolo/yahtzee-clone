import { KeyboardEvent, useState } from "react";

import { nameMaxChars } from "../../constants";

import classes from './styles.module.scss';

const NameInput = ({
  placeholder,
  onConfirm,
  initialValue = ''
}: {
  placeholder: string;
  initialValue?: string;
  onConfirm: (name: string) => void;
}) => {
  const [name, setName] = useState(initialValue);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && name) {
      onConfirm(name);
    }
  }

  const handleBlur = () => {
    if (name) {
      onConfirm(name)
    }
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => setName(e.target.value)}
      value={name}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      maxLength={nameMaxChars}
      className={classes.nameInput}
    ></input>
  );
};

export default NameInput;
