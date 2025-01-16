import React from 'react';

export default function Janela ({ isOpen, onClose, children }) {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times; 
        </button>
        {children} 
      </div>
    </div>
  );
};


