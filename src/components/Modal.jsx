import React from 'react';

const Modal = ({ modal, setModal }) => {
  if (!modal.show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={() => setModal({ ...modal, show: false })}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold mb-2">{modal.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4">{modal.message}</p>
        <button
          onClick={() => setModal({ ...modal, show: false })}
          className="w-full px-4 py-2 bg-teal-600 text-white rounded-md font-semibold hover:bg-teal-700 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;

 
