import { useState, useEffect } from 'react';

function useHistData(coin) {
    const [coinDates, setCoinDates] = useState();
    const dateArray = [];
    const closingPriceArray = [];
    
    const loopCoinData = (coin) => {
        if (coin) {
            coin.forEach(obj => {
                // GRAB CLOSING PRICE
                const closeingPrice = obj.close;
                const dates = obj.time;
                closingPriceArray.push(closeingPrice)
                // TIME CONVERSION
                let date = new Date(dates * 1000);
                let hours = date.getHours();
                let minutes = "0" + date.getMinutes();                 
                // TIME LAYOUT CONVERSION
                if (hours < 12) {
                    const amHours = hours + ':' + minutes + 'AM';
                    dateArray.push(amHours)
                } else if (hours === 12) {
                    const noon = hours + ':' + minutes + 'PM';
                    dateArray.push(noon)
                } else if (hours >= 13) {
                    const pmHours = hours - 12 + ':' + minutes + "PM";
                    dateArray.push(pmHours)
                }
                setCoinDates(dateArray)
            })    
        }
    }
    useEffect(() => {
        loopCoinData(coin);
    }, [coin])
    return [coinDates, setCoinDates];
}

export default useHistData;