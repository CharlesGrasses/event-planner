export enum GatheringCategory {
    SOCIAL = 'social',
    BUSINESS = 'business',
    CONCERT = 'concert',
    CONFERENCE = 'conference',
    PARTY = 'party',
    OTHER = 'other'
}

// Interface for location information
export interface GatheringLocation {
    venue: string;
    address: string;
    city: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
}

// Interface for time-related information
export interface GatheringTime {
    startTime: Date;
    endTime: Date;
    timezone: string;
}

// The main Gathering interface
export interface Gathering {
    id: string;
    title: string;
    description: string;
    category?: GatheringCategory;
    time: string; // change to GatheringTime;
    location: string; // change to GatheringLocation;
    organizer?: {
        id: string;
        name: string;
        contact: string;
    };
    capacity: number, // change to:
    /*capacity: {
        min?: number;
        max: number;
        current?: number;
    };*/
    ageRestriction?: {
        minimum: number;
        maximum?: number;
    };
    featured?: boolean;
    imageUrl?: string;
    isFavorited?: boolean;
    price?: {
        amount: number;
        currency: string;
    };
    status?: 'draft' | 'published' | 'cancelled' | 'completed';
    createdAt?: Date;
    updatedAt?: Date;
}

// Type for the response when fetching gatherings
export type GatheringsResponse = {
    gatherings: Gathering[];
    totalCount: number;
    pageSize: number;
    currentPage: number;
};

// Type for filtering gatherings
export type GatheringFilters = {
    startDate?: Date;
    endDate?: Date;
    category?: GatheringCategory;
    searchQuery?: string;
    favoritesOnly?: boolean;
    minPrice?: number;
    maxPrice?: number;
};