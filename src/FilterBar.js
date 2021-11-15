import { Button } from "@chakra-ui/button";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList, MenuGroup} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { RangeSlider,RangeSliderTrack, RangeSliderThumb, RangeSliderFilledTrack } from "@chakra-ui/slider";
import { useState } from "react";
import React from "react";

export default function FilterBar(){
  return <Flex p='1rem' justifyContent='space-between'>
    <Filter />
    <Sort />
  </Flex>
}

function Filter(){
  return (
    <Menu closeOnSelect={false}>
    <MenuButton as={Button} rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>
      Filter
    </MenuButton>
    <MenuList minWidth="20rem">
        <MenuGroup title="Price" >
          <MenuItem><Slider map={n=>`${n}k`} min={1} max={100}/></MenuItem>
        </MenuGroup>
        <MenuGroup title="Rating" >
          <MenuItem><Slider /></MenuItem>
        </MenuGroup>
    </MenuList>
  </Menu>  
  );
}
function Sort(){
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FontAwesomeIcon icon= {faChevronDown}/>}>
        Sort
      </MenuButton>
      <MenuList>
        <MenuItem>Popularity</MenuItem>
        <MenuItem>Price</MenuItem>
      </MenuList>
</Menu>
  );
}
function Slider(props){
  let [low, setLow] = useState(props.min || 1);
  let [high, setHigh] = useState(props.max || 5);
  let map = props.map || identity ; 
  return (
    <React.Fragment>
    <Heading minW='7rem' mr={1} fontSize='xs'>{`${map(low)} - ${map(high)}`}</Heading>
      <RangeSlider 
      aria-label="price-range" 
      colorScheme="pink" 
      value={[low, high]} 
      min={props.min || 1} 
      max={props.max || 5}
      onChange={changeRange}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0}/>
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </React.Fragment>
  );
  function changeRange([low,high]){
    if(high - low < 1) return;
    setLow(low);
    setHigh(high);
  }
  function identity(x){
    return x;
  }
}
