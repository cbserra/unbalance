// import 'babel-polyfill'

import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import { PropTypes } from 'prop-types'

import { Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import { createStore, combineActions } from 'reactorx'

import start from './actions/start'
import config from './actions/config'
import env from './actions/env'
import core from './actions/core'
import scatter from './actions/scatter'
import gather from './actions/gather'
// import treeActions from './actions/tree'
// import unraidActions from './actions/unraid'

import Api from './lib/api'
import WSApi from './lib/wsapi'

import App from './components/app'
// import Home from './components/home'
import Scatter from './components/scatter'
import Gather from './components/gather'
import Transfer from './components/transfer'
import History from './components/history'
import Settings from './components/settings'
import Log from './components/log'

// import * as constant from './lib/const'

// SAMPLE STATE
// state = {
// 	config: {
// 		folders: [
// 			"movies/films",
// 			"movies/tvshows"
// 		],
// 		dryRun: true
// 	}
//	status: null,
// 	unraid: {
// 		condition: {
// 			numDisks: 24,
// 			numProtected: 0,
//			state: "STARTED",
// 		},
// 		disks: [
// 			{id: 1, name: "disk1", path: "/mnt/disk1"},
// 			{id: 2, name: "disk2", path: "/mnt/disk2"},
// 			{id: 3, name: "disk3", path: "/mnt/disk3"},
// 		],
// 		bytesToMove: 0,
// 	}
//  fromDisk: null,
//  toDisk: null,
//  opInProgress: null,
//  transferDisabled: true,
//  lines: [],
// 	tree: {
// 		items:
// 			'/': [
// 				{type: 'folder', path: '/films'}
// 				{type: 'folder', path: '/tvshows'}
// 				{type: 'folder', path: '/storage'}
// 				{type: 'folder', path: '/data'}
// 			],
// 		cache: null,
//		chosen: {},
// 	},
// 	gatherTree: {
// 		items:
// 			'/': [
// 				{type: 'folder', path: '/films'}
// 				{type: 'folder', path: '/tvshows'}
// 				{type: 'folder', path: '/storage'}
// 				{type: 'folder', path: '/data'}
// 			],
// 		cache: null,
//		chosen: {},
// 	},
//	feedback: []
// }
const history = createBrowserHistory()

const initialState = {
	config: null,
	core: null,
	env: {
		isBusy: false,
		transferDisabled: true,
		validateDisabled: true,
		stats: '',
		lines: [],
		log: [],
		feedback: [],
		timeout: null,
		latestVersion: '',
	},
	scatter: {
		cache: null,
		chosen: {},
		items: [],
	},
	gather: {
		cache: null,
		chosen: {},
		items: [],
		present: [],
		elegible: [],
		target: null,
	},
	history,
}

// const initialState = {
// 	config: null,
// 	unraid: null,
// 	operation: null,
// 	history,
// }

const actions = combineActions(
	start,
	config,
	env,
	core,
	scatter,
	gather,
	// treeActions,
	// unraidActions,
)

const api = new Api()
const ws = new WSApi()

const store = createStore(initialState, actions, { api, ws })

class Layout extends PureComponent {
	static propTypes = {
		store: PropTypes.object.isRequired,
	}

	render() {
		const store = this.props.store

		// we wait for a valid config and a valid status before rendering the content
		if (!(store.state && store.state.config)) {
			return null
		}

		return (
			<Router history={store.state.history}>
				<App store={store}>
					<Route exact path="/" render={props => <Scatter store={store} {...props} />} />
					<Route path="/gather" render={props => <Gather store={store} {...props} />} />
					<Route exact path="/transfer" render={props => <Transfer store={store} {...props} />} />
					<Route exact path="/history" render={props => <History store={store} {...props} />} />
					<Route exact path="/settings" render={props => <Settings store={store} {...props} />} />
					<Route exact path="/log" render={props => <Log store={store} {...props} />} />
				</App>
			</Router>
		)
	}
}

store.subscribe(state => render(<Layout store={state} />, document.getElementById('mnt')))

store.actions.start()
