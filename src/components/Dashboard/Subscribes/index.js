import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubscribeActions from '~/store/ducks/subscribe';
import MeetupActions from '~/store/ducks/meetup';

import ItemMeetup from '../ItemMeetup';

import {
  Container, Content, LoadMore, Btn,
} from '../styles';

class Subscribes extends Component {
  static propTypes = {
    subscribesRequest: PropTypes.func.isRequired,
    setMeetupUpdate: PropTypes.func.isRequired,
    deleteMeetupRequest: PropTypes.func.isRequired,
    subscribes: PropTypes.shape({
      loader: PropTypes.bool,
      loadMore: PropTypes.bool,
      page: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    }).isRequired,
    auth: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
  };


  componentDidMount() {
    const { subscribesRequest } = this.props;
    const { subscribes: { page } } = this.props;
    if (page < 1) subscribesRequest(1);
  }

  handleLoadMore = (page) => {
    const { subscribesRequest } = this.props;
    subscribesRequest(page);
  }

  render() {
    const { setMeetupUpdate, deleteMeetupRequest } = this.props;
    const {
      subscribes: {
        loader, data, page, loadMore,
      },
      auth,
    } = this.props;

    return (
      <Container>
        <header>
          <h1>Inscrições</h1>
        </header>
        <Content>
          {data[0]
            ? data.map(m => (
              <ItemMeetup
                key={m.id}
                item={m}
                setMeetupUpdate={setMeetupUpdate}
                deleteMeetupRequest={deleteMeetupRequest}
                auth={auth}
              />
            ))
            : <p>Você ainda não possui inscrições!</p>
          }
        </Content>
        <LoadMore>
          { loader && <i className="fa fa-spinner" aria-hidden="true" />}
          { loadMore && data[0]
            ? !loader && <Btn type="button" onClick={() => this.handleLoadMore(page + 1)}>Carregar mais</Btn>
            : data[0] && <Btn type="button">Não há mais resultados!</Btn>
          }
        </LoadMore>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  subscribes: state.subscribe,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  { ...SubscribeActions, ...MeetupActions },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Subscribes);
