import React from "react";

function Button({ className, iconClass, Icon, title, onClick }) {
  return (
    <button className={className} title={title} onClick={onClick}>
      <Icon className={iconClass} />
    </button>
  );
}

export default Button;
