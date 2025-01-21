import React from 'react';

import { X } from 'lucide-react';


interface ModalProps {
    isOpen:boolean;
    onClose:any;
    children:any;
}


const ModalFrame = (
    {
        isOpen=false,
        onClose,
        children
    }:ModalProps
) => {

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center transition-opacity modalBackground'>
            <div className='rounded-lg w-full max-w-2xl mx-4 relative transition-transform modalContainer'>
                <button
                    onClick={onClose}
                    className='absolute right-4 top-4 p-2 rounded-full iconClickable'
                    aria-label='Cerrar modal'
                >
                    <X className='h-6 w-6' color='var(--aqua-water-60)' />
                </button>
                {children}
            </div>
        </div>
    );
};

export { ModalFrame };