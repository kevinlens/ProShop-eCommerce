import React,{useState} from 'react';
import { Form, Button } from 'react-bootstrap';

//To learn how to import {history} for components like this go to the Header.js file in 'Components' folder
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    //'trim' means trimming white space
    if (keyword.trim()) {
      //To learn how to import {history} for components like this go to the Header.js file in 'Components' folder
      history.push(`/search/${keyword}`);
    } else {
      //To learn how to import {history} for components like this go to the Header.js file in 'Components' folder
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
