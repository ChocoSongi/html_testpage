import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "../temp/Button.css";

// Fallback components in case Icon or IconComponentNode is not defined
const DefaultIcon = ({ className, color, opacity }) => (
  <div
    className={className}
    style={{
      width: "18px",
      height: "18px",
      backgroundColor: color || "#000",
      opacity: opacity || 1,
      borderRadius: "50%",
    }}
  />
);

const DefaultIconComponentNode = ({ className }) => (
  <div
    className={className}
    style={{
      width: "18px",
      height: "18px",
      backgroundColor: "#ccc",
      borderRadius: "50%",
    }}
  />
);

// Attempt to import Icon and IconComponentNode, fallback to default
let Icon;
let IconComponentNode;

try {
  Icon = require("src/components/temp/Icon").Icon || DefaultIcon;
} catch {
  Icon = DefaultIcon;
}

try {
  IconComponentNode =
    require("src/components/temp/IconComponentNode").IconComponentNode || DefaultIconComponentNode;
} catch {
  IconComponentNode = DefaultIconComponentNode;
}

export const Button = ({
  labelText = "Label",
  style,
  stateProp,
  showIcon,
  className,
  labelTextClassName,
  onClick, // Add onClick prop
}) => {
  const [state, dispatch] = useReducer(reducer, {
    style: style || "filled",
    state: stateProp || "enabled",
    showIcon: showIcon || false,
  });

  return (
    <div
      className={`button ${state.style} ${state.state} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onClick={onClick} // Attach onClick handler here
    >
      <div
        className={`state-layer style-${state.style} state-${state.state} show-icon-${state.showIcon}`}
      >
        {((state.showIcon &&
          state.state === "disabled" &&
          state.style === "elevated") ||
          (state.showIcon &&
            state.state === "disabled" &&
            state.style === "text") ||
          (state.showIcon &&
            state.state === "disabled" &&
            state.style === "tonal") ||
          (state.showIcon && state.state === "enabled") ||
          (state.showIcon && state.state === "focused") ||
          (state.showIcon && state.state === "hovered") ||
          (state.showIcon && state.state === "pressed")) && (
          <Icon
            className="icon-instance"
            color={
              state.state === "disabled"
                ? "#1D1B20"
                : (state.state === "enabled" && state.style === "tonal") ||
                  (state.state === "focused" && state.style === "tonal") ||
                  (state.state === "hovered" && state.style === "tonal") ||
                  (state.state === "pressed" && state.style === "tonal")
                ? "#4A4459"
                : state.style === "filled"
                ? "white"
                : "#65558F"
            }
            opacity={state.state === "disabled" ? "0.38" : undefined}
          />
        )}

        {!state.showIcon && (
          <div className={`label-text ${labelTextClassName}`}>{labelText}</div>
        )}

        {state.showIcon &&
          state.state === "disabled" &&
          ["filled", "outlined"].includes(state.style) && (
            <IconComponentNode className="icon-instance" />
          )}

        {state.showIcon && <div className="text-wrapper">{labelText}</div>}
      </div>
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hovered",
      };

    case "mouse_leave":
      return {
        ...state,
        state: "enabled",
      };

    default:
      return state;
  }
}

Button.propTypes = {
  labelText: PropTypes.string,
  style: PropTypes.oneOf(["filled", "tonal", "elevated", "text", "outlined"]),
  stateProp: PropTypes.oneOf([
    "enabled",
    "focused",
    "pressed",
    "hovered",
    "disabled",
  ]),
  showIcon: PropTypes.bool,
  onClick: PropTypes.func, // Prop type for onClick
};
