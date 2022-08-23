export interface Event {
  title: string;
  _id?: string;
  category: string;
  description: string;
  brief: string;
  price: number;
  date: string;
  tickets: number;
  images: string[];
  author?: {
    _id: string;
    email: string;
  };
}
[];
export interface EventProps {
  Event: {
    title: string;
    _id: string;
    category: string;
    description: string;
    brief: string;
    price: number;
    date: string;
    tickets: number;
    images: any;
    author?: {
      _id: string;
      email: string;
    };
  };
}
