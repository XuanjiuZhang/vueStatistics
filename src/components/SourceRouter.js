import ChannelChoose from './Channel/ChannelChoose'
import ChannelList from './Channel/ChannelList'
import Effects from './Effects/Effects'

const routes = [
  { path: '/channelChoose', component: ChannelChoose },
  { path: '/channelList', component: ChannelList },
  { path: '/effects', component: Effects }
]

export default routes;