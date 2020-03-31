import React, { useEffect } from 'react';

const MarOverWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
        script.async = true;
        script.innerHTML = JSON.stringify(
            {
                "width": "100%",
                "height": "400",
                "defaultColumn": "overview",
                "screener_type": "crypto_mkt",
                "displayCurrency": "USD",
                "colorTheme": "dark",
                "locale": "en",
                "isTransparent": true
            }
        );
        const div = document.getElementById('MarOverWidget');
        div.appendChild(script);
    },[])
    return (
        <div id="MarOverWidget">
            <div class="tradingview-widget-container">
                <div class="tradingview-widget-container__widget"></div>
            </div>
        </div>
    )
}

export default MarOverWidget;