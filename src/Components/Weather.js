
import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
  render() {

    return (
      <section className='cards'>
        {this.props.weatherData.map((day, idx) => {
          return (

              <Card key={idx} style={{ width: '15rem' }}>
                <Card.Body>

                  <Card.Title>{day.date}</Card.Title>
                  <Card.Text>{day.description}</Card.Text>

                </Card.Body>
              </Card>


          )
        })}

      </section>
    )

  }
}

export default Weather;