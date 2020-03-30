import { useState, useEffect } from 'react';

function useDateConversion(date) {
    console.log(date)
    const [myDate, setDate] = useState()
    const convertDate = num => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let date = new Date(num * 1000);
        let year = date.getFullYear();
        let month = months[date.getMonth()];
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let convertedDate = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2);
        setDate(convertedDate);
    }
    useEffect(() => {
        convertDate(date);
    },[date])
    return [myDate, convertDate];
}

export default useDateConversion;