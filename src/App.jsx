import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import "./App.css";

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState("");

  // Use the custom hook
  const [currencyInfo, availableCurrencies, loading] = useCurrencyInfo(from);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (!loading && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  const options = availableCurrencies;

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    
    style={{
      backgroundImage: `url('https://media.istockphoto.com/id/913219882/photo/financial-graph-on-technology-abstract-background.jpg?s=1024x1024&w=is&k=20&c=h6c_LIS0b8FzoC66WfcXIP2CQp3YIS6mKoFTguMoJBg=')`,
  }}>
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
            <InputBox
  label="From"
  amount={amount}
  CurrencyOptions={options}
  onCurrencyChange={(currency) => setFrom(currency)} // Update 'from' currency
  selectCurrency={from} // Sets the selected currency
  onAmountChange={(amount) => setAmount(amount)} // Updates the entered amount
/>

            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount} // Shows the converted result
                CurrencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)} // Update 'to' currency
                selectCurrency={to} // Sets the selected currency
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import useCurrencyInfo from './hooks/useCurrencyInfo';

// function App() {
//   const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Default to USD
//   const [currencyInfo, availableCurrencies, loading] = useCurrencyInfo(selectedCurrency);

//   // Handle currency selection change
//   const handleCurrencyChange = (e) => {
//     setSelectedCurrency(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Currency Converter</h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {/* Dropdown with options from availableCurrencies */}
//           <select onChange={handleCurrencyChange} value={selectedCurrency}>
//             {availableCurrencies.map((currency) => (
//               <option key={currency} value={currency}>
//                 {currency}
//               </option>
//             ))}
//           </select>

//           <h2>Conversion Rates (Base: {selectedCurrency})</h2>
//           <ul>
//             {Object.keys(currencyInfo).map((currency) => (
//               <li key={currency}>
//                 {currency}: {currencyInfo[currency]}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
