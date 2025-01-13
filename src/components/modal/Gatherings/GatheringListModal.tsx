"use client";

import React, { useState } from "react";

import { Clock } from "lucide-react";

import { Assorted } from "@/services/common";

import Modal from "@/components/modal/ModalContainer";
import GatheringDetailModal from "@/components/modal/Gatherings/GatheringDetailModal";

const GatheringListModal = (
    {
        locale = 'en-US',
        isOpen = false,
        onClose = null,
        selectedDate = null,
        gatherings = null 
    } : {
        locale: string,
        isOpen: boolean,
        onClose:any,
        selectedDate: Date | null,
        gatherings: any,
    }
) => {
    const DateFormatter = Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const [selectedGathering, setSelectedGathering] = useState(null);
    const dateTitle = selectedDate ? Assorted.toUpperCaseFirstLetter(DateFormatter.format(selectedDate)) : null;
    
    const handleGatheringClick = (gathering: any) => {
        setSelectedGathering(gathering);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className='p-6'>
                    <h2 className='text-2xl font-bold mb-4 titleText'>
                        {dateTitle}
                    </h2>

                    <div className='overflow-y-auto custom-scrollbar modalGatheringList'>
                        {gatherings && gatherings.length > 0 ? (
                            gatherings.map((gathering:any) => (
                                <button
                                    key={gathering.id}
                                    onClick={() => handleGatheringClick(gathering)}
                                    className='w-full text-left p-4 mb-2 rounded-lg transition-colors border group modalGatheringListItem'
                                >
                                    <div className='flex justify-between items-start'>
                                        <div>
                                            <h3 className='font-semibold text-lg titleText'>
                                                {gathering.title}
                                            </h3>
                                            <div className='flex items-center mt-2'>
                                                <Clock className='h-4 w-4 mr-2' color='var(--aqua-water-40)' />
                                                <span className='aquaSubtext'>{gathering.time}</span>
                                            </div>
                                        </div>
                                        <span className='text-[var(--aqua-water-40)] opacity-0 group-hover:opacity-100'>
                                            Ver detalles →
                                        </span>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className='text-center py-8 titleText'>
                                <p>No se encontró ningún evento para esta fecha</p>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>

            <GatheringDetailModal
                isOpen={!!selectedGathering}
                onClose={() => setSelectedGathering(null)}
                gathering={selectedGathering}
            />
        </>
    );
};

export default GatheringListModal;