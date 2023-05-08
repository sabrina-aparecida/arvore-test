import { useState, useEffect } from "react";

const FilterFormat = ({setFormat}) => {

  const ePub = 'e-pub';
  const pdf = 'PDF';

  const [checkedEpub, setCheckedEnable] = useState(false);
  const [checkedPDF, setCheckedDesable] = useState(false);
  const [options, setOptions] = useState([false, false]);

  const handleFormatEPub = (checked, setChecked, checkedEpub, checkedPDF) => {
    setChecked(!checked)
    setOptions([!checkedEpub, checkedPDF])
  }

  const handleFormatPDF = (checked, setChecked, checkedEpub, checkedPDF) => {
    setChecked(!checked)
    setOptions([checkedEpub, !checkedPDF])
  }

  
  useEffect(() => {
    const updateFormat = (options) => {
      if (options[0] === options[1]) {
        setFormat(null)
      } else if(options[0]) {
        setFormat('e-pub')
  
      } else if (options[1]) {
        setFormat('PDF')
      }
    };
    updateFormat(options);

  }, [options]);

    return (
      <div >
        <p className='price'>Formatos disponíveis</p>
        <div className='options'>

          <label className='filter-label'>
            <input type="checkbox" checked={checkedEpub} onChange={() => handleFormatEPub(checkedEpub, setCheckedEnable, checkedEpub, checkedPDF)} />
            {ePub}</label>

          <label className='filter-label'>
            <input type="checkbox" checked={checkedPDF} onChange={() => handleFormatPDF(checkedPDF, setCheckedDesable, checkedEpub, checkedPDF)} />
           {pdf}</label>

        </div>
      </div>
    )
  };

export default FilterFormat;