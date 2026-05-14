export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export interface LogMessage {
  type: 'sent' | 'received' | 'error' | 'system';
  content: string;
  timestamp: Date;
}