import React, { Fragment, Component } from 'react';

import { Container } from './styles';
import Header from '~/components/Header';
import Subscribes from '~/components/Dashboard/Subscribes';

import Nexts from '~/components/Dashboard/Nexts';
import Recommended from '~/components/Dashboard/Recommended';

class Main extends Component {

  componentDidMount() {
    this.checkLogged();
  }

  checkLogged = () => {
  //  const tokenLogged = !!localStorage.getItem('@Omni:token');

  }

  render() {
    return (
      <Fragment>
        <Header />
        <Container>
          <Subscribes />
          <Nexts />
          <Recommended />
        </Container>
      </Fragment>
    );
  }
}


export default Main;
