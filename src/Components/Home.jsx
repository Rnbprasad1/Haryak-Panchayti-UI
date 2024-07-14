import React from 'react'
import apMapImage from '././ApMap.jpg';
import Footer from './Footer'

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <img src={apMapImage} alt="Map" style={{ maxWidth: '100%', height: 'auto', margin: 'auto' }} />
      <br></br>
<br></br>     
<br></br> 
<br></br><Footer />
    </div>
  )
}

export default Home