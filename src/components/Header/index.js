import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Nav } from './styles';

import logo from '~/assets/images/logo-white.svg';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MeetupActions from '~/store/ducks/meetup';
import AuthActions from '~/store/ducks/auth';

class Header extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
  };

  logout = () => {
    const { signOut } = this.props;
    signOut();
  }

  render() {
    return (
      <Container>
        <Nav>
          <li>
            <img src={logo} alt="Meetups Show" />
          </li>
          <li>
            <i className="fa fa-home" aria-hidden="true" />
            <Link to="/">Início</Link>
          </li>
          <li>
            <i className="fa fa-search" aria-hidden="true" />
            <Link to="/buscar">Buscar</Link>
          </li>
          <li>
            <i className="fa fa-plus-circle" aria-hidden="true" />
            <Link to="/meetup/cadastro">Novo Meetup</Link>
          </li>
          <li>
            <i className="fa fa-user-circle" aria-hidden="true" />
            <Link to="/perfil">Meu Perfil</Link>
          </li>
          <li>
            <i className="fa fa-sign-out" aria-hidden="true" />
            <a href="/" onClick={this.logout}>Sair</a>
          </li>
        </Nav>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { ...MeetupActions, ...AuthActions },
  dispatch,
);
export default connect(null, mapDispatchToProps)(Header);
