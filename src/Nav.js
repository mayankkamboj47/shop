import { Box, Center, Flex} from "@chakra-ui/layout"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Link } from "@chakra-ui/layout"
import { Link as RouterLink } from "react-router-dom"
import { faHeart, faShoppingCart, faUser, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Tag, TagLabel } from "@chakra-ui/tag"
import axios from "axios";

function Suggestions({values, suggest}){
  return <Flex direction='column' position='absolute' bottom='0px' transform='translateY(100%)' width='100%' background='white'
  zIndex={4}>
  {values.map(value=>
    <Box id={value} align='left' padding={5} onClick={()=>suggest(value)} sx={{'&:hover':{
      backgroundColor:'gray.100'
    }}}>{value}</Box>
    )}
  </Flex>
}
export default function Nav({cartItemsCount, setCartItemsCount}){
  let [searchText,setSearchText] = useState('');
  useEffect(()=>{
    axios.get('http://localhost:3001/user/cart_items/length',{
      withCredentials : true
    }).then(
      res=>setCartItemsCount(res.data)
    ).catch(
      err=>setCartItemsCount(0)
    )
  },[]);

  return <Flex>
    <Center padding='0 20px'>
    <RouterLink to='/'>Logo</RouterLink>
    </Center>
    <InputGroup>
      <Input placeholder='Search something' variant='filled' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
      <Suggestions values={searchText.length>2 ? [searchText,'static suggestion']:[]} 
      suggest={setSearchText}/>
      <InputRightElement children={<Center>
        <FontAwesomeIcon icon={faSearch} />
        </Center>} />
    </InputGroup>
    <Center padding='0 1rem'>
      <Link href='/wishlist'>
        <FontAwesomeIcon icon={
          faHeart
        }  aria-label='Wishlist'>
        </FontAwesomeIcon>
      </Link>
    </Center>
    <Center padding='0 1rem' position='relative'>
    <RouterLink to='/cart'>
      <FontAwesomeIcon icon={faShoppingCart} />
      <Tag position='absolute' bottom={-1} right={-1} bgColor='red.300'>
        <TagLabel fontWeight='bolder' color='white'>{cartItemsCount}</TagLabel>
      </Tag>
    </RouterLink>
  </Center>
  <Center padding='0 1rem'>
  <RouterLink to='/login'>
    <FontAwesomeIcon icon={faUser} />
  </RouterLink>
</Center>
  </Flex>
}