import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Chart = props => {
    const [dates, setDates] = useState([]);
    const [closeing, setClosing] = useState([]);
    const currency = props.currentCurrency.latest.name;
    const [chartData, setChartData] = useState({
        chartData: {
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
            setChartData({
                chartData: {
                    labels: dates,
                    datasets: [{
                        label: 'Price',
                        data: closeing,
                        backgroundColor: "#fff1",
                        pointBackgroundColor: "#fff9",
                    }]
                }
            })
    },[dates, closeing])

    useEffect(() => {
        if(currency !== "LATEST") {
            axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${currency}&tsym=USD&limit=10`)
                .then(res => {
                    const data = res.data.Data.Data;
                    const dateArray = [];
                    const closingPriceArray = [];
                    data.forEach(obj => {
                        const closeingPrice = obj.close;
                        const dates = obj.time;
                        closingPriceArray.push(closeingPrice)

                        let date = new Date(dates * 1000);
                        let hours = date.getHours();
                        let minutes = "0" + date.getMinutes();
                        
                        if(hours < 12) {
                            const amHours = hours + ':' + minutes + 'AM';
                            dateArray.push(amHours)
                        } else if (hours === 12) {
                            const noon = hours + ':' + minutes + 'PM';
                            dateArray.push(noon)
                        } else if (hours >= 13) {
                            const pmHours = hours - 12 + ':' + minutes + "PM";
                            dateArray.push(pmHours)
                        }
                        setDates(dateArray)
                    })
                    setClosing(closingPriceArray);
                    
                })
                .catch(err => {
                    console.log("ERROR: ", err);
                })
        }
    },[currency])
    
    return (
        <div className="chart">
        { chartData.chartData.labels.length !== 0 ? 
        <Line 
            data={ chartData.chartData }
            options= { options.options }
            
        /> : null
        } 
        </div>
    )
}

export default Chart;