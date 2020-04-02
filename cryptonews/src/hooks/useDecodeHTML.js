import {useState, useEffect} from 'react';

const useDecodeHTML = (htmlTxt) => {
    const [decodedTxt, setDecodedTxt] = useState();
    const decodeHTML = (htmlTxt) => {
        let txt = document.createElement('textarea');
        txt.innerHTML = htmlTxt;
        setDecodedTxt(txt.value);
        return txt.value;
    };
    useEffect(() => {
        if(htmlTxt) {
            decodeHTML(htmlTxt);
        }
    },[htmlTxt])
    return [decodedTxt, decodeHTML];
}

export default useDecodeHTML;