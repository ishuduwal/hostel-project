import React from 'react'

export const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className='footer-description'>
          <h2>Sanoghar</h2>
          <p>Sanoghar is not just a booking platform; it's your dedicated companion in finding the perfect student accommodation. Designed with the unique needs of students in mind, we're here to make your housing search hassle-free, affordable, and filled with positive vibes.
            Sanoghar understands the challenges students face when it comes to finding comfortable and secure accommodation. We're more than a booking website; we're a student-centric community committed to simplifying the housing process for you.
          </p>
        </div>
        <div className='footer-links'>
          <div className='footer-links-top'>
            <div>
              <p className='first-section'><i class="fa-solid fa-location-dot"></i>Address</p>
              <p>Bhaktapur</p>
            </div>
            <div>
              <p className='first-section'><i class="fa-solid fa-phone"></i>Phone</p>
              <p>9999999999</p>
            </div>
            <div>
              <p className='first-section'><i class="fa-solid fa-envelope"></i>Email</p>
              <p>sanoghar@gmail.com</p>
            </div>
          </div>
          <div className='footer-links-bottom'>
            <div>
              <p className='first-section'>Our Services</p>
              <p>Hostel Booking</p>
              <p>About Us</p>
            </div>
            <div className='contact-section'>
              <p>Contact Us</p>
              <div>
                <div><i class="fa-brands fa-facebook"></i></div>
                <div><i class="fa-brands fa-instagram"></i></div>
                <div><i class="fa-brands fa-twitter"></i></div>
                <div><i class="fa-brands fa-youtube"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
