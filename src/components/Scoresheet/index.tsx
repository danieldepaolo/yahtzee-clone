import cn from "classnames";

import UpperSection from "./UpperSection";

import classes from "./styles.module.scss";
import LowerSection from "./LowerSection";

const Scoresheet = () => {
  return (
    <div className={classes.scoreSheet}>
      <UpperSection />
      <LowerSection />
    </div>
  );
};

export default Scoresheet;
