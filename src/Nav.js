import { Box, Center, Flex} from "@chakra-ui/layout"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Link } from "@chakra-ui/layout"
import { Link as RouterLink } from "react-router-dom"
import heart from "./assets/favorite_black_24dp.svg"
import cart from "./assets/shopping_bag_black_24dp.svg"
import person from "./assets/person_black_24dp.svg"
import lookingGlass from "./assets/search_black_24dp.svg"
import {IconButton } from "@chakra-ui/button"

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
        <img src={lookingGlass} alt=''/>
        </Center>} />
    </InputGroup>
    <Center padding='0 1rem'>
      <Link href='/wishlist'>
        <IconButton icon={
          <img src={heart} alt=''/> // Bug : Keyboard navigation causes hover twice, because we're using a nested IconButton
        } bgColor='white' aria-label='Wishlist'>
        </IconButton>
      </Link>
    </Center>
    <Center padding='0 1rem'>
    <RouterLink to='/cart'>
      <IconButton icon={
        <img src={cart} alt=''/>
      } bgColor='white' aria-label='Cart'>
      </IconButton>
    </RouterLink>
  </Center>
  <Center padding='0 1rem'>
  <RouterLink to='/login'>
    <IconButton icon={
      <img src={person} alt=''/>
    } bgColor='white' aria-label='Login'>
    </IconButton>
  </RouterLink>
</Center>
  </Flex>
}