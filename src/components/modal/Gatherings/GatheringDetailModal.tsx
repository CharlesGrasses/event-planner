import React from 'react';

import { Clock, MapPin, Users } from 'lucide-react';

import { ModalFrame } from '@/components/modal';


interface GatheringDetailModalProps {
    isOpen:boolean;
    onClose:any;
    gathering:any;
}


const GatheringDetailModal = (
    {
        isOpen=false,
        onClose,
        gathering
    }: GatheringDetailModalProps
) => {

    if (!gathering) return null;

    return (
        <ModalFrame isOpen={isOpen} onClose={onClose}>
            <div className='p-6'>
                {gathering.image && (
                    <div className='w-full h-48 mb-4 rounded-lg overflow-hidden'>
                        <img src={gathering.image} alt='' className='w-full h-full object-cover' />
                    </div>
                )}

                <h2 className='text-2xl font-bold mb-2 titleText'>
                    {gathering.title}
                </h2>

                <div className='space-y-4 mb-6'>
                    <div className='flex items-center text-[var(--aqua-water-50)]'>
                        <Clock className='h-5 w-5 mr-2' color='var(--aqua-water-40)' />
                        <span>{gathering.time}</span>
                    </div>

                    <div className='flex items-center text-[var(--aqua-water-50)]'>
                        <MapPin className='h-5 w-5 mr-2' color='var(--aqua-water-40)' />
                        <span>{gathering.location}</span>
                    </div>

                    <div className='flex items-center text-[var(--aqua-water-50)]'>
                        <Users className='h-5 w-5 mr-2' color='var(--aqua-water-40)' />
                        <span>{gathering.capacity} publico máximo</span>
                    </div>
                </div>

                <div className='prose max-w-prose'>
                    <p className='text-[var(--aqua-water-60)]'>{gathering.description}</p>
                </div>
            </div>
        </ModalFrame>
    );
};

export { GatheringDetailModal };