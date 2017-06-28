import ChannelChoose from './Channel/ChannelChoose'
import ChannelList from './Channel/ChannelList'
import Effects from './Effects/Effects'

const routes = [
  { path: '/channelChoose/:id?', component: ChannelChoose },
  { path: '/channelList', component: ChannelList },
  { path: '/effects', component: Effects }
]

export default routes;