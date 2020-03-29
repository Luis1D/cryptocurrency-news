import {useState, useEffect} from 'react';

function useComparePrice(stats, coin) {
    const [check, setCheck] = useState()
    const sortThroughPrice = (diff, coin) => {
        if (diff) {
            switch(coin) {
                case "BTC":
                    let currentBTC = diff.BTC.USD.CHANGE24HOUR;
                    let rawDiffBTC = currentBTC.split(' ').splice(1).join();
                    let parsedDiffBTC = parseFloat(rawDiffBTC);
                    if (parsedDiffBTC < 0) {
                        return setCheck("DOWN");
                    } else if (parsedDiffBTC > 0) {
                        return setCheck("UP");
                    } else {
                        return setCheck('naww..')
                    }
                    break;
                case "ETH":
                    let currentETH = diff.ETH.USD.CHANGE24HOUR;
                    let rawDiffETH = currentETH.split(' ').splice(1).join();
                    let parsedDiffETH = parseFloat(rawDiffETH);
                    if (parsedDiffETH < 0) {
                        return setCheck("DOWN");
                    } else if (parsedDiffETH > 0) {
                        return setCheck("UP");
                    } else {
                        return setCheck('naww..')
                    }
                    break;
                case "LTC":
                    let currentLTC = diff.LTC.USD.CHANGE24HOUR;
                    let rawDiffLTC = currentLTC.split(' ').splice(1).join();
                    let parsedDiffLTC = parseFloat(rawDiffLTC);
                    if (parsedDiffLTC < 0) {
                        return setCheck("DOWN");
                    } else if (parsedDiffLTC > 0) {
                        return setCheck("UP");
                    } else {
                        return setCheck('naww..')
                    }
                    break;
                case "XRP":
                    let currentXRP = diff.XRP.USD.CHANGE24HOUR;
                    let rawDiffXRP = currentXRP.split(' ').splice(1).join();
                    let parsedDiffXRP = parseFloat(rawDiffXRP);
                    if (parsedDiffXRP < 0) {
                        return setCheck("DOWN");
                    } else if (parsedDiffXRP > 0) {
                        return setCheck("UP");
                    } else {
                        return setCheck('naww..')
                    }
                    break;
                default:
                    break;
            }; 
        }
        return;
    }
    useEffect(() => {
        sortThroughPrice(stats,coin);
    }, [stats, coin])  
    return [check, setCheck];
}

export default useComparePrice;