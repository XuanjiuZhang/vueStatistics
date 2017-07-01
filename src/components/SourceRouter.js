import ChannelChoose from './Channel/ChannelChoose'
import ChannelList from './Channel/ChannelList'
import Effects from './Effects/Effects'

import SourceContainer from './SourceContainer'

const routes = [
  { path: '/:id', component: SourceContainer, children: [
    { path: 'channelChoose', component: ChannelChoose},
    { path: 'channelList', component: ChannelList },
    { path: 'effects', component: Effects }
  ]}
]

export default routes;