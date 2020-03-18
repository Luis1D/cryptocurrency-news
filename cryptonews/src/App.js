import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Article from './components/Article.js';
import Chart from './components/Chart';
import './styles/app.scss';

function App() {
  const [articleCollection, setArticleCollection] = useState();
  const [latestArticle, setLatestArticle] = useState()
  const [collectionDuplicate, setDuplicateCollection] = useState();
  const [currentFilter, setCurrentFilter] = useState("ALL");
  const [ticker, setTicker] = useState();
  const [currentCurrency, setCurrentCurrency] = useState({
      "latest": { name: "BTC", price: "", lastDay: "", supply: "", high: "", low: "", cap: "", volume: "" }
  });

  // if (ticker) {
  //   const myCoin = ticker.RAW.forEach(coin => console.log("COIN",coin))
  //   console.log("TICKER:",myCoin)
  //   // console.log("TICKER: ",ticker.RAW)
  // } else {
  //   console.log("UNDEFINED")
  // }

  useEffect(() => {
    axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
      .then(res => {
        const myData = res.data.Data;
        setArticleCollection(myData);
        setDuplicateCollection(myData);
        setLatestArticle(myData[0])
        // console.log("RES: ", myData);
      })
      .catch(err => {
          console.log("ERROR: ", err);
      })

    axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,XRP,ADA&tsyms=USD,EUR')
      .then(res => {
        const myData = res.data;
        setTicker(myData);
      })
      .catch(err => {
        console.log("ERROR: ", err);
      })
      window.onscroll = function() {myFunction()};
  },[]);

  function myFunction() {
    let header = document.getElementById("myHeader");
    let sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
}

  const filterBTC = () => {
    if(articleCollection) {
      setArticleCollection([
        ...collectionDuplicate.filter(catg => catg.categories.includes("BTC"))
      ]);
      setCurrentFilter("BTC");
      const BTC = ticker.DISPLAY.BTC.USD;
      setCurrentCurrency({
        "latest": {
          name: "BTC",
          price: BTC.PRICE,
          lastDay: BTC.CHANGE24HOUR,
          supply: BTC.SUPPLY,
          high: BTC.HIGH24HOUR,
          low: BTC.LOW24HOUR,
          cap: BTC.MKTCAP,
          volume: BTC.TOTALVOLUME24H,
        } 
      });
    }
  }

  const filterETH = () => {
    if(articleCollection) {
      setArticleCollection([
        ...collectionDuplicate.filter(catg => catg.categories.includes("ETH"))
      ]);
      setCurrentFilter("ETH");
      const ETH = ticker.DISPLAY.ETH.USD;
      setCurrentCurrency({
        "latest": {
          name: "ETH",
          price: ETH.PRICE,
          lastDay: ETH.CHANGE24HOUR,
          supply: ETH.SUPPLY,
          high: ETH.HIGH24HOUR,
          low: ETH.LOW24HOUR,
          cap: ETH.MKTCAP,
          volume: ETH.TOTALVOLUME24H,
        } 
      });
    }
  }

  const filterLTC = () => {
    if(articleCollection) {
      setArticleCollection([
        ...collectionDuplicate.filter(catg => catg.categories.includes("LTC"))
      ]);
      setCurrentFilter("LTC");
      const LTC = ticker.DISPLAY.LTC.USD;
      setCurrentCurrency({
        "latest": {
          name: "LTC",
          price: LTC.PRICE,
          lastDay: LTC.CHANGE24HOUR,
          supply: LTC.SUPPLY,
          high: LTC.HIGH24HOUR,
          low: LTC.LOW24HOUR,
          cap: LTC.MKTCAP,
          volume: LTC.TOTALVOLUME24H,
        } 
      });
    }
  }

  const filterXRP = () => {
    if(articleCollection) {
      setArticleCollection([
        ...collectionDuplicate.filter(catg => catg.categories.includes("XRP"))
      ]);
      setCurrentFilter("XRP");
      const XRP = ticker.DISPLAY.XRP.USD;
      setCurrentCurrency({
        "latest": {
          name: "XRP",
          price: XRP.PRICE,
          lastDay: XRP.CHANGE24HOUR,
          supply: XRP.SUPPLY,
          high: XRP.HIGH24HOUR,
          low: XRP.LOW24HOUR,
          cap: XRP.MKTCAP,
          volume: XRP.TOTALVOLUME24H,
        } 
      });
    }
  }
  const filterADA = () => {
    if(articleCollection) {
      setArticleCollection([
        ...collectionDuplicate.filter(catg => catg.categories.includes("ADA"))
      ]);
      setCurrentFilter("ADA");
      const ADA = ticker.DISPLAY.ADA.USD;
      setCurrentCurrency({
        "latest": {
          name: "ADA",
          price: ADA.PRICE,
          lastDay: ADA.CHANGE24HOUR,
          supply: ADA.SUPPLY,
          high: ADA.HIGH24HOUR,
          low: ADA.LOW24HOUR,
          cap: ADA.MKTCAP,
          volume: ADA.TOTALVOLUME24H,
        } 
      });
    }
  }

  const filterButton = () => {
    switch(currentFilter) {
      case "BTC":
        return "btc-filter-btn";
      case "ETH":
        return "eth-filter-btn";
      case "LTC":
        return "ltc-filter-btn";
      case "XRP":
        return "XRP-filter-btn";
      case "ADA":
        return "ADA-filter-btn";
      default:
        return "flex";
    }
  }

  const checkPrice = currentPrice => {
    const priceString = currentPrice.CHANGE24HOUR.split('$ ')[1];
    const price = parseInt(priceString, 10);
    if(price > 0) {
      return "currency-up";
    } else {
      return "currency-down";
    }
  }

  const findLogo = () => {
    switch(currentFilter) {
      case "BTC":
        return "bitcoin.svg";
      case "ETH":
        return "ethereum.svg";
      case "LTC":
        return "litecoin.svg";
      case "XRP":
        return "ripple.svg";
      case "ADA":
        return "network.svg"
      default:
        return "network.svg";
    }
  }

  const checkPriceCard = () => {
    const priceString = currentCurrency.latest.lastDay.split('$ ')[1];
    const price = parseInt(priceString, 10);
    if(price > 0) {
      return "currency-stats-container-up";
    } else if(currentCurrency.latest.name === "LATEST") {
      return "butt";
    } else {
      return "currency-stats-container";
    }
  }

  return (
    <div className="App">
      <header>
        <div className="logo-wrapper">
          {/* <img src={ require('./assets/cnd.svg') } alt="logo" /> */}
          {/* <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
          <h1>Crypto News & Data</h1>
        </div>
        <div className="menu-wrapper">
          {/* <img src={ require('./assets/menu.svg') } alt="menu" /> */}
          {/* <div>Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
        </div>
      </header>
      <div id="myHeader">
        {/************ PRICE TICKERS ************/}
        {/* <div className="price-ticker-container">
          {
            ticker ? 
            <section id="filters-container">
              <div className={ filterButton() }>
              <ul>
                <div className="btn"><li onClick={ filterBTC } className={ checkPrice(ticker.DISPLAY.BTC.USD) }><span className="btc-btn filter-btn">BTC</span><span className="ticker">{ ticker.DISPLAY.BTC.USD.MEDIAN }</span></li></div>
                <div className="btn"><li onClick={ filterETH } className={ checkPrice(ticker.DISPLAY.ETH.USD) }><span className="eth-btn filter-btn">ETH</span><span className="ticker">{ ticker.DISPLAY.ETH.USD.MEDIAN }</span></li></div>
                <div className="btn"><li onClick={ filterLTC } className={ checkPrice(ticker.DISPLAY.LTC.USD) }><span className="ltc-btn filter-btn">LTC</span><span className="ticker">{ ticker.DISPLAY.LTC.USD.MEDIAN }</span></li></div>
                <div className="btn"><li onClick={ filterXRP } className={ checkPrice(ticker.DISPLAY.XRP.USD) }><span className="XRP-btn filter-btn">XRP</span><span className="ticker">{ ticker.DISPLAY.XRP.USD.MEDIAN }</span></li></div>
                <div className="btn"><li onClick={ filterADA } className={ checkPrice(ticker.DISPLAY.ADA.USD) }><span className="ADA-btn filter-btn">ADA</span><span className="ticker">{ ticker.DISPLAY.ADA.USD.MEDIAN }</span></li></div>
              </ul>
              </div>
            </section>
              : null
          }
        </div> */}
        </div>

      {/* ********** ARTICLE SECTION ************/}
      {/* {articleCollection ?
      <div className="article-container">
        <div className={ checkPriceCard() }>
          <div className="stats-header">
            {currentFilter !== "ALL" ? <img className="currency-logo" src={ require(`./assets/${findLogo()}`) } alt="currency logo"/> : null}
            <div>
              <h1>{ currentCurrency.latest.name }</h1>
              <h3>{ currentCurrency.latest.price }</h3>
            </div>
          </div>
          { currentCurrency.latest.price == "" ?
          <div>
            <div className="cont">
              <div className="currency-stats">
                <h3><span>24HR DIF</span>{ currentCurrency.latest.lastDay }</h3>
                <h3><span>24HR HIGH</span>{ currentCurrency.latest.high }</h3>
                <h3><span>24HR LOW</span>{ currentCurrency.latest.low }</h3>
                <h3><span>CAP</span>{ currentCurrency.latest.cap }</h3>
              </div>
              </div>
              <Chart 
                currentCurrency={ currentCurrency }
              />
              </div>

            : null
          } */}
        {/* </div> */}
        <Chart 
          currentCurrency={ currentCurrency }
        />
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
        }) : null}
        {/* </div> */}
      : 
        {/* // LOADING... */}
        <div className="loading-page">
          <h2>LOADING...</h2>
        </div>}
    </div>
  );
}

export default App;