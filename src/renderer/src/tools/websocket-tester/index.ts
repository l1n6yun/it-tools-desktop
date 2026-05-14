import { PlugConnected } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.websocket-tester.title'),
  path: '/websocket-tester',
  description: translate('tools.websocket-tester.description'),
  keywords: ['websocket', 'ws', 'socket', 'connect', 'test', 'debug', 'network', 'realtime', '消息'],
  component: () => import('./websocket-tester.vue'),
  icon: PlugConnected,
  createdAt: new Date('2026-05-11'),
});