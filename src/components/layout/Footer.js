import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi"; //... 

const Footer = () => {
    return (
        <footer className='bg-dark text-center text-white flex-shrink-0'>
            <div className="text-md-start mx-5">
                <h5>Contact Us</h5>
                <p>Phone : +94772843628</p>
                <p>Email : info@stitchesandcurves.com</p>
                <p>Address : 08, Flower Street, Colombo 07</p>
            </div>
            <div>
                <h5>Quick Links</h5>
                <div className='d-flex flex-column'>
                    <p>Home</p>
                    <p>About</p>
                    <p>FAQs</p>
                </div>
            </div>

            <div>
            <h5>Find Us On</h5>

            <svg width='0' height='0'>
            <linearGradient
            id='insta-gradient'
            x1='100%'
            y1='100%'
            x2='0%'
            y2='0%'
            >
            <stop stopColor='#bc8f2d' offset='-7.78%' />
            <stop stopColor='#ecd484' offset='28.5%' />
            <stop stopColor='#887136' offset='65.61%' />
            <stop stopColor='#d0aa4c' offset='105.31%' />
            </linearGradient>
            </svg>

            <svg width='0' height='0'>
            <linearGradient
            id='twitter-gradient'
            x1='100%'
            y1='100%'
            x2='0%'
            y2='0%'
            >
            <stop stopColor='#bc8f2d' offset='-7.78%' />
            <stop stopColor='#ecd484' offset='28.5%' />
            <stop stopColor='#887136' offset='65.61%' />
            <stop stopColor='#d0aa4c' offset='105.31%' />
            </linearGradient>   
            </svg>

        <svg width='0' height='0'>
        <linearGradient
        id='fb-gradient'
        x1='100%'
        y1='100%'
        x2='0%'
        y2='0%'
        >
        <stop stopColor='#bc8f2d' offset='-7.78%' />
        <stop stopColor='#ecd484' offset='28.5%' />
        <stop stopColor='#887136' offset='65.61%' />
        <stop stopColor='#d0aa4c' offset='105.31%' />
        </linearGradient>
        </svg>

        <FiInstagram
        className='footer-icon-gold'
        style={{ stroke: "url(#insta-gradient)" }}
        />
        <FiTwitter
        className='footer-icon-gold'
        style={{ stroke: "url(#twitter-gradient)" }}
        />
        <FiFacebook
        className='footer-icon-gold'
        style={{ stroke: "url(#fb-gradient)" }}
        />
    </div>
            
            
        </footer>
    );
};

export default Footer;