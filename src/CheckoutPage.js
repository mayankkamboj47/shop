import { Heading, Box, Flex } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Input } from "@chakra-ui/input";
import { Spinner } from "@chakra-ui/spinner";
import { Table, Tr, Td, Th, Tfoot } from "@chakra-ui/table";
import React, { useEffect, useState} from "react";
import { Button } from "@chakra-ui/button";
import axios from "axios";


export default function CheckoutPage(){
  let [addressComponent, setAddressComponent] = useState(<Spinner />);
  useEffect(()=>{
    axios.get('http://localhost:3001/user',{withCredentials: true}).then(
      res=>setAddressComponent(
        <Input defaultValue={res.data.delivery_addr} maxW='21rem' w='100%' m='1.2rem 0 0 1.2rem' />
      )
    ).catch(
      ()=>setAddressComponent(
        <Input placeholder='Enter your address' maxW='21rem' w='100%' m='1.2rem 0 0 1.2rem' />
      )
    );
  },[]);
  return (
    <Box maxW='30rem' position='relative' margin='0 auto' p='1rem'>
      <Heading p='1.2rem 0 0 1.2rem' size='md'>Order Summary</Heading>
      <TotalTable />
      <Flex direction='column'>
        <Heading pl='1.2rem' size='md'>Deliver to</Heading>
        {addressComponent}
        <Heading p='1.2rem' size='md'>Pay using</Heading>
        <Select ml='1.2rem' maxW='10rem'>
          <option>Credit card</option>
          <option>Internet banking</option>
          <option>UPI</option>
          <option>Cash on delivery</option>
        </Select>
      </Flex>
      <Button m='1.2rem'>Proceed to Checkout</Button>
    </Box>
  )
}

function TotalTable(){
  return (
    <Table >
    <Tr>
      <Td>Black Shirt</Td>
      <Td isNumeric>$15</Td>
    </Tr>
    <Tr>
      <Td>Trousers</Td>
      <Td isNumeric>$10</Td>
    </Tr>
    <Tfoot>
      <Th>Total</Th>
      <Th isNumeric>$25</Th>
    </Tfoot>
  </Table>
  )
}