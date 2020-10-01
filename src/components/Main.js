import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import UserScreen from './UserScreen';
import BookDonorScreen from './BookDonorScreen';

import BookRequesterScreen from './BookRequesterScreen';

export default class Main extends Component {
  render() {
	  return (
	    <Router>
	      <Scene key="root">
	        <Scene key="userScreen"
	          component={UserScreen}
	        	animation='fade'
	          hideNavBar={true}
	          initial={true}
	        />
			<Scene key="bookDonorScreen"
	          component={BookDonorScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
			<Scene key="bookRequesterScreen"
	          component={BookRequesterScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
	      </Scene>
		  
	    </Router>
	  );
	}
}