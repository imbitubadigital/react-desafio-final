import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NextActions from '~/store/ducks/next';
import MeetupActions from '~/store/ducks/meetup';

import ItemMeetup from '../ItemMeetup';

import {
  Container,
  Content,
  LoadMore,
  Btn,
} from '../styles';

class Nexts extends Component {
  static propTypes = {
    nextsRequest: PropTypes.func.isRequired,
    setMeetupUpdate: PropTypes.func.isRequired,
    deleteMeetupRequest: PropTypes.func.isRequired,
    nexts: PropTypes.shape({
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
    const { nextsRequest } = this.props;
    const { nexts: { page } } = this.props;
    if (page < 1) nextsRequest(1);
  }

  handleLoadMore = (page) => {
    const { nextsRequest } = this.props;
    nextsRequest(page);
  }

  render() {
    const { setMeetupUpdate, deleteMeetupRequest } = this.props;
    const {
      nexts: {
        loader, data, page, loadMore,
      }, auth,
    } = this.props;

    return (
      <Container>
        <header>
          <h1>Próximos Meetups</h1>
        </header>
        <Content>
          {data
            ? data.map(m => (
              <ItemMeetup
                key={m.id}
                item={m}
                setMeetupUpdate={setMeetupUpdate}
                deleteMeetupRequest={deleteMeetupRequest}
                auth={auth}
              />
            ))
            : <p>Ainda não existem eventos cadastrados!</p>
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
  nexts: state.next,
  meetups: state.meetup,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  { ...NextActions, ...MeetupActions },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Nexts);
