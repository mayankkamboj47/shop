import { Box, Center, Flex, VStack} from "@chakra-ui/layout"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Link } from "@chakra-ui/layout"
import heart from "./assets/favorite_black_24dp.svg"
import cart from "./assets/shopping_bag_black_24dp.svg"
import person from "./assets/person_black_24dp.svg"
import lookingGlass from "./assets/search_black_24dp.svg"
import { Button, IconButton } from "@chakra-ui/button"
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
export function Nav(){
  let [searchText,setSearchText] = useState('hi');
  return <Flex>
    <Center padding='0 20px'>Logo</Center>
    <InputGroup>
      <Input placeholder='Search something' variant='filled' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
      <Suggestions values={searchText.length>2 ? [searchText,'static suggestion']:[]} 
      suggest={setSearchText}/>
      <InputRightElement children={<Center>
        <img src={lookingGlass} />
        </Center>} />
    </InputGroup>
    <Center padding='0 1rem'>
      <Link>
        <IconButton icon={
          <img src={heart} />
        } bgColor='white'>
        </IconButton>
      </Link>
    </Center>
    <Center padding='0 1rem'>
    <Link>
      <IconButton icon={
        <img src={cart} />
      } bgColor='white'>
      </IconButton>
    </Link>
  </Center>
  <Center padding='0 1rem'>
  <Link>
    <IconButton icon={
      <img src={person} />
    } bgColor='white'>
    </IconButton>
  </Link>
</Center>
  </Flex>
}