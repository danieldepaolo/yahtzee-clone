import cn from "classnames";

import UpperSection from "./UpperSection";

import useTurnScore from "../../hooks/useTurnScore";
import { scoreCategoryOrder } from "../../constants";

import classes from "./styles.module.scss";

const Scoresheet = () => {
  return (
    <div className={classes.scoreSheet}>
      <UpperSection />
    </div>
  );
};

export default Scoresheet;
