import React from 'react';
import './NextButton.scss';

type Props = {
  onNext: () => void;
};

export default function NextButton({ onNext }: Props) {
  return (
    <button className="next-button" onClick={onNext}>
      Question suivante
    </button>
  );
}
