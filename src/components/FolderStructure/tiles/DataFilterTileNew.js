import React from "react";

export const DataFilterTileNew = ({
  label,
  icon,
  isSelected,
  selectedTypes,
  selectType,
  obj
}) => {
  const shouldMinimise = false;
  const selected = isSelected
  return (
    <div
      data-size={shouldMinimise ? "small" : "medium"}
      className={`base-blue featured-gradient tile-${
        shouldMinimise ? "small" : "medium"
      } ${selected ? "selected" : ""} ${selectType && "clickable"}`}
      style={{
        opacity:selected || !selectedTypes ? "1" : ".5"
      }}
      key={label}
      onClick={() => {
        if (selectType) selectType(obj);
      }}
    >
      {
        <React.Fragment>
          {<span className={`td-icon-md icon-${icon} icon`}></span>}
          <span className="branding-bar">{label}</span>
        </React.Fragment>
      }
    </div>
  );
};
