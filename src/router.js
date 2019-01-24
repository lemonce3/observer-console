import Vue from 'vue';
import Router from 'vue-router';
import MasterNavBar from './components/MasterTable';
import AgentNavBar from './components/AgentTable';
import ProgramNavBar from './components/ProgramTable';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/master'
		},
		{
			path: '/master',
			name: 'masterNavBar',
			component: MasterNavBar
		},
		{
			path: '/agent',
			name: 'agentNavBar',
			component: AgentNavBar
		},
		{
			path: '/program',
			name: 'programNavBar',
			component: ProgramNavBar
		},
	]
});