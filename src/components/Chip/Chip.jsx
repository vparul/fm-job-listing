import React from "react";

const Chip = ({ item, onClick, isRemoveEnabled, onRemoveClick }) => (
  <div className="flex mr-2">
    <div
      key={item}
      className={`bg-cyan-100 font-spartan flex items-center text-cyan-500 text-xs px-2 py-1 font-bold ${
        isRemoveEnabled
          ? "rounded-tr-0 rounded-br-0"
          : "rounded hover:bg-cyan-500 hover:text-white cursor-pointer "
      }`}
      onClick={onClick}
    >
      {item}
    </div>
    {isRemoveEnabled && (
      <img
        src="/assets/icons/remove.svg"
        alt="remove"
        className="bg-cyan-500 p-2 rounded-tr rounded-br hover:bg-cyan-900 cursor-pointer"
        onClick={() => onRemoveClick(item)}
      />
    )}
  </div>
);

export default Chip;
