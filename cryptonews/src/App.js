import React, {useState, useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header.js';
import Article from './components/Article.js';
import ChartComp from './components/ChartComp';
import FeaturedArticles from './components/FeaturedArticles';
import Home from './components/Home';
import Footer from './components/Footer';
import priceContext from './contexts/priceContext';
import articleContext from './contexts/articleContext';
import priceFeedContext from './contexts/priceFeedContext';
import './styles/app.scss';

function App() {
  const [batchOne, setBatchOne] = useState();
  const [latestArticle, setLatestArticle] = useState();
  const [featuredPost, setFeaturedPost] = useState();

  const [priceData, setPriceData] = useState();
  const [BTCprice, setBTCPrice] = useState();
  const [ETHprice, setETHPrice] = useState();
  const [LTCprice, setLTCPrice] = useState();
  const [XRPprice, setXRPPrice] = useState();

  const [BTCpriceFeed, setBTCPriceFeed] = useState();
  const [ETHpriceFeed, setETHPriceFeed] = useState();
  const [LTCpriceFeed, setLTCPriceFeed] = useState();
  const [XRPpriceFeed, setXRPPriceFeed] = useState();

  useEffect(() => {
    // GRABS NEWS DATA
    axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
      .then(res => {
        const myData = res.data.Data;
        const batchOneArt = myData.slice(0,4);
        const batchTwo = myData.slice(5,8);
        setBatchOne(batchOneArt);
        setFeaturedPost(batchTwo);
        setLatestArticle(myData[0])
      })
      .catch(err => {
          console.log("ERROR: ", err);
      })

    // GRABS CURRENT PRICE DATA
    axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,XRP,ADA&tsyms=USD,EUR')
      .then(res => {
        const myData = res.data.DISPLAY;
        setPriceData(myData);
      })
      .catch(err => {
        console.log("ERROR: ", err);
      })

      // GRABS 24HR PRICE DATA
    axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=24`)
      .then(res => {
        const data = res.data.Data.Data;
        const latestPrice = Math.floor(data[24].close);
        setBTCPrice(latestPrice);
        setBTCPriceFeed(data);
        // getBTCData(data)
        // setCoinHistData(data);
      })
      .catch(err => {
        console.log("ERROR: ", err);
      })
    axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=24`)
      .then(res => {
          const data = res.data.Data.Data;
          const latestPrice = Math.floor(data[24].close);
          setETHPrice(latestPrice);
          setETHPriceFeed(data);
          // getETHData(data)
      })
      .catch(err => {
          console.log("ERROR: ", err);
      })
      axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=LTC&tsym=USD&limit=24`)
        .then(res => {
            const data = res.data.Data.Data;
            const latestPrice = Math.floor(data[24].close);
            setLTCPrice(latestPrice);
            setLTCPriceFeed(data);
            // getLTCData(data)
        })
        .catch(err => {
            console.log("ERROR: ", err);
        })
      axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=XRP&tsym=USD&limit=24`)
        .then(res => {
            const data = res.data.Data.Data;
            const latestPrice = data[24].close;
            setXRPPrice(latestPrice);
            setXRPPriceFeed(data);
            // getXRPData(data)
        })
        .catch(err => {
            console.log("ERROR: ", err);
        })
      // window.onscroll = function() {myFunction()};
  },[]);

//   function myFunction() {
//     let header = document.getElementById("myHeader");
//     let sticky = header.offsetTop;

//     if (window.pageYOffset > sticky) {
//       header.classList.add("sticky");
//     } else {
//       header.classList.remove("sticky");
//     }
// }
//  BTCpriceFeed, ETHpriceFeed, LTCpriceFeed, XRPpriceFeed
  return (
    <div className="App">
      <priceContext.Provider value={priceData}>
      <priceFeedContext.Provider value={{ BTCpriceFeed, ETHpriceFeed, LTCpriceFeed, XRPpriceFeed }}>
      <articleContext.Provider value={{ batchOne, latestArticle }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/Article" component={Article} />
          <Route path="/Charts" component={ChartComp} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </articleContext.Provider>
      </priceFeedContext.Provider>
      </priceContext.Provider>
    </div>
  );
}

export default App;