import React, { useEffect } from 'react';

const MarOverWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
        script.async = true;
        script.innerHTML = JSON.stringify(
            {
  "colorTheme": "dark",
  "dateRange": "12m",
  "showChart": true,
  "locale": "en",
  "width": "100%",
  "height": "100%",
  "largeChartUrl": "",
  "isTransparent": true,
  "plotLineColorGrowing": "rgba(25, 118, 210, 1)",
  "plotLineColorFalling": "rgba(25, 118, 210, 1)",
  "gridLineColor": "rgba(42, 46, 57, 1)",
  "scaleFontColor": "rgba(120, 123, 134, 1)",
  "belowLineFillColorGrowing": "rgba(33, 150, 243, 0.12)",
  "belowLineFillColorFalling": "rgba(33, 150, 243, 0.12)",
  "symbolActiveColor": "rgba(33, 150, 243, 0.12)",
  "tabs": [
    {
      "title": "CRYPTOCURRENCY",
      "symbols": [
        {
          "s": "COINBASE:BTCUSD",
          "d": "BTC/USD"
        },
        {
          "s": "COINBASE:ETHUSD",
          "d": "ETH/USD"
        },
        {
          "s": "COINBASE:LTCUSD",
          "d": "LTC/USD"
        },
        {
          "s": "COINBASE:XRPUSD",
          "d": "XRP/USD"
        },
        {
          "s": "KRAKEN:ADAUSD",
          "d": "ADA/USD"
        },
        {
          "s": "BITFINEX:XMRUSD",
          "d": "XMR/USD"
        },
        {
          "s": "BINANCE:XLMUSD",
          "d": "XLM/USD"
        },
        {
          "s": "BITFINEX:TRXUSD",
          "d": "TRX/USD"
        },
        {
          "s": "KRAKEN:DASHUSD",
          "d": "DASH/USD"
        },
        {
          "s": "BINANCE:IOTAUSD",
          "d": "IOTA/USD"
        },
        {
          "s": "HITBTC:MKRUSD",
          "d": "MKR/USD"
        },
        {
          "s": "BINANCE:DOGEUSD",
          "d": "DOGE/USD"
        },
        {
          "s": "KRAKEN:BATUSD",
          "d": "BAT/USD"
        }
      ]
    }
  ]
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