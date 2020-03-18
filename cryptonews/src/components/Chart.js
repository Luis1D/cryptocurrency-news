import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Chart = props => {
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
        scales: {
            yAxes: [{
                gridLines: {
                    display: false
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }
    }
    })
    useEffect(() => {           
            setBTCChart({
                chartBTC: {
                    labels: BTCdates,
                    datasets: [{
                        label: 'Price',
                        data: BTCCloseing,
                        backgroundColor: "#fff1",
                        pointBackgroundColor: "#fff9",
                    }]
                }
            })
            setETHChart({
                chartETH: {
                    labels: ETHdates,
                    datasets: [{
                        label: 'Price',
                        data: ETHCloseing,
                        backgroundColor: "#fff1",
                        pointBackgroundColor: "#fff9",
                    }]
                }
            })
            setLTCChart({
                chartLTC: {
                    labels: LTCdates,
                    datasets: [{
                        label: 'Price',
                        data: LTCCloseing,
                        backgroundColor: "#fff1",
                        pointBackgroundColor: "#fff9",
                    }]
                }
            })
            setXRPChart({
                chartXRP: {
                    labels: XRPdates,
                    datasets: [{
                        label: 'Price',
                        data: XRPCloseing,
                        backgroundColor: "#fff1",
                        pointBackgroundColor: "#fff9",
                    }]
                }
            })
            
    },[BTCdates, BTCCloseing, ETHdates, ETHCloseing, LTCdates, LTCCloseing, XRPdates, XRPCloseing])

    useEffect(() => {
            axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10`)
                .then(res => {
                    const data = res.data.Data.Data;
                    getBTCData(data)
                })
                .catch(err => {
                    console.log("ERROR: ", err);
                })
            axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=10`)
                .then(res => {
                    const data = res.data.Data.Data;
                    getETHData(data)
                })
                .catch(err => {
                    console.log("ERROR: ", err);
                })
            axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=LTC&tsym=USD&limit=10`)
                .then(res => {
                    const data = res.data.Data.Data;
                    getLTCData(data)
                })
                .catch(err => {
                    console.log("ERROR: ", err);
                })
            axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=XRP&tsym=USD&limit=10`)
                .then(res => {
                    const data = res.data.Data.Data;
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
        <h1>BTC</h1>
        { 
        chartBTC.chartBTC.labels.length !== 0 ? 
            <Line 
                data={ chartBTC.chartBTC }
                options= { options.options }
            /> : null
        } 
        <h1>ETH</h1>
        { 
        chartETH.chartETH.labels.length !== 0 ? 
            <Line 
                data={ chartETH.chartETH }
                options= { options.options }
            /> : null
        } 
        <h1>LTC</h1>
        { 
        chartLTC.chartLTC.labels.length !== 0 ? 
            <Line 
                data={ chartLTC.chartLTC }
                options= { options.options }
            /> : null
        }
        <h1>XRP</h1>
        { 
        chartXRP.chartXRP.labels.length !== 0 ? 
            <Line 
                data={ chartXRP.chartXRP }
                options= { options.options }
            /> : null
        }  
        </div>
    )
}

export default Chart;