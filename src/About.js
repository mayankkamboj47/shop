import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { Text } from "@chakra-ui/react";

export default function About(){
  return (
    <Box p='1rem'>
      <Heading>About us</Heading>
      <Text mt='2rem'>
        Shop is an eCommerce website written for the Advanced Programming class. 
      </Text>
    </Box>
  )
}

export function ContactUs(){
  return (
    <Box p='1rem'>
      <Heading>Contact us</Heading>
      <Text mt='2rem'>
        You can contact us on email at mayank.kamboj_ug23@ashoka.edu.in
      </Text>
    </Box>
  )
}