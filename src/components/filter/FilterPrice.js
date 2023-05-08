import { useState } from 'react';
import './filter.css';

const FilterPrice = ({
  minimumPrice, 
  setMinimumPrice, 
  maximumPrice, 
  setMaximumPrice
}) => {

    const [checkedPriceOne, setCheckedPriceOne] = useState(false)
    const [checkedPriceTwo, setCheckedPriceTwo] = useState(false)
    const [checkedPriceThree, setCheckedPriceThree] = useState(false)
    const [checkedPriceFour, setCheckedPriceFour] = useState(false)
    const [prices, setPrices] = useState([])

    const price = 'Preço'
    const priceOptions = [
      ' de R$0 até R$30', 
      ' de R$31 até R$50', 
      ' de R$51 até R$100', 
      'Mais de R$100'
    ];
 
    const handlePriceCheck = (checked, setChecked, newMinimumPrice, newMaximumPrice) => {
      setChecked(!checked)

      if (!checked) {
        const updatedPrices = [...prices, {min: newMinimumPrice, max: newMaximumPrice}]
        setPrices(updatedPrices)

        if (updatedPrices.length === 1) {
          setMinimumPrice(newMinimumPrice)
          setMaximumPrice(newMaximumPrice)
        } else {
          const sortedPrices = updatedPrices.sort((firstPrice, secondPrice) => firstPrice.min - secondPrice.min)
          setMinimumPrice(sortedPrices[0].min)
          setMaximumPrice(sortedPrices[sortedPrices.length -1].max)
        }
      }else {
        const filterPrices = prices.slice().filter(price => {
          if (price.min !== newMinimumPrice) {
            return price
          }
        })
        setPrices(filterPrices)
        if (filterPrices.length === 0) {
          setMinimumPrice(0)
          setMaximumPrice(Infinity)
        }
        else if (filterPrices.length === 1) {
          setMinimumPrice(filterPrices[0].min)
          setMaximumPrice(filterPrices[0].max)
        } else {
          const sortedPrices = filterPrices.sort((firstPrice, secondPrice) => firstPrice.min - secondPrice.min)
          setMinimumPrice(sortedPrices[0].min)
          setMaximumPrice(sortedPrices[sortedPrices.length -1].max)
        }
      }

    };

    return (
      <div>
        <p className='price'>{price}</p>

        <div className='options'>

          <label className='filter-label'>
            <input type='checkbox' checked={checkedPriceOne} onChange={() => {
              handlePriceCheck(checkedPriceOne, setCheckedPriceOne, 0, 30)
            }} />
            {priceOptions[0]}</label>

          <label className='filter-label'>
            <input type='checkbox' checked={checkedPriceTwo} onChange={() => {
              handlePriceCheck(checkedPriceTwo, setCheckedPriceTwo, 31, 50)
            }} />
            {priceOptions[1]}</label>

          <label className='filter-label'>
            <input type='checkbox' checked={checkedPriceThree} onChange={() => {
              handlePriceCheck(checkedPriceThree, setCheckedPriceThree, 51, 100)
            }} />
            {priceOptions[2]}</label>

          <label className='filter-label'>
            <input type='checkbox' checked={checkedPriceFour} onChange={() => {
              handlePriceCheck(checkedPriceFour, setCheckedPriceFour, 100, Infinity)
            }} />
            {priceOptions[3]}</label>

        </div>
      </div>
    )
  };

  export default FilterPrice;
