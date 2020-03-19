import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "chart.js";
import { Line } from 'react-chartjs-2';

Chart.defaults.global.defaultFontColor = "rgba(0, 0, 0, 0)";
Chart.defaults.global.defaultColor = "rgb(0, 0, 0)";
Chart.defaults.global.elements.line.tension = 0;
// Chart.defaults.global.tooltips.enabled = false;

const ChartComp = props => {
    const priceData = props.priceData;
    const [BTCcheck, setBTCcheck] = useState();
    const [ETHcheck, setETHcheck] = useState();
    const [LTCcheck, setLTCcheck] = useState();
    const [XRPcheck, setXRPcheck] = useState();

    const comparePriceData = (stats, coin) => {
        const currentPrice = stats.PRICE;
        const openPrice = stats.OPENDAY;
        switch(coin) {
            case "BTC":
                if (currentPrice < openPrice) {
                    setBTCcheck("DOWN");
                    return;
                } else if (currentPrice > openPrice) {
                    setBTCcheck("UP");
                    return;
                } else {
                    return null;
                }
                break;
            case "ETH":
                if (currentPrice < openPrice) {
                    setETHcheck("DOWN");
                    return;
                } else if (currentPrice > openPrice) {
                    setETHcheck("UP");
                    return;
                } else {
                    return null;
                }
                break;
            case "LTC":
                if (currentPrice < openPrice) {
                    setLTCcheck("DOWN");
                    return;
                } else if (currentPrice > openPrice) {
                    setLTCcheck("UP");
                    return;
                } else {
                    return null;
                }
                break;
            case "XRP":
                if (currentPrice < openPrice) {
                    setXRPcheck("DOWN");
                    return;
                } else if (currentPrice > openPrice) {
                    setXRPcheck("UP");
                    return;
                } else {
                    return null;
                }
                break;
            default:
                break;
        };        
        return;
    }

    const [BTCprice, setBTCPrice] = useState();
    const [BTCdates, setBTCDates] = useState([]);
    const [BTCCloseing, setBTCClosing] = useState([]);
    const [chartBTC, setBTCChart] = useState({
        chartBTC: {
            labels: [],
            datasets: [{
                label: 'Price',
                data: [],
                backgroundColor: 'red'
            }]
        }
    })
    const [ETHprice, setETHPrice] = useState();
    const [ETHdates, setETHDates] = useState([]);
    const [ETHCloseing, setETHClosing] = useState([]);
    const [chartETH, setETHChart] = useState({
        chartETH: {
            labels: [],
            datasets: [{
                label: 'Price',
                data: [],
                backgroundColor: 'red'
            }]
        }
    })
    const [LTCprice, setLTCPrice] = useState();
    const [LTCdates, setLTCDates] = useState([]);
    const [LTCCloseing, setLTCClosing] = useState([]);
    const [chartLTC, setLTCChart] = useState({
        chartLTC: {
            labels: [],
            datasets: [{
                label: 'Price',
                data: [],
                backgroundColor: 'red'
            }]
        }
    })
    const [XRPprice, setXRPPrice] = useState();
    const [XRPdates, setXRPDates] = useState([]);
    const [XRPCloseing, setXRPClosing] = useState([]);
    const [chartXRP, setXRPChart] = useState({
        chartXRP: {
            labels: [],
            datasets: [{
                label: 'Price',
                data: [],
                backgroundColor: 'red'
            }]
        }
    })
    const [options] = useState({
        options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: { display: false },
                gridLines: {
                    display: true
                }
            }],
            xAxes: [{
                ticks: { display: false },
                gridLines: {
                    display: true
                }
            }],
        },
        legend: {
             display: false,
        },
        layout: {
            padding: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        }
    }
    })
    useEffect(() => {        
            comparePriceData(priceData.BTC.USD,"BTC");
            comparePriceData(priceData.ETH.USD,"ETH")
            comparePriceData(priceData.LTC.USD,"LTC")
            comparePriceData(priceData.XRP.USD,"XRP")
            setBTCChart({
                chartBTC: {
                    labels: BTCdates,
                    datasets: [{
                        label: 'Price',
                        data: BTCCloseing,
                        backgroundColor: "rgba(96, 170, 255,.75)",
                        pointBackgroundColor: "rgba(0, 0, 0, 0)",
                        pointBorderColor: "rgba(0, 0, 0, 0)",
                    }],
                }
            })
            setETHChart({
                chartETH: {
                    labels: ETHdates,
                    datasets: [{
                        label: 'Price',
                        data: ETHCloseing,
                        backgroundColor: "rgba(96, 170, 255,.75)",
                        pointBackgroundColor: "rgba(0, 0, 0, 0)",
                        pointBorderColor: "rgba(0, 0, 0, 0)",
                    }]
                }
            })
            setLTCChart({
                chartLTC: {
                    labels: LTCdates,
                    datasets: [{
                        label: 'Price',
                        data: LTCCloseing,
                        backgroundColor: "rgba(96, 170, 255,.75)",
                        pointBackgroundColor: "rgba(0, 0, 0, 0)",
                        pointBorderColor: "rgba(0, 0, 0, 0)",
                    }]
                }
            })
            setXRPChart({
                chartXRP: {
                    labels: XRPdates,
                    datasets: [{
                        label: 'Price',
                        data: XRPCloseing,
                        backgroundColor: "rgba(96, 170, 255,.75)",
                        pointBackgroundColor: "rgba(0, 0, 0, 0)",
                        pointBorderColor: "rgba(0, 0, 0, 0)",
                    }]
                }
            })
            
    },[BTCdates, BTCCloseing, ETHdates, ETHCloseing, LTCdates, LTCCloseing, XRPdates, XRPCloseing, priceData.BTC.USD, priceData.ETH.USD, priceData.LTC.USD, priceData.XRP.USD,])

    useEffect(() => {
            axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10`)
                .then(res => {
                    const data = res.data.Data.Data;
                    const latestPrice = Math.floor(data[10].close);
                    setBTCPrice(latestPrice);
                    getBTCData(data)
                })
                .catch(err => {
                    console.log("ERROR: ", err);
                })
            axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=10`)
                .then(res => {
                    const data = res.data.Data.Data;
                    const latestPrice = Math.floor(data[10].close);
                    setETHPrice(latestPrice);
                    getETHData(data)
                })
                .catch(err => {
                    console.log("ERROR: ", err);
                })
            axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=LTC&tsym=USD&limit=10`)
                .then(res => {
                    const data = res.data.Data.Data;
                    const latestPrice = Math.floor(data[10].close);
                    setLTCPrice(latestPrice);
                    getLTCData(data)
                })
                .catch(err => {
                    console.log("ERROR: ", err);
                })
            axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=XRP&tsym=USD&limit=10`)
                .then(res => {
                    const data = res.data.Data.Data;
                    const latestPrice = data[10].close;
                    setXRPPrice(latestPrice);
                    getXRPData(data)
                })
                .catch(err => {
                    console.log("ERROR: ", err);
                })
    },[])
    
    const getBTCData = coin => {
        const dateArray = [];
        const closingPriceArray = [];
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
            setBTCDates(dateArray)
        })
        setBTCClosing(closingPriceArray);
    }

    const getETHData = coin => {
        const dateArray = [];
        const closingPriceArray = [];
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
            setETHDates(dateArray)
        })
        setETHClosing(closingPriceArray);
    }
    const getLTCData = coin => {
        const dateArray = [];
        const closingPriceArray = [];
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
            setLTCDates(dateArray)
        })
        setLTCClosing(closingPriceArray);
    }
    const getXRPData = coin => {
        const dateArray = [];
        const closingPriceArray = [];
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
            setXRPDates(dateArray)
        })
        setXRPClosing(closingPriceArray);
    }

    return (
        <div className="chart">
            <div className="container">
                <div className="stats-container">
                    <h1>BTC</h1>
                    <img
                        className="coin-logo"
                        src={ require('../assets/bitcoin.svg') }
                        alt="Coin Logo"
                    />
                </div>
                <div className="price-container">
                    {
                        BTCcheck === "UP" ? <img src={ require('../assets/up.svg') } alt="UP" className="arrow up" /> : <img src={ require('../assets/down.svg') }alt="UP" className="arrow" />
                    }
                    <span className="current-price">$ { BTCprice }</span>       
                </div>
                <div className="chart-container">
                    { 
                    BTCCloseing.length !== 0 ? 
                        <Line 
                            data={ chartBTC.chartBTC }
                            options= { options.options }
                            className="chart-item"
                        /> : null
                    } 
                </div>
            </div>
            <div className="container">
                <div className="stats-container">
                    <h1>ETH</h1>
                    <img
                        className="coin-logo"
                        src={ require('../assets/ethereum.svg') }
                        alt="Coin Logo"
                    />
                </div>
                <div className="price-container">
                    {
                        ETHcheck === "UP" ? <img src={ require('../assets/up.svg') } alt="UP" className="arrow up" /> : <img src={ require('../assets/down.svg') }alt="UP" className="arrow" />
                    }      
                    <span className="current-price">$ { ETHprice }</span>
                </div>
                <div className="chart-container">
                    { 
                    chartETH.chartETH.labels.length !== 0 ? 
                        <Line 
                            data={ chartETH.chartETH }
                            options= { options.options }
                            className="chart-item"
                        /> : null
                    } 
                </div>
            </div>
            <div className="container">
                <div className="stats-container">
                    <h1>LTC</h1>
                    <img
                        className="coin-logo"
                        src={ require('../assets/litecoin.svg') }
                        alt="Coin Logo"
                    />
                </div>
                <div className="price-container">
                    {
                        LTCcheck === "UP" ? <img src={ require('../assets/up.svg') } alt="UP" className="arrow up" /> : <img src={ require('../assets/down.svg') }alt="UP" className="arrow" />
                    }       
                    <span className="current-price">$ { LTCprice }</span>
                </div>
                <div className="chart-container">
                    { 
                    chartLTC.chartLTC.labels.length !== 0 ? 
                        <Line 
                            data={ chartLTC.chartLTC }
                            options= { options.options }
                            className="chart-item"
                        /> : null
                    }
                </div>
            </div>
            <div className="container">
                <div className="stats-container">
                    <h1>XRP</h1>
                    <img
                        className="coin-logo"
                        src={ require('../assets/ripple.svg') }
                        alt="Coin Logo"
                    />
                </div>
                <div className="price-container">
                    {
                        XRPcheck === "UP" ? <img src={ require('../assets/up.svg') } alt="UP" className="arrow up" /> : <img src={ require('../assets/down.svg') }alt="UP" className="arrow" />
                    }       
                    <span className="current-price">$ { XRPprice }</span>
                </div>
                <div className="chart-container">
                    { 
                    chartXRP.chartXRP.labels.length !== 0 ? 
                        <Line 
                            data={ chartXRP.chartXRP }
                            options= { options.options }
                            className="chart-item"
                        /> : null
                    }  
                </div>
            </div>
        </div>
    )
}

export default ChartComp;