import React, {useEffect, useState} from 'react'
import { GoArrowSwitch } from "react-icons/go";
import axios from 'axios';
const App = () => {

  const [Amount, setAmount] = useState("")
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [Currency, setCurrency] = useState([]);
  const [option, setOption] = useState([])
  const [Output, setOutput] = useState("")

  useEffect(()=>{
    axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
    .then((res)=> setCurrency(res?.data[from]))
    .catch((err)=> console.log(err))
  })

  useEffect(()=>{
    setOption(Object.keys(Currency))
  },[Currency])

  const Convert = ()=>{
    const rate = Currency[to];
    setOutput(Amount *  rate)
  }

  console.log(option)
  return (
    <div className="container">
      <div className='main_container'>

        <div className="Title">
          <h1>Currency Converted!</h1>
        </div>

        <div className="inp_frame">

          <div className="currency_inp">
            <label htmlFor="">Amount:
              <input type="Number" placeholder='AMT' onChange={(e) => setAmount(e.target.value)} />
            </label>
          </div>

          <div className="from">
            <label htmlFor="">From:</label>
            <select onChange={(e) => setFrom(e.target.value)}>
              {
                option?.map((value, i) => {
                  return (
                    <option key={i}>{value}</option>
                  )
                })
              }
            </select>
          </div>

          <div className="switch">
            <GoArrowSwitch />
          </div>

          <div className="To">
            <label htmlFor="">To:</label>
            <select onChange={(e) => setTo(e.target.value)}>
              {
                option?.map((value, i) => {
                  return (
                    <option key={i}>{value}</option>
                  )
                })
              }
            </select>
          </div>
        </div>

        <div className="convert_btn">
          <button onClick={Convert}>Convert</button>
        </div>

        <div className="output">
          <h1>{Amount + from + "=" + Output + to}</h1>
        </div>

      </div>
    </div>
  )
}

export default App
