import ChannelChoose from './Channel/ChannelChoose'
import ChannelList from './Channel/ChannelList'
import Effects from './Effects/Effects'
import Funnel from './Effects/D3Chart/D3Funnel3'

import SourceContainer from './SourceContainer'

const routes = [
  { path: '/:id', component: SourceContainer, name: 'sourceContainer', children: [
    { path: 'channelChoose', component: ChannelChoose, name: 'channelChoose'},
    { path: 'channelList', component: ChannelList, name: 'channelList'},
    { path: 'effects', component: Effects, name: 'effects'},
    { path: 'testFunnel', component: Funnel, name: 'funnel'}
  ]}
]

export default routes;