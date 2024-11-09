import React, { useEffect, useState } from 'react';
import UpcomingItinerariesList from '../../components/itinerary/UpcomingItinerariesList';
import ItinerarySearch from '../../components/itinerary/ItinerarySearch';
 import ItineraryFilter from '../../components/itinerary/ItineraryFilter';
import ItinerarySort from '../../components/itinerary/ItinerarySort';
import TouristNavBar from "../../components/navbar/TouristNavBar";

import { message } from 'antd';
import { getTouristItineraries} from "../../api/TouristService";
import { cancelResource } from "../../api/BookingService";
import { touristId } from "../../IDs";
import { getConversionRate } from '../../api/ExchangeRatesService'; 

const ItineraryPage = () => {
    const [itineraries, setItineraries] = useState([]);
    const [filteredItineraries, setFilteredItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currency, setCurrency] = useState("EGP");
    const [exchangeRate, setExchangeRate] = useState(1); 

    useEffect(() => {
        const curr = sessionStorage.getItem("currency");
        if (curr) {
            setCurrency(curr); 
            fetchExchangeRate(curr); 
        }
    }, []);

    const fetchExchangeRate = async (curr) => {
        try {
            const rate = await getConversionRate(curr);
            setExchangeRate(rate);
        } catch (error) {
            message.error("Failed to fetch exchange rate.");
        }
    };
    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await getTouristItineraries(touristId);
                setItineraries(response);
                setFilteredItineraries(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItineraries();
    }, []);

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredItineraries(itineraries);
            return;
        }

        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = itineraries.filter(itinerary =>
            itinerary.title.toLowerCase().includes(lowercasedTerm) ||
            itinerary.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
        );

        setFilteredItineraries(filtered);
    };

    const handleSort = (sortOption) => {
        let sortedItineraries = [...filteredItineraries];

        switch (sortOption) {
            case 'priceAsc':
                sortedItineraries.sort((a, b) => (a.price * exchangeRate) - (b.price * exchangeRate));
                break;
            case 'priceDesc':
                sortedItineraries.sort((a, b) => (b.price * exchangeRate) - (a.price * exchangeRate));
                break;
            case 'ratingAsc':
                sortedItineraries.sort((a, b) => a.averageRating - b.averageRating);
                break;
            case 'ratingDesc':
                sortedItineraries.sort((a, b) => b.averageRating - a.averageRating);
                break;
            default:
                break;
        }

        setFilteredItineraries(sortedItineraries);
    };

    const handleFilter = (filters) => {
        const { startDate, endDate, budgetMin, budgetMax, preferences, language } = filters;

        if (!startDate && !endDate && !budgetMin && !budgetMax && !preferences && !language) {
            setFilteredItineraries(itineraries);
            return;
        }

        const filtered = itineraries.filter(itinerary => {
            const itineraryDates = itinerary.availableDates.map(date => new Date(date));
            const itineraryBudget = itinerary.price * exchangeRate; 
            const itineraryLanguage = itinerary.language;

            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            const isDateValid = itineraryDates.some(date => {
                const isWithinStart = !start || date >= start;
                const isWithinEnd = !end || date <= end;
                return isWithinStart && isWithinEnd;
            });

            const isBudgetValid =
                (!budgetMin || itineraryBudget >= budgetMin) &&
                (!budgetMax || itineraryBudget <= budgetMax);
            
            const isPreferencesValid = !preferences || 
                preferences.split(',').some(pref => {
                    const normalizedPref = pref.trim().toLowerCase();
                    return itinerary.activities.some(activity => 
                        activity.tags.some(tag => tag.name.toLowerCase() === normalizedPref)
                    );
                });
            
            const isLanguageValid = 
                !language || 
                (itineraryLanguage && itineraryLanguage.toLowerCase() === language.toLowerCase());

            return isDateValid && isBudgetValid && isPreferencesValid && isLanguageValid;
        });

        setFilteredItineraries(filtered);
    };
    
    const handleCancelBooking = async ({ itineraryId, touristId }) => {
        try {
            await cancelResource('itinerary', itineraryId, touristId);
            message.success('Booking cancelled successfully');
            
            setItineraries(itineraries.filter(itinerary => itinerary._id !== itineraryId));
            setFilteredItineraries(filteredItineraries.filter(itinerary => itinerary._id !== itineraryId));
        } catch (err) {
            message.error('Failed to cancel booking');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="page-container">
            <TouristNavBar />
            <div className="page-title">My Itineraries</div>
            <ItinerarySearch onSearch={handleSearch} />
            <div className="filter-sort-list">
                <div className="filter-sort">
                    <ItineraryFilter onFilter={handleFilter} />
                    <ItinerarySort onSort={handleSort} />
                </div>    
                <UpcomingItinerariesList itineraries={filteredItineraries} onCancel={handleCancelBooking} curr={currency} cancel={'diana'} page={'history'}/>
            </div>
        </div>
    );
};

export default ItineraryPage;
