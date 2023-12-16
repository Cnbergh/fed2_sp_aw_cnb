import { ReactNode, useEffect, useState } from "react";
interface ErrorProps {
    errorKey: string;
    message: ReactNode;
  }

  const Error = ({ errorKey, message }: ErrorProps) => {
    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      setIsVisible(true);
    }, [errorKey]);
  
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center">
        <div className="relative p-4 bg-white/30 backdrop-blur-md border border-gray-200 rounded-lg shadow-md max-w-md mx-auto mt-4 text-center">
          <button
            className="absolute top-0 right-1 text-gray-200 hover:text-gray-600"
            onClick={() => setIsVisible(false)}
          >
            X
          </button>
          <p className="text-accent">Error: <span className="text-white">{message}:</span></p>
        </div>
      </div>
    );
  };
  
  export default Error;