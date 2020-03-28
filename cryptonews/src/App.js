import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Article from './components/Article.js';
import ChartComp from './components/ChartComp';
import FeaturedArticles from './components/FeaturedArticles';
import Footer from './components/Footer';
import './styles/app.scss';

function App() {
  const [articleCollection, setArticleCollection] = useState();
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
        const batchOne = myData.slice(0,4);
        const batchTwo = myData.slice(5,8);
        setArticleCollection(batchOne);
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
        console.log(myData)
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

  return (
    <div className="App">
      <header>
        <div className="logo-wrapper">
          <h1>CND</h1>
        </div>
      </header>


        {
          priceData ? <ChartComp 
            priceData = { priceData }
            BTCprice = { BTCprice }
            ETHprice = { ETHprice }
            LTCprice = { LTCprice }
            XRPprice = { XRPprice }

            BTCpriceFeed = { BTCpriceFeed }
            ETHpriceFeed = { ETHpriceFeed }
            LTCpriceFeed = { LTCpriceFeed }
            XRPpriceFeed = { XRPpriceFeed }
          /> :  <img
                    src={ require('./assets/Ellipsis-3.4s-167px.svg') }
                    alt="Loading..."
                    className="loading-spinner"
                />
        }

          <div className="article-feed">
            { latestArticle ? articleCollection.map(article => {
              return <Article 
                      latestArticle = {latestArticle.id}
                      source={ article.source_info.name }
                      date={ article.published_on }
                      title={article.title}
                      url={ article.guid }  
                      img={ article.imageurl }
                      preview={ article.body }
                      id={ article.id }
                      key={ article.id }
                    />
            }) : <div className="loading-page">
                  <img
                    src={ require('./assets/Ellipsis-3.4s-167px.svg') }
                    alt="Loading..."
                    className="loading-spinner"
                  />
                </div>}
          </div>
          {
            featuredPost ? <FeaturedArticles 
              featuredPost = { featuredPost }
            /> : null
          }
          <Footer />
    </div>
  );
}

export default App;