import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook} from "@fortawesome/free-brands-svg-icons";

export default function FormIn({action}){
  const isLogin = action==='Login';
  const values = {
    username : isLogin?'Username':'Pick a Username',
    password : isLogin?'Password':'And a password',
    link: isLogin?'/signup' :'/login',
    linkText : isLogin?'Create an Account':'Already have an account ? Sign in',
    oAuthText : isLogin ? 'Login Using ' : 'Sign up using'
  }
  
  return (
    <Flex direction='column' alignItems='center' p='3rem 0'>
      <Heading mb={5}>{action}</Heading>
      <Input
        placeholder={values.username}
        maxWidth='20rem' mb={2}/>
      <PasswordInput placeholder={values.password}/> 
      <Button width='100%' maxWidth='20rem' m={5}>{action}</Button>
      <Heading size='md'>{values.oAuthText}</Heading>
      <OAuthButtons />
      <Link to={values.link}>
        <ChakraLink>{values.linkText}</ChakraLink>
      </Link>
    </Flex>
  )
}

function PasswordInput({placeholder}) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup maxWidth='20rem'>
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={placeholder}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

function OAuthButtons(){
  return (
    <Flex style={{gap:'1rem'}} my={3}>
      <IconButton icon={<FontAwesomeIcon icon={faGoogle} />} />
      <IconButton icon={<FontAwesomeIcon icon={faFacebook} />} />
    </Flex>
    );
}