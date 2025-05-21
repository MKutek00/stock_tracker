<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

const chatOpen = ref(false);
const unreadMessagesCount = ref(0);
const chatBodyRef = ref<HTMLElement | null>(null);
const handleOpenChat = () => {
  chatOpen.value = !chatOpen.value;
  if (chatOpen.value) {
    unreadMessagesCount.value = 0;
    scrollToBottom();
  }
};
const scrollToBottom = () => {
  if (chatBodyRef.value) {
    chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight;
  }
};

const messages = ref([
  { id: 1, text: "Cześć! W czym mogę pomóc?", from: "bot" },
  { id: 2, text: "Jak dodać nową spółkę do portfela?", from: "user" },
  {
    id: 3,
    text: "Kliknij przycisk 'Dodaj pozycję' w lewym górnym rogu.",
    from: "bot",
  },
]);
const message = ref("");
const handleSendMessage = () => {
  if (!message.value.trim()) return;
  messages.value.push({
    id: messages.value.length + 1,
    text: message.value,
    from: "user",
  });
  message.value = "";
  nextTick(scrollToBottom);
};
watch(
  () => messages.value.length,
  () => {
    const last = messages.value[messages.value.length - 1];
    if (last?.from === "bot" && !chatOpen.value) {
      unreadMessagesCount.value++;
    }
    nextTick(scrollToBottom);
  }
);
</script>

<template>
  <div>
    <button
      class="chat-btn"
      @click="handleOpenChat"
      aria-label="Otwórz czat"
      type="button"
    >
      <v-icon :color="unreadMessagesCount > 0 ? 'red' : 'white'" size="small">
        mdi-chat
      </v-icon>
      <span v-if="unreadMessagesCount > 0" class="unread-dot">1</span>
    </button>
    <transition name="slide-fade">
      <div v-if="chatOpen" class="chat-window">
        <div class="chat-header">
          <span>Chat</span>
          <button
            class="close-btn"
            @click="chatOpen = false"
            aria-label="Zamknij czat"
            type="button"
          >
            <v-icon>mdi-close</v-icon>
          </button>
        </div>
        <div ref="chatBodyRef" class="chat-body">
          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="['chat-message', msg.from === 'user' ? 'user' : 'bot']"
          >
            {{ msg.text }}
          </div>
        </div>
        <div class="chat-input">
          <input
            v-model="message"
            placeholder="Napisz do nas ..."
            @keyup.enter="handleSendMessage"
          />
          <span class="chat-send-icon" @click="handleSendMessage">
            <v-icon>mdi-send</v-icon>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.chat-btn {
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 9999;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: background 0.2s;
  font-size: 28px;
}
.chat-btn:hover {
  background: #1565c0;
}
.unread-dot {
  position: absolute;
  top: 10px;
  right: 10px;
  min-width: 18px;
  height: 18px;
  background: #e53935;
  border-radius: 50%;
  box-shadow: 0 0 0 2px #1976d2;
  pointer-events: none;
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
.close-btn {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}
.chat-window {
  position: fixed;
  right: 32px;
  bottom: 90px;
  width: 340px;
  height: 420px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  font-weight: bold;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.chat-body {
  flex: 1;
  padding: 16px;
  background: #fafbfc;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.chat-body::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
.chat-message {
  max-width: 80%;
  padding: 8px 14px;
  border-radius: 16px;
  font-size: 15px;
  line-height: 1.4;
  word-break: break-word;
  position: relative;
}
.chat-message.bot {
  align-self: flex-start;
  background: #e3f2fd;
  color: #1976d2;
}
.chat-message.bot::before {
  content: "";
  position: absolute;
  left: -8px;
  top: 12px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 10px solid #e3f2fd;
}
.chat-message.user {
  align-self: flex-end;
  background: #1976d2;
  color: #fff;
}
.chat-message.user::before {
  content: "";
  position: absolute;
  right: -8px;
  bottom: 12px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 10px solid #1976d2;
}
.chat-input {
  padding: 12px 16px;
  background: #f5f5f7;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  position: relative;
}
.chat-input input {
  flex: 1;
  border: none;
  outline: none;
  border-radius: 16px;
  padding: 10px 40px 10px 16px;
  font-size: 15px;
  color: #1976d2;
  background: #fff;
  box-shadow: 0 1px 4px rgba(25, 118, 210, 0.06);
  transition: box-shadow 0.2s;
}
.chat-input input:focus {
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.15);
}
.chat-send-icon {
  color: #1976d2;
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 2;
  padding: 0;
  font-size: 22px;
  display: flex;
  align-items: center;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
