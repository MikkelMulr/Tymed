import React from 'react';
import './EditTimer.style.scss';

function EditTimer() {
  return (
    <div className="EditTimer">
      <i className="fas fa-power-off toggle"><span className="EditTimer--on">ON</span></i>
      <i className="far fa-trash-alt delete"></i>
    </div>
  )
}

export default EditTimer;