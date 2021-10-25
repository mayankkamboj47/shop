import { Box, Center, Flex} from "@chakra-ui/layout"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Link } from "@chakra-ui/layout"
import { Link as RouterLink } from "react-router-dom"
import { faHeart, faShoppingCart, faUser, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
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
export default function Nav(){
  let [searchText,setSearchText] = useState('');
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
          faHeart // Bug : Keyboard navigation causes hover twice, because we're using a nested IconButton
        }  aria-label='Wishlist'>
        </FontAwesomeIcon>
      </Link>
    </Center>
    <Center padding='0 1rem'>
    <RouterLink to='/cart'>
      <FontAwesomeIcon icon={faShoppingCart} />
    </RouterLink>
  </Center>
  <Center padding='0 1rem'>
  <RouterLink to='/login'>
    <FontAwesomeIcon icon={faUser} />
  </RouterLink>
</Center>
  </Flex>
}