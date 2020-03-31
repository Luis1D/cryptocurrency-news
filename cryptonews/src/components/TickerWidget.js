import React, { useEffect } from 'react';

const TickerWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbols": [
                {
                "description": "BTC/USDT",
                "proName": "BINANCE:BTCUSDT"
                },
                {
                "description": "ETH/USDT",
                "proName": "BINANCE:ETHUSDT"
                },
                {
                "description": "LTC/USDT",
                "proName": "BINANCE:LTCUSDT"
                },
                {
                "description": "XRP/USDT",
                "proName": "BINANCE:XRPUSDT"
                },
                {
                "description": "ADA/USDT",
                "proName": "BINANCE:ADAUSDT"
                }
            ],
            "colorTheme": "dark",
            "isTransparent": true,
            "displayMode": "adaptive",
            "locale": "en"
        });
        const div = document.querySelector('.tradingview-widget-container__widget');
        div.appendChild(script);
    },[])
    return (
        <div id="TickerWidget">

            <div className="tradingview-widget-container">
            <div className="tradingview-widget-container__widget"></div>
            {/* <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com" rel="noopener" target="_blank"><span class="blue-text">Ticker Tape</span></a> by TradingView</div>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
            {
            "symbols": [
                {
                "description": "BTC/USDT",
                "proName": "BINANCE:BTCUSDT"
                },
                {
                "description": "ETH/USDT",
                "proName": "BINANCE:ETHUSDT"
                },
                {
                "description": "LTC/USDT",
                "proName": "BINANCE:LTCUSDT"
                },
                {
                "description": "XRP/USDT",
                "proName": "BINANCE:XRPUSDT"
                },
                {
                "description": "ADA/USDT",
                "proName": "BINANCE:ADAUSDT"
                }
            ],
            "colorTheme": "dark",
            "isTransparent": true,
            "displayMode": "adaptive",
            "locale": "en"
            }
            </script> */}
            </div>
        </div>
    )
}

export default TickerWidget;