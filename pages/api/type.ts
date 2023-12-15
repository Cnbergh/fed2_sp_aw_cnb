export interface Product {
  id: number;
  title: string;
  description: string;
  tags: string[];
  media: string[];
  created: string;
  updated: string;
  endsAt: string;
  _count: {
    bids: number;
  };
}

export interface Profile {
    name: string,
    email: string,
    avatar: string[],
    credits: number,
    wins: [string],
    _count: {
      listings: number
    }
}