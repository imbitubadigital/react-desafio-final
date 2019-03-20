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
    updateMeetupRequest: Proptypes.func.isRequired,
    history: Proptypes.shape({
      push: Proptypes.func,
    }).isRequired,
    meetups: Proptypes.shape({
      loader: Proptypes.bool,
      meetup: Proptypes.shape({
        id: Proptypes.number,
        image_id: Proptypes.number,
      }),
    }).isRequired,
  };

  async componentDidMount() {
    const { meetups: { meetup }, history } = this.props;
    if (!meetup) {
      history.push('/');
    }
  }

  onSubmit = (
    categories, title, description, location, date, images,
  ) => {
    const { updateMeetupRequest, meetups: { meetup: { id, image_id: imageId } } } = this.props;
    updateMeetupRequest(
      categories, title, description, location, date, images, id, imageId,
    );
  }

  render() {
    const { meetups: { loader, meetup } } = this.props;

    return (
      <Fragment>
        <Header />
        <Container>
          <h1>Atualizar de Meetup</h1>
          <FormMeetup onSubmit={this.onSubmit} loader={loader} meetup={meetup} />
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ meetups: state.meetup });

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateMeetup);
