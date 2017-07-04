import ChannelChoose from './Channel/ChannelChoose'
import ChannelList from './Channel/ChannelList'
import Effects from './Effects/Effects'

import SourceContainer from './SourceContainer'

const routes = [
  { path: '/:id', component: SourceContainer, name: 'sourceContainer', children: [
    { path: 'channelChoose', component: ChannelChoose, name: 'channelChoose'},
    { path: 'channelList', component: ChannelList, name: 'channelList'},
    { path: 'effects', component: Effects, name: 'effects'}
  ]}
]

export default routes;