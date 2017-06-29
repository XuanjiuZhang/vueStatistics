import ChannelChoose from './Channel/ChannelChoose'
// import ChannelChooseO from './Channel/ChannelChoose-old'
import ChannelList from './Channel/ChannelList'
import Effects from './Effects/Effects'

import SourceContainer from './SourceContainer'

const routes = [
  { path: '/:id', component: SourceContainer, children: [
    { path: 'ChannelChoose', component: ChannelChoose },
    { path: 'channelList', component: ChannelList },
    { path: 'effects', component: Effects }
  ]}
]

export default routes;