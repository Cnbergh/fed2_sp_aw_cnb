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
    <div className="border-x-2 px-1 border-accent/70 max-w-sm truncate">
      <h3 className='text-stone-100/70'>Bids for this product:</h3>
      <ul className='truncate max-h-96'>
        {bids.map(bid => (
          <li key={bid.id} className="flex flex-row px-1 text-xs text-gray-400 whitespace-nowrap flex-wrap border-b-2 border-accent/70">
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
