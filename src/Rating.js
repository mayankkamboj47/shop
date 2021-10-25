import Star from './assets/star_rate_black_24dp.svg'
import { Box } from '@chakra-ui/layout';

export default function Rating({ rating, numReviews }) {
  return (
    <Box d="flex" alignItems="center" aria-label={rating + ' stars'}>
      <Stars rating={rating} />
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && 's'}
      </Box>
    </Box>
  );
}

export function Stars({rating}){
  return Array(5)
  .fill('')
  .map((_, i) => {
    const roundedRating = Math.round(rating * 2) / 2;
    if (roundedRating - i >= 1) {
      return (i < rating ?
        <img src={Star} alt=''
          key={i}
          style={{ marginLeft: '1', width:'1.5rem', height:'1.5rem'}}
        /> : ''
      )}
      else return ''
    }
       // to do : else if(roundedRating -i >=0.5) display a half star
       // return <span></span>;
      );
}
