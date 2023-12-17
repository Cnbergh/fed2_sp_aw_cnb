import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface Bid {
  id: string;
  amount: number;
  created: string;
  bidderName: string;
}

// Define the type for the props
interface BidsComponentProps {
  productId: string; // Assuming productId is a string, adjust if necessary
}

const BidsComponent = ({ productId }: BidsComponentProps) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${productId}/?_seller=true&_bids=true`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data && data.bids && Array.isArray(data.bids)) {
          const sortedBids = data.bids.sort((a: Bid, b: Bid) => new Date(b.created).getTime() - new Date(a.created).getTime());
          setBids(sortedBids);
        } else {
          console.error('Unexpected response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    };

    if (isLoggedIn && productId) {
      fetchBids();
    }
  }, [productId, isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <div className="border px-1">
      <h3>Bids for this product:</h3>
      <ul>
        {bids.map(bid => (
          <li key={bid.id} className="flex flex-row px-1 text-xs text-gray-900 whitespace-nowrap flex-wrap">
            <span className='px-1'>Bidder: {bid.bidderName}</span>
            <span className='px-1'>Amount: {bid.amount}</span>
            <span className='px-1'>Date: {new Date(bid.created).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidsComponent;
