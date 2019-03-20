import React from 'react';

import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import history from './history';

import Private from './private';
import Guest from './guest';
import 'font-awesome/css/font-awesome.css';

import Main from '~/pages/Main';
import CreateMeetup from '~/pages/PageForms/MeetupCrud/CreateMeetup';
import UpdateMeetup from '~/pages/PageForms/MeetupCrud/UpdateMeetup';
import Profile from '~/pages/PageForms/Profile';
import Preference from '~/pages/PageForms/Preference';
import Signup from '~/pages/PageForms/Signup';
import Signin from '~/pages/PageForms/Signin';
import Search from '~/pages/Search';
import Single from '~/pages/Single';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Private exact path="/" component={Main} />
      <Private path="/meetup/inscricao/:slug" component={Single} />
      <Private path="/meetup/cadastro/" component={CreateMeetup} />
      <Private path="/meetup/:update" component={UpdateMeetup} />
      <Private path="/buscar" component={Search} />
      <Private path="/perfil" component={Profile} />
      <Guest path="/registrar" component={Signup} />
      <Guest path="/login" component={Signin} />
      <Private path="/preferencia" component={Preference} />
    </Switch>
  </ConnectedRouter>

);

export default Routes;
