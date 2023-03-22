import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import './App.css'
import ListGroup from 'react-bootstrap/ListGroup';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  handleSubmit = async (e) => {
   e.preventDefault();
  //TODO: USE AXIOS to hit the api (backend)
  //TODO: Set info to state
   try {
    //http://localhost:3001/weather?city_name=Seattle
    let url = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.city}`

    let cityData = await axios.get(url);

    console.log(cityData.data);

   } catch (error) {
    console.log(error.message);
   }
  }

  // ** async/await - handle our asynchronous code
  // ** try/catch - handle our errors - TRY resolve our successful promises & CATCH handle rejected promise

  getCityData = async (event) => {
    event.preventDefault();

    try {
      // TODO: Use axios to get the data from LocationIQ - using city in state
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);

      console.log(cityDataFromAxios.data[0])

      // TODO: Set State with the data that comes back from axios & set error boolean to false
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });

    } catch (error) {

      // TODO: Set state with the error boolean and the error message
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

  }

  // *** MAP PORTION OF YOUR LAB IMG SRC POINTS TO THIS URL: 
  // *** https://maps.locationiq.com/v3/staticmap?key=<YOUR API KEY>&center=<CITY'S LAT>,<CITY'S LON>&zoom=13

  render() {
    return (
      <>
        <h1>Type Your City in the Search Box!</h1>

        <form onSubmit={this.getCityData}>
          <label > Enter in a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>

        {/* TERNARY - WTF  */}
        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : Object.keys(this.state.cityData).length > 0 &&
            <ListGroup variant="flush">
              <p id="title">{this.state.cityData.display_name}</p>
              <Image class="img-fluid" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='Map of selected location' />
              <p>{this.state.cityData.lon}</p>
              <p>{this.state.cityData.lat}</p>
              </ListGroup>
          
        }
      </>
    )
  }
}

export default App;
