import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList, MenuOptionGroup, MenuItemOption, MenuDivider } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { RangeSlider,RangeSliderTrack, RangeSliderThumb, RangeSliderFilledTrack } from "@chakra-ui/slider";
// Too simple to be a seperate component ? 
export default function FilterBar(){
  return <Flex p='1rem' justifyContent='space-between'>
 <Menu closeOnSelect={false}>
  <MenuButton as={Button} colorScheme="blue">
    Filter
  </MenuButton>
  <MenuList minWidth="240px">
    <MenuOptionGroup defaultValue="range" title="Price" type="radio">
      <MenuItemOption value="range">Range<RangeSlider
  aria-label={"price-range"}
  colorScheme="pink"
  defaultValue={[10, 30]}
>
  <RangeSliderTrack>
    <RangeSliderFilledTrack />
  </RangeSliderTrack>
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider></MenuItemOption>
      
    </MenuOptionGroup>

    <MenuDivider />
    <MenuOptionGroup title="Country" type="checkbox">
      <MenuItemOption value="email">Email</MenuItemOption>
      <MenuItemOption value="phone">Phone</MenuItemOption>
      <MenuItemOption value="country">Country</MenuItemOption>
    </MenuOptionGroup>
  </MenuList>
</Menu>

<Menu>
      <MenuButton as={Button} rightIcon={<FontAwesomeIcon icon= {faChevronDown}/>}>
        Sort
      </MenuButton>
      <MenuList>
        <MenuItem>Popularity</MenuItem>
        <MenuItem>Price</MenuItem>
      </MenuList>
</Menu>
  </Flex>
}
