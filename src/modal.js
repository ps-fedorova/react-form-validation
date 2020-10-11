import React from 'react';

function Modal(props)  {
    return (
      <div className='modal'>
        <div className='modal-content'>
          <div className="modal-title">{props.text}</div>
          <div>
            <div className="modal-label">
              <div>Имя: </div>
              <div className="modal-input-value">{props.firstName}</div>
            </div>
            <div className="modal-label">
              <div>Фамилия: </div>
              <div className="modal-input-value">{props.lastName}</div>
            </div>
            <div className="modal-label">
              <div>Email: </div>
              <div className="modal-input-value">{props.email}</div>
            </div>
          </div>
          <button className="modal-btn" onClick={props.closeModal}>Close</button>
        </div>
      </div>
    );
  
};
 
export default Modal;
  