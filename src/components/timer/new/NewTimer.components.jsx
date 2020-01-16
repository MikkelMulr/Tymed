import React from 'react';
import './NewTimer.style.scss';

function NewTimer() {
  return (
    <div className="NewTimer">
      <h2>Create new Timer</h2>
      <input className="NewTimer--input" type="text" placeholder="name of medication" />
      <div className="NewTimer--time">
        <select name="hour" className="NewTimer--select">
          <option value="12">12</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>

        <select name="min" className="NewTimer--select">
          <option value="0">00</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
          <option value="45">45</option>
          <option value="50">50</option>
          <option value="55">55</option>
        </select>

        <select name="ampm" className="NewTimer--select">
          <option value="0">am</option>
          <option value="1">pm</option>
        </select>
        <select name="repeat" className="NewTimer--select">
          <option value="hourly">hourly</option>
          <option value="daily">daily</option>
        </select>
      </div>

      <i className="far fa-check-circle NewTimer--btn"></i>
    </div>
  )
}

export default NewTimer;