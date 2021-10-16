import { Heading, Box, Flex, Grid } from "@chakra-ui/layout"
import { useEditableControls } from "@chakra-ui/editable";
import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editable } from "@chakra-ui/editable";
import { EditablePreview, EditableInput} from "@chakra-ui/editable";
import { OrderCard } from "./Card";
export default function UserProfile(){
  return (
    <Flex p={5} alignItems='center' flexDirection='column'>
    <CustomControlsExample defaultValue='Mayank Kamboj' fontSize='4xl'/>
    <CustomControlsExample defaultValue='H6, Shastri Colony, Yamunanagar' fontSize='m'/>
    <Heading p={5}>Your Orders</Heading>
    {/** Orders have an item, a date. For the sake of simplicity,  the order could just be a productId and a date. How do we display it ? 
    Just display a date, and a card associated with it*/}
    <Flex wrap='wrap' style={{gap:'1rem'}} justifyContent='center'>
    <OrderCard />
    <OrderCard /><OrderCard /><OrderCard /><OrderCard /><OrderCard /><OrderCard />
    </Flex>
    </Flex>
    );
}
function CustomControlsExample({defaultValue, fontSize}) {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup size="sm" display='flex'>
        <IconButton icon={<FontAwesomeIcon icon={faCheck} />} {...getSubmitButtonProps()} />
        <IconButton icon={<FontAwesomeIcon icon={faWindowClose} />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<FontAwesomeIcon icon={faEdit} />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  return (
    <Editable
      defaultValue={defaultValue}
      fontSize={fontSize || "2xl"}
      isPreviewFocusable={false}
      display='flex'
      alignItems='center'
      style={{gap:'1rem'}}
    >
      <EditablePreview />
      <EditableInput /> 
      <EditableControls />
    </Editable>
  )
}