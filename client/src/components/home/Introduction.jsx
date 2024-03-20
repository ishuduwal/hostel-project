import React from 'react'
import './home.scss';
import img2 from '../../assets/about/two.jpg'
export const Introduction = () => {
  return (
    <>
    <div className='introduction-hostel'>
        <div className='left-container'>
            <h1>Introduction</h1>
            <h2>परिचय</h2>
            <p>Sanoghar, a leading hostel organization in Nepal, offers a seamless platform for hostel owners to register their accommodations and students to conveniently book hostel rooms. With its widespread network covering various regions of Nepal, Sanoghar provides a plethora of hostel options, ensuring accessibility and convenience for students across the country. By facilitating this process, Sanoghar aims to simplify the search for suitable accommodations, making the transition for students smoother and ensuring the availability of quality hostel facilities nationwide.</p>
            <span>Unlock Comfort, Discover Convenience: Sanoghar - Your Passport to Hostel Ease Across Nepal.</span>
        </div>
        <div className='right-container'>
            <img src={img2} />
        </div>
    </div>
    </>
  )
}
