import { useState, useEffect } from 'react';

function useClosingPrice(coin) {
    const [coinClosing, setCoinClosing] = useState();
    const closingPriceArray = [];
    
    const loopCoinData = (coin) => {
        if (coin) {
            coin.forEach(obj => {
                const closeingPrice = obj.close;
                closingPriceArray.push(closeingPrice)
            })    
            setCoinClosing(closingPriceArray);
        }
    }
    useEffect(() => {
        loopCoinData(coin);
    }, [coin])
    return [coinClosing, loopCoinData];
}

export default useClosingPrice;