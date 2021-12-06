import { Button } from "@chakra-ui/button";
import { Flex, Heading } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList, MenuGroup} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { RangeSlider,RangeSliderTrack, RangeSliderThumb, RangeSliderFilledTrack } from "@chakra-ui/slider";
import { useState } from "react";
import React from "react";
/**
 * 
 * FilterBar (filterOptions : Object, sortOptions : Object)
 * 
 * filterOptions : Each key is a different way to filter, value is an Object which gives
 * further details such as the range of values possible for the parameter, functions to
 * trigger etc. 
 * 
 * eg. {
 *  price : {
 *    min : 1,
 *    max : 10,
 *    units : '$',
 *    onMinChange : (newMinValue)=>{},
 *    onMaxChange : (newMaxValue)=>{}
 *  },
 *  rating : {
 *    min : 1,
 *    max : 5,
 *    ...
 *  }
 * }
 */
export default function FilterBar({filterOptions, sortOptions}){
  return <Flex p='1rem' justifyContent='space-between'>
    <Filter options={filterOptions}/>
    <Sort options={sortOptions}/>
  </Flex>
}

function Filter({options={}}={}){
  return (
    <Menu closeOnSelect={false}>
    <MenuButton as={Button} rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>
      Filter
    </MenuButton>
    <MenuList minWidth="20rem">
    {Object.keys(options).map(option=>({...options[option], title : option})).map(({
      title,
      start=1, 
      end=5, 
      units='', 
      onMinChange=identity, 
      onMaxChange=identity}={})=>
      (
        <MenuGroup title={title}>
          <MenuItem>
            <Slider map={n=>units+n} min={start} max={end} 
            onChange={
              (low,high)=>{
                onMinChange(low);
                onMaxChange(high);
              }
            }/>
          </MenuItem>
        </MenuGroup>
      ))}
    </MenuList>
  </Menu>
  );
}
function Sort({options={}}={}){
  /**
   * options : Each key is a different way to sort, value is a function that is triggered with the 
   * appropriate boolean value which corresponds to whether the function was turned on or off. 
   * The rest of the triggers are automatically called with false whenever one is clicked. 
   */
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FontAwesomeIcon icon= {faChevronDown}/>}>
        Sort
      </MenuButton>
      <MenuList>
      {Object.keys(options).map(option=>
        <ToggleItem title={option} onToggle={(val)=>onToggle(option,val)} key={option}/>)}
      </MenuList>
    </Menu>
  );
  function ToggleItem({title, onToggle}){
    let [isOn, setIsOn] = useState(false);
    let onClick = ()=>{
      let newIsOn = !isOn;
      setIsOn(newIsOn);
      onToggle(newIsOn);
    }
    return <MenuItem onClick={onClick}>{title}</MenuItem>
  }
  function onToggle(option,val){
    let callback = options[option];
    callback(val);
    for(let key in options){
      if(key!==option) options[key](false);
    }
  }
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
      onChange={([low,high])=>{changeRange([low,high]) && props.onChange(low,high)}}
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
    return true;
    }
}

function identity(x){
  return x;
}