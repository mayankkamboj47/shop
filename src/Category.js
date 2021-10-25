import {
  Box,
  useColorModeValue,
  Heading,
  Image,
} from '@chakra-ui/react';
import { LinkBox, LinkOverlay } from '@chakra-ui/layout';
// Another card only. Remove this component as a special component
export default function Category({title,image}) {
  return (
    <LinkBox>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={image}
          />
        </Box>
        <LinkOverlay href={`/c/${title.toLowerCase()}`}>
        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} align='center' p='2rem 0 1rem'>
        {title}
        </Heading>
        </LinkOverlay>
      </Box>
      </LinkBox>
  );
}