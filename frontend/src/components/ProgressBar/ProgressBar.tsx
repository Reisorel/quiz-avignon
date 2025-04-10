import React from "react";
import "./ProgressBar.scss";

type Props = {
  answersStatus: ("correct" | "wrong" | "unanswered")[];
};

export default function ProgressBar({ answersStatus }: Props) {
  return (
    <div className="progress-bar">
      {answersStatus.map((status, index) => (
        <div key={index} className={`bar-segment ${status}`} />
      ))}
    </div>
  );
}
