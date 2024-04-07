import { Link } from 'react-router-dom';
import { Restaurant } from '../models';
import './ListItem.scss';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card.tsx';
import { Star } from 'lucide-react';

const MAC_SCORE = 5;

const ListItem: React.FC<Restaurant> = (restaurant) => {
  return (
    <Link to={`/feed/${restaurant.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{restaurant.title}</CardTitle>
          <CardDescription className="flex gap-1">
            {Array.from({ length: MAC_SCORE }).map((_, index) => {
              return <Star key={index} size="16px" fill={restaurant.score >= ++index ? '#ffce4b' : '#bac3bd'} strokeWidth={0} />;
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{restaurant.description}</p>
        </CardContent>
        <CardFooter>
          {restaurant.tag.map((tag) => {
            return <div key={tag.id}>#{tag.name}</div>;
          })}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListItem;
