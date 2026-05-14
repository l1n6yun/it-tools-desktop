<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { computed, onBeforeUnmount, ref, nextTick } from 'vue';
import { NButton, NInputGroup, NTag, NInputGroupLabel, NIcon, NScrollbar, NAlert, NInput } from 'naive-ui';
import { PlugConnected, Unlink, Send, Trash } from '@vicons/tabler';
import type { ConnectionStatus, LogMessage } from './websocket-tester.types';
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();

// WebSocket URL persistence
const wsUrl = useStorage('websocket-tester:url', 'wss://echo.websocket.org');

// Message input
const messageInput = ref('');

// WebSocket instance and status
const ws = ref<WebSocket | null>(null);
const status = ref<ConnectionStatus>('disconnected');

// Message logs
const logs = ref<LogMessage[]>([]);
const logContainerRef = ref<HTMLElement | null>(null);

// Computed status color
const statusColor = computed(() => {
  switch (status.value) {
    case 'connected':
      return 'success';
    case 'connecting':
      return 'warning';
    default:
      return 'default';
  }
});

// Computed status text
const statusText = computed(() => {
  switch (status.value) {
    case 'connected':
      return '已连接';
    case 'connecting':
      return '连接中...';
    default:
      return '已断开';
  }
});

// Format time for display
function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('zh-CN', { hour12: false });
}

// Add log message
function addLog(type: LogMessage['type'], content: string) {
  logs.value.push({
    type,
    content,
    timestamp: new Date(),
  });
  // Auto scroll to bottom
  nextTick(() => {
    if (logContainerRef.value) {
      logContainerRef.value.scrollTop = logContainerRef.value.scrollHeight;
    }
  });
}

// Connect to WebSocket
function connect() {
  if (!wsUrl.value) return;

  try {
    ws.value = new WebSocket(wsUrl.value);
    status.value = 'connecting';
    addLog('system', `正在连接到 ${wsUrl.value}`);

    ws.value.onopen = () => {
      status.value = 'connected';
      addLog('system', '连接成功');
    };

    ws.value.onclose = (event) => {
      status.value = 'disconnected';
      const reason = event.reason || '连接已关闭';
      addLog('system', reason);
      ws.value = null;
    };

    ws.value.onerror = (event) => {
      addLog('error', '连接发生错误');
      status.value = 'disconnected';
    };

    ws.value.onmessage = (event) => {
      addLog('received', event.data);
    };
  } catch (error) {
    addLog('error', `连接失败: ${error}`);
    status.value = 'disconnected';
  }
}

// Disconnect WebSocket
function disconnect() {
  if (ws.value) {
    ws.value.close();
    ws.value = null;
    status.value = 'disconnected';
    addLog('system', '已断开连接');
  }
}

// Send message
function sendMessage() {
  if (!ws.value || ws.value.readyState !== WebSocket.OPEN || !messageInput.value) return;

  ws.value.send(messageInput.value);
  addLog('sent', messageInput.value);
  messageInput.value = '';
}

// Clear logs
function clearLogs() {
  logs.value = [];
}

// Cleanup on unmount
onBeforeUnmount(() => {
  if (ws.value) {
    ws.value.close();
  }
});
</script>

<template>
  <div>
    <c-card title="WebSocket 连接">
      <!-- Connection Section -->
      <n-input-group>
        <n-input-group-label>URL</n-input-group-label>
        <c-input-text
          v-model:value="wsUrl"
          placeholder="ws://example.com/socket 或 wss://example.com/socket"
          :validation-rules="[
            {
              message: '请输入有效的 WebSocket URL',
              validator: (v: string) => v.startsWith('ws://') || v.startsWith('wss://'),
            },
          ]"
        />
        <n-button
          v-if="status === 'disconnected'"
          type="primary"
          @click="connect"
          :disabled="!wsUrl"
        >
          <template #icon>
            <n-icon :component="PlugConnected" />
          </template>
          连接
        </n-button>
        <n-button
          v-else
          type="error"
          @click="disconnect"
        >
          <template #icon>
            <n-icon :component="Unlink" />
          </template>
          断开
        </n-button>
      </n-input-group>

      <!-- Status Indicator -->
      <div mt-4 flex items-center gap-2>
        <span>状态:</span>
        <n-tag :type="statusColor" size="small">
          {{ statusText }}
        </n-tag>
      </div>

      <!-- Mixed Content Warning -->
      <n-alert
        v-if="wsUrl.startsWith('ws://') && status === 'disconnected'"
        type="warning"
        mt-4
        title="混合内容警告"
      >
        如果您在 HTTPS 页面上使用 ws:// (非加密 WebSocket)，浏览器可能会阻止连接。建议使用 wss:// 加密连接。
      </n-alert>
    </c-card>

    <!-- Message Log Section -->
    <c-card title="消息日志" mt-4>
      <template #actions>
        <n-button size="small" @click="clearLogs" quaternary>
          <template #icon>
            <n-icon :component="Trash" />
          </template>
          清空日志
        </n-button>
      </template>

      <div
        ref="logContainerRef"
        class="log-container"
        :style="{
          maxHeight: '300px',
          overflow: 'auto',
          backgroundColor: styleStore.isDarkTheme ? '#1a1a1a' : '#f5f5f5',
          borderRadius: '8px',
          padding: '12px',
        }"
      >
        <div v-if="logs.length === 0" text-center op-60 py-8>
          暂无消息记录
        </div>
        <div v-for="(log, index) in logs" :key="index" class="log-item" mb-2>
          <span class="timestamp" op-60 mr-2>[{{ formatTime(log.timestamp) }}]</span>
          <span
            class="log-type"
            :style="{
              color: log.type === 'sent' ? '#18a058' : log.type === 'received' ? '#2080f0' : log.type === 'error' ? '#d03050' : '#888',
            }"
            font-bold mr-2
          >
            {{ log.type === 'sent' ? '▶ 发送' : log.type === 'received' ? '◀ 接收' : log.type === 'error' ? '⚠ 错误' : 'ℹ 系统' }}
          </span>
          <span class="log-content">{{ log.content }}</span>
        </div>
      </div>
    </c-card>

    <!-- Send Message Section -->
    <c-card title="发送消息" mt-4>
      <n-input
        v-model:value="messageInput"
        type="textarea"
        placeholder="输入要发送的消息..."
        :autosize="{ minRows: 3, maxRows: 6 }"
        :disabled="status !== 'connected'"
      />
      <div flex justify-end mt-3>
        <n-button
          type="primary"
          @click="sendMessage"
          :disabled="status !== 'connected' || !messageInput"
        >
          <template #icon>
            <n-icon :component="Send" />
          </template>
          发送
        </n-button>
      </div>
    </c-card>
  </div>
</template>

<style lang="less" scoped>
.log-container {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
}

.log-item {
  word-break: break-all;
}
</style>