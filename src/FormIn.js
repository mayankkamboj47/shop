import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook} from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';

export default function FormIn({action}){
  console.log(document.cookie);
  if(action==='Login') return <LoginForm />;
  return <SignUpForm />;
}

function LoginForm(){
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  return (
    <form onSubmit={makeLoginRequest}>
      <Flex direction='column' alignItems='center' p='3rem 0'>
        <Heading mb={5}>Login</Heading>
        <Input
          placeholder='Username'
          maxWidth='20rem' mb={2}
          value={username}
          onChange={(e)=>setUsername(e.target.value)}/>
        <PasswordInput placeholder='Password'
        value={password}
        onChange={e=>setPassword(e.target.value)}/> 
        <Button width='100%' maxWidth='20rem' m={5} type='submit'>Login</Button>
        <Heading size='md'>Login Using</Heading>
        <OAuthButtons />
        <Link to='/signup'>
          <ChakraLink>Create an Acccount</ChakraLink>
        </Link>
      </Flex>
    </form>
  );

  async function makeLoginRequest(e){
    e.preventDefault();
    let response;
    try{
      response = await axios({
        url : 'http://localhost:3001/login',
        method : 'POST',
        data : {username,password},
        withCredentials : true
      });
      console.log(response);
      alert('Success. Now trying user');
      let user = await axios.get('http://localhost:3001/user',{
          withCredentials: true
        });
      alert('Done. See console.');
      console.log(user);
    }
    catch(e){
      alert(e);
    }
  }
}
function SignUpForm(){
  return (
    <form method='POST' action='/'>
    <Flex direction='column' alignItems='center' p='3rem 0'>
      <Heading mb={5}>Sign Up</Heading>
      <Input
        placeholder='Pick a username'
        maxWidth='20rem' mb={2}/>
      <PasswordInput placeholder='Pick a password'/> 
      <Button width='100%' maxWidth='20rem' m={5}>Create an Account</Button>
      <Heading size='md'>Sign up using</Heading>
      <OAuthButtons />
      <Link to='/login'>
        <ChakraLink>Already have an account ? Log in.</ChakraLink>
      </Link>
    </Flex>
  </form>
  )
}
function PasswordInput({placeholder, value, onChange}) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup maxWidth='20rem'>
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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