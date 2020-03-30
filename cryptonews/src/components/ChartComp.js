import React, { useState, useEffect, useContext } from 'react';
import Chart from "chart.js";
import { Line } from 'react-chartjs-2';
import useComparePrice from '../hooks/useComparePrice.js';
import useHistData from '../hooks/useHistData.js';
import useClosingPrice from '../hooks/useClosingPrice.js';
import priceContext from '../contexts/priceContext';
import priceFeedContext from '../contexts/priceFeedContext';

// GLOBAL SETTINGS FOR CHARTS.JS
Chart.defaults.global.defaultFontColor = "rgba(0, 0, 0, 0)";
Chart.defaults.global.defaultColor = "rgb(0, 0, 0)";
Chart.defaults.global.elements.line.tension = 0;
Chart.defaults.global.tooltips.enabled = false;

const ChartComp = () => {
    const priceData = useContext(priceContext);
    // CHECKS IF CURRENCY IS UP OR DOWN FROM THE LAST 24HRS
    const [BTCcheck, setBTCcheck] = useComparePrice(priceData, "BTC");
    const [ETHcheck, setETHcheck ] = useComparePrice(priceData, "ETH");
    const [LTCcheck, setLTCcheck] = useComparePrice(priceData, "LTC");
    const [XRPcheck, setXRPcheck] = useComparePrice(priceData, "XRP");
    // CREATES AND FORMATS TIMES FOR EACH PRICE SET
    const { BTCpriceFeed, ETHpriceFeed, LTCpriceFeed, XRPpriceFeed } = useContext(priceFeedContext);
    const [BTCHistData, setBTCHistData] = useHistData(BTCpriceFeed);
    const [ETHHistData, setETHHistData] = useHistData(ETHpriceFeed);
    const [LTCHistData, setLTCHistData] = useHistData(LTCpriceFeed);
    const [XRPHistData, setXRPHistData] = useHistData(XRPpriceFeed);
    // GRABS THE CLOSING PRICE FROM THE LAST 24HRS
    const [BTCCloseing, setBTCCloseing] = useClosingPrice(BTCpriceFeed);
    const [ETHCloseing, setETHCloseing] = useClosingPrice(ETHpriceFeed);
    const [LTCCloseing, setLTCCloseing] = useClosingPrice(LTCpriceFeed);
    const [XRPCloseing, setXRPCloseing] = useClosingPrice(XRPpriceFeed);

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
            setBTCChart({
                chartBTC: {
                    labels: BTCHistData,
                    datasets: [{
                        label: 'Price',
                        data: BTCCloseing,
                        borderColor: "rgba(96, 170, 255,.75)",
                        pointBackgroundColor: "rgba(0, 0, 0, 0)",
                        pointBorderColor: "rgba(0, 0, 0, 0)",
                    }],
                }
            })
            setETHChart({
                chartETH: {
                    labels: ETHHistData,
                    datasets: [{
                        label: 'Price',
                        data: ETHCloseing,
                        borderColor: "rgba(96, 170, 255,.75)",
                        pointBackgroundColor: "rgba(0, 0, 0, 0)",
                        pointBorderColor: "rgba(0, 0, 0, 0)",
                    }]
                }
            })
            setLTCChart({
                chartLTC: {
                    labels: LTCHistData,
                    datasets: [{
                        label: 'Price',
                        data: LTCCloseing,
                        borderColor: "rgba(96, 170, 255,.75)",
                        pointBackgroundColor: "rgba(0, 0, 0, 0)",
                        pointBorderColor: "rgba(0, 0, 0, 0)",
                    }]
                }
            })
            setXRPChart({
                chartXRP: {
                    labels: XRPHistData,
                    datasets: [{
                        label: 'Price',
                        data: XRPCloseing,
                        borderColor: "rgba(96, 170, 255,.75)",
                        pointBackgroundColor: "rgba(0, 0, 0, 0)",
                        pointBorderColor: "rgba(0, 0, 0, 0)",
                    }]
                }
            })
            
    },[priceData, BTCpriceFeed, BTCHistData, BTCCloseing, ETHpriceFeed, ETHHistData, ETHCloseing, LTCpriceFeed, LTCHistData, LTCCloseing, XRPpriceFeed, XRPHistData, XRPCloseing])

    return (
        <div className="chart">
        { priceData ? <div className="chart-grid">
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
                    <span className="current-price">{ priceData.BTC.USD.PRICE }</span>       
                </div>
                <div className="chart-container">
                    { 
                    BTCCloseing ? 
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
                    <span className="current-price">{ priceData.ETH.USD.PRICE }</span>
                </div>
                <div className="chart-container">
                    { 
                    chartETH ? 
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
                    <span className="current-price">{ priceData.LTC.USD.PRICE }</span>
                </div>
                <div className="chart-container">
                    { 
                    chartLTC ? 
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
                    <span className="current-price">{ priceData.XRP.USD.PRICE }</span>
                </div>
                <div className="chart-container">
                    { 
                    chartXRP ? 
                        <Line 
                            data={ chartXRP.chartXRP }
                            options= { options.options }
                            className="chart-item"
                        /> : null
                    }  
                </div>
            </div>
            </div> : <img
              src={ require('../assets/Ellipsis-3.4s-167px.svg') }
              alt="Loading..."
              className="loading-spinner"
            />
        }
        </div>
    )
}

export default ChartComp;