import cn from "classnames";

import UpperSection from "./UpperSection";

import classes from "./styles.module.scss";
import LowerSection from "./LowerSection";

import diceImage from 'url:../../assets/dice-png-27665.png';

const Scoresheet = () => {
  return (
    <div className={classes.scoreSheet}>
      <div className={classes.scoreSheetTop}>
        <h1 className={classes.scoreSheetHeading}>Yahtzee</h1>
        <img src={diceImage} className={classes.scoreSheetDiceImage} />
      </div>
      <UpperSection />
      <LowerSection />
    </div>
  );
};

export default Scoresheet;
