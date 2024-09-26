import React from "react";
import "./footer.css";

const AmazonFooter = () => {
  return (
    <footer className="amazon-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Get to Know Us</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Releases</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Make Money with Us</h4>
          <ul>
            <li>Sell products on Amazon</li>
            <li>Sell apps on Amazon</li>
            <li>Become an Affiliate</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Amazon Payment Products</h4>
          <ul>
            <li>Amazon Rewards Visa Signature Cards</li>
            <li>Amazon.com Store Card</li>
            <li>Amazon Business Card</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default AmazonFooter;
