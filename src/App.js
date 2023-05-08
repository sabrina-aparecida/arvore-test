import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './components/header';
import FilterPrice from './components/filter/FilterPrice';
import FilterAvailability from './components/filter/FilterAvailability';
import FilterFormat from './components/filter/FilterFormat';
import SearchResult from './components/search/SearchResult';
import './App.css';

function App() {
  const apiKey = `${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`

  const [dataArray, setImageUrlArray,] = useState([]);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(Infinity);
  const [enableToSale, setEnableToSale] = useState(null);
  const [format, setFormat] = useState(null);
  const [busca, setBusca] = useState('');

  const getGoogleBooksApi = () => {
    axios.get('https://www.googleapis.com/books/v1/volumes?q=' + busca + '&key=' + apiKey + '&maxResults=40')
      .then(response => {
        let items = [];
        const data = response.data.items;

        if ((minimumPrice !== 0 || maximumPrice < Infinity)) {
          data.map((item) => {
            if ((item.saleInfo?.retailPrice?.amount > minimumPrice) && (item.saleInfo?.retailPrice?.amount < maximumPrice)) {
              if (item?.accessInfo?.epub?.isAvailable && format === 'e-pub') {
                items.push(item)
              }
              else if (item?.accessInfo?.pdf?.isAvailable && format === 'PDF') {
                items.push(item)
              }
              else if (format === null) { items.push(item) }
            }

          })
          setImageUrlArray(items)

        } else {
          data.map((item) => {


            if (item?.accessInfo?.epub?.isAvailable && format === 'e-pub') {
              items.push(item)
            }
            else if (item?.accessInfo?.pdf?.isAvailable && format === 'PDF') {
              items.push(item)
            }
            else if (format === null) {items.push(item)}
          })
          setImageUrlArray(items)
        }

      })
      .catch((e) => { console.error(e) })

  };

  let resultTo = `Resultados para "${busca}"`;
  const filter = 'Filtro';

  useEffect(() => {
    getGoogleBooksApi();
  }, [busca, minimumPrice, maximumPrice, enableToSale, format]);


  return (
    <div className='App'>
      <NavBar busca={busca} setBusca={setBusca} />

      <div className='results'>

        <div className='filter-title'>
          <p className='filter-title-style'> {filter} </p>
          <FilterPrice
            minimumPrice={minimumPrice}
            setMinimumPrice={setMinimumPrice}
            setMaximumPrice={setMaximumPrice}
            maximumPrice={maximumPrice}
          />
          <FilterFormat setFormat={setFormat} />
        </div >

        <div className='result' >
          <p className='search-result'> {resultTo}:</p>
          <SearchResult dataArray={dataArray} />
        </div>
      </div>

    </div>
  );
};

export default App;
