import {useState, useEffect} from 'react';

function useComparePrice(stats, coin) {
    const [check, setCheck] = useState()
    const sortThroughPrice = (diff, coin) => {
        if (coin) {
            let rawDiff = diff.split(' ').splice(1).join();
            let parsedDiff = parseFloat(rawDiff);
            switch(coin) {
                case "BTC":
                    if (parsedDiff < 0) {
                        return setCheck("DOWN");
                    } else if (parsedDiff > 0) {
                        return setCheck("UP");
                    } else {
                        return setCheck('naww..')
                    }
                case "ETH":
                    if (parsedDiff < 0) {
                        return setCheck("DOWN");
                    } else if (parsedDiff > 0) {
                        return setCheck("UP");
                    } else {
                        return setCheck('naww..')
                    }
                case "LTC":
                    if (parsedDiff < 0) {
                        return setCheck("DOWN");
                    } else if (parsedDiff > 0) {
                        return setCheck("UP");
                    } else {
                        return setCheck('naww..')
                    }
                case "XRP":
                    if (parsedDiff < 0) {
                        return setCheck("DOWN");
                    } else if (parsedDiff > 0) {
                        return setCheck("UP");
                    } else {
                        return setCheck('naww..')
                    }
                default:
                    break;
            }; 
        }
    }
    useEffect(() => {
        const diff = stats.CHANGE24HOUR
        sortThroughPrice(diff, coin)
    }, [stats, coin])  
    return [check, sortThroughPrice];
}

export default useComparePrice;