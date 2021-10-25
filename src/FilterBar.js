import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
// Too simple to be a seperate component ? 
export default function FilterBar(){
  return <Flex p='1rem' justifyContent='space-between'>
    <Button>Filter</Button>
    <Button>Sort</Button>
  </Flex>
}