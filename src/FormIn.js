import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import React, {useState, useEffect} from "react";
import { Link, useHistory} from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook} from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';

export default function FormIn({action}){
  let [renderedComp, setRenderedComponent] = useState(<React.Fragment/>); // use a spinner instead
  let history = useHistory();
  useEffect(()=>{
    if(action==='Login'){
      axios.get('http://localhost:3001/user',{withCredentials : true}).then(res=>{
        if(res.data===null) setRenderedComponent(<LoginForm />);
        else history.push('/userprofile');
      }).catch(()=>setRenderedComponent(<LoginForm />));
    }
    else setRenderedComponent(<SignUpForm />);
  },[action, history]);
  return renderedComp;
}

function LoginForm(){
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let history = useHistory();

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
    try{
      await axios({
        url : 'http://localhost:3001/login',
        method : 'POST',
        data : {username,password},
        withCredentials : true
      });
      history.push('/userprofile');
    }
    catch(e){
      alert(e);
    }
  }
}
function SignUpForm(){
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let history = useHistory();

  return (
    <form onSubmit={makeSignupRequest}>
    <Flex direction='column' alignItems='center' p='3rem 0'>
      <Heading mb={5}>Sign Up</Heading>
      <Input
        placeholder='Pick a username'
        maxWidth='20rem' mb={2} value={username} onChange={(e)=>setUsername(e.target.value)}/>
      <PasswordInput placeholder='Pick a password' value={password} onChange={(e)=>setPassword(e.target.value)}/> 
      <Button width='100%' maxWidth='20rem' m={5} type='submit'>Create an Account</Button>
      <Heading size='md'>Sign up using</Heading>
      <OAuthButtons />
      <Link to='/login'>
        <ChakraLink>Already have an account ? Log in.</ChakraLink>
      </Link>
    </Flex>
  </form>
  );

  async function makeSignupRequest(e){
    e.preventDefault();
    try{
      await axios({
        url : 'http://localhost:3001/user',
        method : 'POST',
        data : {username,password},
        withCredentials : true
      });
      history.push('/userprofile');
    }
    catch(e){
      alert(e);
    }
  }
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