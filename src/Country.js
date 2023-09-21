import { useState,useEffect } from 'react'
import axios from 'axios'


const Country = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [countryName, setCountryName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    // Fetch countries
    axios.get("http://localhost:3500/getCountry")
      .then((response) => {
        console.log(response.data)
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);
// ------------------------------------------------------------------------------------------------------------
  const handleCountryChange = (event) => {
    const xyz = event.target.value;
    const klm = event.target[xyz].text;
    setSelectedCountry(xyz);
    setCountryName(klm)
    console.log(klm)
  }
// ------------------------------------------------------------------------------------------------------------  
  useEffect(()=>{
    if(selectedCountry!="")
    {
      const payload = {
        abcd : selectedCountry
      };     
      axios.post('http://localhost:3500/getState', payload)
      .then(res => {
        setStates(res.data);
        console.log(res)
      });
    }
  },[selectedCountry])
// ----------------------------------------------------------------------------------------------------------------------
  const handleStateChange = (event) => {
    const pqr = event.target.value;
    setSelectedState(pqr);
    console.log(selectedState)
  }
// -------------------------------------------------------------POST DATA-----------------------------------------------
  const postRegister =async()=>{
    await axios.post("http://localhost:3500/sentData",{countryName,selectedState}); 
    console.log(postRegister)
    window.location.reload();
      }


  return (
    <form>
       <div>
      <label htmlFor="country">Country:</label>
      <select id="country" value={selectedCountry} onChange={handleCountryChange}>
        <option value="">--Select a country--</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>  
            {country.name}
          </option> //---Value={country.id}-----This id name must be matched with DB AI id column name---
        ))}
      </select><br/><br/>     
      </div>

      <div>
      <label htmlFor="state">State:</label>
      <select  id="state" value={selectedState} onChange={handleStateChange}>
        <option value="">--Select a state--</option>
        { 
        states.map((data) => (
          <option key={data.id} value={data.name}>
            {data.name}
          </option>
        ))
        }
      </select>
      <div>
        <button onClick={postRegister}>submit</button>
      </div>
      </div>
    </form>
  )
}

export default Country
