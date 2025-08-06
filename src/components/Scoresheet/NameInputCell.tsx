import { KeyboardEvent, useState } from "react";

const NameInputCell = ({
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
    <div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setName(e.target.value)}
        value={name}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  );
};

export default NameInputCell;
