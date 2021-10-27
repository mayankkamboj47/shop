import { Box } from '@chakra-ui/layout';
import {faStar, faStarHalf} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  .map((_, index) => {
    const roundedRating = Math.round(rating * 2) / 2;
    if (roundedRating - index >= 1) {
      return (
        <FontAwesomeIcon icon={faStar} 
          key={index}
          style={{ marginLeft: '1', width:'1.5rem', height:'1.5rem'}}
        />)
      }
    else if(roundedRating -index === 0.5) {
      return (<FontAwesomeIcon icon= {faStarHalf} key={index} style={{ marginLeft: '1', width:'1.5rem', height:'1.5rem'}}/>)
      }
      else return ''
    }
      );
}
