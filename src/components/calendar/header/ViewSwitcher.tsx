import React, { useState, useRef, useEffect } from 'react';
import { ViewIcon, Calendar as CalendarIcon, Clock as ClockIcon, LayoutIcon } from 'lucide-react';
import { CalendarView } from '@/types/calendar';

interface ViewSwitcherProps {
    currentView: CalendarView;
    onViewChange: (view: CalendarView) => void;
}

const ViewSwitcher = ({ currentView, onViewChange }: ViewSwitcherProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const viewConfigs = {
        month: { label: 'Month', icon: CalendarIcon },
        week: { label: 'Week', icon: ClockIcon },
        day: { label: 'Day', icon: LayoutIcon }
    };

    const handleViewSelect = (view: CalendarView) => {
        onViewChange(view);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-full transition-colors iconClickable"
                aria-label="Change calendar view"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span className="text-[var(--aqua-water-20)]">{viewConfigs[currentView].label}</span>
                <ViewIcon className="h-6 w-6" color="var(--aqua-water-20)" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg modalContainer border border-[var(--ocean-50)] z-50">
                    <div className="py-1">
                        {Object.entries(viewConfigs).map(([view, config]) => {
                            const ViewIconComponent = config.icon;
                            return (
                                <button
                                    key={view}
                                    className={`flex items-center w-full px-4 py-2 text-left transition-colors ${
                                        currentView === view
                                            ? 'text-[var(--aqua-water-10)] bg-[var(--aqua-water-60)]'
                                            : 'text-[var(--aqua-water-60)] hover:bg-[var(--aqua-water-10)] hover:bg-opacity-10'
                                    }`}
                                    onClick={() => handleViewSelect(view as CalendarView)}
                                >
                                    <ViewIconComponent className="h-5 w-5 mr-2" />
                                    {config.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewSwitcher;