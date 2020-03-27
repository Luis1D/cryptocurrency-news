import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "chart.js";
import { Line } from 'react-chartjs-2';
import useComparePrice from '../hooks/useComparePrice.js';
import useHistData from '../hooks/useHistData.js';
import useClosingPrice from '../hooks/useClosingPrice.js';

Chart.defaults.global.defaultFontColor = "rgba(0, 0, 0, 0)";
Chart.defaults.global.defaultColor = "rgb(0, 0, 0)";
Chart.defaults.global.elements.line.tension = 0;
// Chart.defaults.global.tooltips.enabled = false;

const ChartComp = props => {
    const priceData = props.priceData;
    const [BTCcheck] = useComparePrice(priceData.BTC.USD,"BTC");
    const [ETHcheck] = useComparePrice(priceData.ETH.USD,"ETH");
    const [LTCcheck] = useComparePrice(priceData.LTC.USD,"LTC");
    const [XRPcheck] = useComparePrice(priceData.XRP.USD,"XRP");

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
    const [BTCHistData] = useHistData(props.BTCpriceFeed)
    const [ETHHistData] = useHistData(props.ETHpriceFeed)
    const [LTCHistData] = useHistData(props.LTCpriceFeed)
    const [XRPHistData] = useHistData(props.XRPpriceFeed)

    const [BTCCloseing] = useClosingPrice(props.BTCpriceFeed);
    const [ETHCloseing] = useClosingPrice(props.ETHpriceFeed);
    const [LTCCloseing] = useClosingPrice(props.LTCpriceFeed);
    const [XRPCloseing] = useClosingPrice(props.XRPpriceFeed);

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
            
    },[BTCHistData, BTCCloseing, ETHHistData, ETHCloseing, LTCHistData, LTCCloseing, XRPHistData, XRPCloseing])

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
                    <span className="current-price">$ { props.BTCprice }</span>       
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
                    <span className="current-price">$ { props.ETHprice }</span>
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
                    <span className="current-price">$ { props.LTCprice }</span>
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
                    <span className="current-price">$ { props.XRPprice }</span>
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
        </div>
    )
}

export default ChartComp;