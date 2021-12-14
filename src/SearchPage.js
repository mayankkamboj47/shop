import { Heading } from '@chakra-ui/react';
import React, { useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import FilterableProducts from './FilterableProducts';


export default function SearchPage(){
  let {query} = useParams();
  let history = useHistory();
  let [dataSource, setDataSource] = useState('http://localhost:3001/search/'+query);

  useEffect(()=>{
    setDataSource(query);
    history.listen(()=>window.location.reload(false));
  });

  return (<React.Fragment>
    <Heading py='1rem' px='1rem'>Search results for {query}</Heading>
    <FilterableProducts dataSource={dataSource} />
    </React.Fragment>
  )
}