import React, { Fragment } from 'react';

import { Container } from './styles';
import Header from '~/components/Header';
import SearchResult from '~/components/SearchResult';


const Search = () => (
  <Fragment>
    <Header />
    <Container>
      <SearchResult />
    </Container>
  </Fragment>
);

export default Search;
