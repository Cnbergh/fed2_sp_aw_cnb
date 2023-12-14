import { useEffect, useState } from "react";
import Tooltip from "./Tooltip";

// icons
import { BsArrowRight } from "react-icons/bs";

interface MultiPurposeButtonProps {
    isBidButton: boolean;
    isLoggedIn: boolean;
    onNavigateToLogin: () => void;
    onLogout: () => void;
    onBid: () => void;
  }
  
  const MultiPurposeButton = ({
    isBidButton,
    isLoggedIn,
    onNavigateToLogin,
    onLogout,
    onBid,
  }: MultiPurposeButtonProps) => {
    
    const handleClick = () => {
      if (isBidButton) {
        onBid();
      } else {
        isLoggedIn ? onLogout() : onNavigateToLogin();
      }
    };
  
    const buttonText = isBidButton ? "Place Bid" : isLoggedIn ? "Logout" : "Login";
    const tooltipText = isBidButton ? (isLoggedIn ? "Click to place a bid" : "Login to place a bid") : "";
  
    return (
      <div className="relative">
        <button
          onClick={handleClick}
          disabled={isBidButton && !isLoggedIn}
          className={`btn border-2 rounded-full border-white/50 max-w-[700px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group color-accent ${
            isBidButton && !isLoggedIn ? "disabled" : ""
          }`}
          aria-disabled={isBidButton && !isLoggedIn}
        >
          <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
            {buttonText}
          </span>
          <BsArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
        </button>
        {tooltipText && <Tooltip>{tooltipText}</Tooltip>}
      </div>
    );
  };
  
  export default MultiPurposeButton;