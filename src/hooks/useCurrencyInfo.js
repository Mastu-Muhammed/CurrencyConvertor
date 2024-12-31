// function hello() {
//      return[var1,var2]
// } this is also a custom hook
// CUSTOM HOOK => function which returns a array and inside array there are 2(two) variables
import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [currencyInfo, setCurrencyInfo] = useState({});
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencyInfo(data.rates);
        setAvailableCurrencies(Object.keys(data.rates)); // Available currencies from the API
        setLoading(false);
      })
      .catch(() => {
        setLoading(false); // Handle error gracefully
      });
  }, [currency]);

  return [currencyInfo, availableCurrencies, loading];
}

export default useCurrencyInfo;
