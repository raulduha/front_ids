import React from 'react';
import './Footer.css';
import { Button } from "./Button.jsx"
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading' style={{ color: '#fff' }}>
          Conócenos!
        </p>
        <p className='footer-subscription-text' style={{ color: '#fff' }}>
                    
        </p>
        
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2 style={{ color: '#fff' }}>About Us</h2>
            <Link to='/' style={{ color: '#fff' }}>How it works</Link>
            <Link to='/' style={{ color: '#fff' }}>Testimonials</Link>
            <Link to='/' style={{ color: '#fff' }}>Careers</Link>
            <Link to='/' style={{ color: '#fff' }}>Investors</Link>
            <Link to='/' style={{ color: '#fff' }}>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h2 style={{ color: '#fff' }}>Contact Us</h2>
            <Link to='/' style={{ color: '#fff' }}>Contact</Link>
            <Link to='/' style={{ color: '#fff' }}>Support</Link>
            <Link to='/' style={{ color: '#fff' }}>Destinations</Link>
            <Link to='/' style={{ color: '#fff' }}>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2 style={{ color: '#fff' }}>Videos</h2>
            <Link to='/' style={{ color: '#fff' }}>Submit Video</Link>
            <Link to='/' style={{ color: '#fff' }}>Ambassadors</Link>
            <Link to='/' style={{ color: '#fff' }}>Agency</Link>
            <Link to='/' style={{ color: '#fff' }}>Influencer</Link>
          </div>
          <div className='footer-link-items'>
            <h2 style={{ color: '#fff' }}>Social Media</h2>
            <Link to='/' style={{ color: '#fff' }}>Instagram</Link>
            <Link to='/' style={{ color: '#fff' }}>Facebook</Link>
            <Link to='/' style={{ color: '#fff' }}>Youtube</Link>
            <Link to='/' style={{ color: '#fff' }}>Twitter</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo' style={{ color: '#fff' }}>
              Data Fusion
              <i className='fab fa-teamspeak' />
            </Link>
          </div>
          <small className='website-rights' style={{ color: '#fff' }}>Machine Learners © 2023</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
