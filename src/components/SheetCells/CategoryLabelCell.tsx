import cn from "classnames";

import classes from "./cells.module.scss";

const CategoryLabelCell = ({ title, titleSize = 'normal', description }: { title: string, titleSize?: 'small' | 'normal' | 'large', description: string }) => {
  const titleClass = () => {
    switch(titleSize) {
      case 'small':
        return cn(classes.categoryLabelCellTitle, classes.categoryLabelCellTitleSmall);
      case 'normal':
        return classes.categoryLabelCellTitle;
      case 'large':
        return cn(classes.categoryLabelCellTitle, classes.categoryLabelCellTitleHuge);
    }
  }

  return (
    <div className={classes.categoryLabelCell}>
      <div className={classes.categoryLabelCellLeft}>
        <span className={titleClass()}>{title}</span>
      </div>
      <div className={classes.categoryLabelCellRight}>
        <span className={classes.categoryLabelCellDescription}>
          {description}
        </span>
      </div>
    </div>
  );
};

export default CategoryLabelCell;
