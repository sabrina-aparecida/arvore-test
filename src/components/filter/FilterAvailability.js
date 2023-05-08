import { useEffect, useState } from 'react';
import './filter.css';

const FilterAvailability = ({ enableToSale, setEnableToSale }) => {

  const [checkedEnable, setCheckedEnable] = useState(false);
  const [checkedDesable, setCheckedDesable] = useState(false);
  const [options, setOptions] = useState([false, false]);

  
  const handleCheckEnable = (checked, setChecked, checkedEnable, checkedDesable) => {
    setChecked(!checked)
    setOptions([!checkedEnable, checkedDesable])
  }

  const handleCheckDesable = (checked, setChecked, checkedEnable, checkedDesable) => {
    setChecked(!checked)
    setOptions([checkedEnable, !checkedDesable])
  }

  useEffect(() => {
    const updateEnableToSale = (options) => {
      if (options[0] === options[1]) {
        setEnableToSale(null)
      } else if(options[0]) {
        setEnableToSale(true)
  
      } else if (options[1]) {
        setEnableToSale(false)
      }
    };
    updateEnableToSale(options);
  }, [options]);



  return (
    <div >
      <p className='price'> Disponibilidade para a venda</p>

      <div className='options'>


        <label className='filter-label'>
          <input type='checkbox' checked={checkedEnable} onChange={() => handleCheckEnable(checkedEnable, setCheckedEnable, checkedEnable, checkedDesable)} />
          Disponível</label>

        <label className='filter-label'>
          <input type='checkbox' checked={checkedDesable} onChange={() => handleCheckDesable(checkedDesable, setCheckedDesable, checkedEnable, checkedDesable)} />
          Indisponível</label>
      </div>
    </div>
  )
};

export default FilterAvailability;