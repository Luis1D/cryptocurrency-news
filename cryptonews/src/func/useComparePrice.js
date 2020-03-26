import {useState, useEffect} from 'react';

function useComparePrice(stats, coin) {
    const [check, setCheck] = useState()
    const sortThroughPrice = (currentPrice, openPrice, coin) => {
        switch(coin) {
            case "BTC":
                if (currentPrice < openPrice) {
                    return setCheck("DOWN");
                } else if (currentPrice > openPrice) {
                    return setCheck("UP");
                } else {
                    return setCheck('naww..')
                }
            case "ETH":
                if (currentPrice < openPrice) {
                    return setCheck("DOWN");
                } else if (currentPrice > openPrice) {
                    return setCheck("UP");
                } else {
                    return setCheck('naww..')
                }
            case "LTC":
                if (currentPrice < openPrice) {
                    return setCheck("DOWN");
                } else if (currentPrice > openPrice) {
                    return setCheck("UP");
                } else {
                    return setCheck('naww..')
                }
            case "XRP":
                if (currentPrice < openPrice) {
                    return setCheck("DOWN");
                } else if (currentPrice > openPrice) {
                    return setCheck("UP");
                } else {
                    return setCheck('naww..')
                }
            default:
                break;
        }; 
    }
    useEffect(() => {
        const currentPrice = stats.PRICE;
        const openPrice = stats.OPENDAY;
        sortThroughPrice(currentPrice, openPrice, coin)
    }, [stats, coin])  
    return [check, sortThroughPrice];
}

export default useComparePrice;