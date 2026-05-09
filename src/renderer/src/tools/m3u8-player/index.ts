import { Video } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.m3u8-player.title'),
  path: '/m3u8-player',
  description: translate('tools.m3u8-player.description'),
  keywords: ['m3u8', 'player', 'video', 'hls', 'stream'],
  component: () => import('./m3u8-player.vue'),
  icon: Video,
  createdAt: new Date('2024-1-01'),
});
