import React, { Fragment, Component } from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MeetupActions from '~/store/ducks/meetup';
import {
  Container,
  Detail,
  DataLocal,
  ButtonBox,
  ButtonSubmit,
} from './styles';
import Header from '~/components/Header';

class Single extends Component {
  static propTypes = {
    subscribeMeetup: Proptypes.func.isRequired,
    history: Proptypes.shape({
      push: Proptypes.func,
    }).isRequired,
    auth: Proptypes.shape({
      user: Proptypes.shape({
        id: Proptypes.number,
      }),
    }).isRequired,
    meetups: Proptypes.shape({
      loader: Proptypes.bool,
      isSubscrite: Proptypes.bool,
      meetup: Proptypes.shape({
        id: Proptypes.number,
        file: Proptypes.shape({
          url: Proptypes.string,
        }),
        location: Proptypes.string,
        description: Proptypes.string,
        subscribes: Proptypes.arrayOf(Proptypes.shape({
          id: Proptypes.number,
        })),
      }),
    }).isRequired,
  };

  static defaultpropTypes = {
    meetup: null,
    file: null,
  };

  state = {
    subscriber: false,
  }

  componentDidMount() {
    const { meetups: { meetup }, history } = this.props;
    if (!meetup) {
      history.push('/');
    }
    this.checkSubscribe();
  }

  checkSubscribe = () => {
    const { auth: { user: { id } } } = this.props;
    const { meetups: { meetup } } = this.props;
    if (meetup) {
      const subs = meetup.subscribes.filter(s => s.id === id);
      this.setState({ subscriber: !!subs.length > 0 });
    }
  }

  render() {
    const { subscribeMeetup, meetups: { meetup, loader, isSubscrite } } = this.props;
    const { subscriber } = this.state;
    return (
      <Fragment>
        <Header />
        {meetup && (
          <Container>
            <img src={meetup.file.url} alt={meetup.title} />
            <Detail>
              <h1>{meetup.title}</h1>
              <span>
                {`${meetup.subscribes.length} Membro`}
                {meetup.subscribes.length > 1 && <span>s</span>}
              </span>
              <p>{meetup.description}</p>
              <DataLocal>
                <span>{`Realizado em: ${moment(meetup.date).format('DD/MM/YYYY')} às ${moment(meetup.date).format('HH:mm')} horas`}</span>
                <p>{meetup.location}</p>
              </DataLocal>
              <ButtonBox>
                { subscriber || isSubscrite
                  ? (
                    <ButtonSubmit type="button" check="ok">
                      Já estou inscrito!
                    </ButtonSubmit>
                  ) : (
                    <Fragment>
                      { !loader
                        ? (
                          <ButtonSubmit type="button" onClick={() => subscribeMeetup(meetup.id)}>Inscreva-se</ButtonSubmit>)
                        : (
                          <ButtonSubmit type="button">
                            <i className="fa fa-spinner" aria-hidden="true" />
                          </ButtonSubmit>
                        )
                      }
                    </Fragment>
                  )
                }
              </ButtonBox>
            </Detail>
          </Container>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  meetups: state.meetup,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Single);
