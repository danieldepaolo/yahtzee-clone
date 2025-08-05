import cn from "classnames";

import classes from "./styles.module.scss";

function SixSidedDie({ value }: { value: number }) {
  const dotConfigs: Record<number, boolean[]> = {
    1: [false, false, false, false, true, false, false, false, false],
    2: [true, false, false, false, false, false, false, false, true],
    3: [false, false, true, false, true, false, true, false, false],
    4: [true, false, true, false, false, false, true, false, true],
    5: [true, false, true, false, true, false, true, false, true],
    6: [true, false, true, true, false, true, true, false, true],
  };

  return (
    <div className={classes.die}>
      <div className={classes.dieDots}>
        {dotConfigs[value]?.map((showDot, i) => (
          <div
            key={`die-dot-${i}`}
            className={cn(classes.dieDot, { [classes.hidden]: !showDot })}
          />
        ))}
      </div>
    </div>
  );
}

export default SixSidedDie;
