import React, { Fragment, Component } from 'react';

import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MeetupActions from '~/store/ducks/meetup';
import Header from '~/components/Header';
import FormMeetup from './FormMeetup';
import { Container } from '../styles';

class CreateMeetup extends Component {
  static propTypes = {
    createMeetupRequest: Proptypes.func.isRequired,
    loader: Proptypes.bool.isRequired,
  };

  onSubmit = (
    categories, title, description, location, date, images,
  ) => {
    const { createMeetupRequest } = this.props;
    createMeetupRequest(
      categories, title, description, location, date, images,
    );
  }

  render() {
    const { loader } = this.props;
    return (
      <Fragment>
        <Header />
        <Container>
          <h1>Cadastro de Meetup</h1>
          <FormMeetup onSubmit={this.onSubmit} loader={loader} />
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ loader: state.meetup.loader });

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateMeetup);
