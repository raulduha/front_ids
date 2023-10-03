import React from 'react';
import './Footer.css';
import { Button } from "./Button.jsx"
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading' style={{ color: '#fff' }}>
          Conocenos!
        </p>
        <p className='footer-subscription-text' style={{ color: '#fff' }}>
                    
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2 style={{ color: '#fff' }}>About Us</h2>
            <Link to='/sign-up' style={{ color: '#fff' }}>How it works</Link>
            <Link to='/' style={{ color: '#fff' }}>Testimonials</Link>
            <Link to='/' style={{ color: '#fff' }}>Careers</Link>
            <Link to='/' style={{ color: '#fff' }}>Investors</Link>
            <Link to='/' style={{ color: '#fff' }}>Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h2 style={{ color: '#fff' }}>Contact Us</h2>
            <Link to='/' style={{ color: '#fff' }}>Contact</Link>
            <Link to='/' style={{ color: '#fff' }}>Support</Link>
            <Link to='/' style={{ color: '#fff' }}>Destinations</Link>
            <Link to='/' style={{ color: '#fff' }}>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2 style={{ color: '#fff' }}>Videos</h2>
            <Link to='/' style={{ color: '#fff' }}>Submit Video</Link>
            <Link to='/' style={{ color: '#fff' }}>Ambassadors</Link>
            <Link to='/' style={{ color: '#fff' }}>Agency</Link>
            <Link to='/' style={{ color: '#fff' }}>Influencer</Link>
          </div>
          <div class='footer-link-items'>
            <h2 style={{ color: '#fff' }}>Social Media</h2>
            <Link to='/' style={{ color: '#fff' }}>Instagram</Link>
            <Link to='/' style={{ color: '#fff' }}>Facebook</Link>
            <Link to='/' style={{ color: '#fff' }}>Youtube</Link>
            <Link to='/' style={{ color: '#fff' }}>Twitter</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo' style={{ color: '#fff' }}>
              Data Fusion
              <i class='fab fa-teamspeak' />
            </Link>
          </div>
          <small class='website-rights' style={{ color: '#fff' }}>Machine Learners © 2023</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
