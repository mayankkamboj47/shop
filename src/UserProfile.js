import { Heading, Flex } from "@chakra-ui/layout"
import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { faCheck, faWindowClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editable, EditablePreview, EditableInput, useEditableControls} from "@chakra-ui/editable";
import { OrderCard } from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfile(){
  let [username,setUsername] = useState('');
  let [address, setAddress] = useState('');
  useEffect(()=>{
    axios.get('http://localhost:3001/user',{withCredentials : true}).then(
      response=>{
        setUsername(response.data.username);
        setAddress(response.data.delivery_addr);
      }
    )
  },[]);
  return (
    <Flex p={5} alignItems='center' flexDirection='column'>
      <CustomControlsExample value={username} fontSize='4xl' onSubmit={changeUsername} onChange={setUsername}/>
      <CustomControlsExample value={address} fontSize='m' onSubmit={changeAddress} onChange={setAddress}/>
      <Heading p={5}>Your Orders</Heading>
      {/** Orders have an item, a date. For the sake of simplicity,  the order could just be a productId and a date. How do we display it ? 
      Just display a date, and a card associated with it*/}
      <Flex wrap='wrap' style={{gap:'1rem'}} justifyContent='center'>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </Flex>
    </Flex>
    );
    async function changeUsername(){
      await axios.get('http://localhost:3001/user/modify',{
        withCredentials: true, 
        params : {
          username
        }
      });
    }
    async function changeAddress(){
      await axios.get('http://localhost:3001/user/modify',{
        withCredentials : true,
        params : {
          delivery_addr : address
        }
      });
    }
}
function CustomControlsExample({defaultValue, fontSize, value, onSubmit=()=>true, onChange=()=>true}={}) {
  return (
    <Editable
      defaultValue={defaultValue}
      value = {value}
      fontSize={fontSize || "2xl"}
      isPreviewFocusable={false}
      display='flex'
      alignItems='center'
      style={{gap:'1rem'}}
      onSubmit={onSubmit}
      onChange={onChange}
    >
      <EditablePreview />
      <EditableInput /> 
      <EditableControls />
    </Editable>
  );

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup size="sm" display='flex'>
        <IconButton icon={<FontAwesomeIcon icon={faCheck} />} {...getSubmitButtonProps()}/>
        <IconButton icon={<FontAwesomeIcon icon={faWindowClose} />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<FontAwesomeIcon icon={faEdit} />} {...getEditButtonProps()} />
      </Flex>
    )
  }
}