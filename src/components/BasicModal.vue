<template>
    <transition name="modal" @after-leave="afterLeave">
      <dialog
        ref="modal"
        class="modal-container"
        v-show="innerModelValue"
        @click="handleClickOutSide"
      >
        <div class="header">
          <slot name="header">Shared link</slot>
        </div>
  
        <div class="body">
          <div class="slot-body">
            <input 
                v-on:focus="$event.target.select()" 
                class="modal-input" 
                :value="link" 
                readonly
                ref="linkinput" />
            <button class="copy-btn" @click.once="copyLink">Copy</button>
          </div>
        </div>
  
        <div class="footer">
          <slot>
            <button class="btn" @click="innerModelValue = false">CLOSE</button>
          </slot>
        </div>
      </dialog>
    </transition>
  </template>
  
  <script>
  import { ref, computed, onMounted, watch } from "vue";
  
  export default {
    props: {
      modelValue: Boolean,
      link: String,
    },
    setup(props, ctx) {
      const modal = ref();
  
      const innerModelValue = computed({
        get: () => props.modelValue,
        set: (value) => ctx.emit("update:model-value", value),
      });
      const innerLink = computed({
        get: () => props.link,
        set: (value) => ctx.emit("update:link", value),
      });
  
      const displayModal = (show) => {
        if (!modal.value) return;
        if (show) {
          modal.value.showModal();
        } else {
          modal.value.close();
        }
      };
  
      onMounted(() => {
        if (innerModelValue.value) displayModal(true);
      });
  
      watch(innerModelValue, (isOpen) => {
        if (isOpen) displayModal(true);
      });
  
      const afterLeave = () => displayModal(false);
  
      const handleClickOutSide = ({ clientX: x, clientY: y }) => {
        if (!modal.value) return;
  
        const { left, right, top, bottom } = modal.value.getBoundingClientRect();
        if (x < left || x > right || y < top || y > bottom)
          innerModelValue.value = false;
      };
  
      return {
        modal,
        afterLeave,
        displayModal,
        innerModelValue,
        handleClickOutSide,
        link: innerLink
      };
    },
    methods:{
        copyLink () {
            this.$refs.linkinput.focus();
            document.execCommand('copy') // 執行瀏覽器複製命令
            this.$refs.linkinput.blur();
        }
    }
  };
  </script>
  
  <style scoped>
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-enter-active {
    transition-timing-function: "ease-out";
  }
  
  .modal-leave-active {
    transition-timing-function: "ease-in";
  }
  
  .modal-enter-active,
  .modal-leave-active {
    transition-duration: 200ms;
  }
  
  .modal-enter-from.modal-container,
  .modal-leave-to.modal-container {
    transform: scale(0.9) translateY(-2rem);
  }
  
  .modal-container::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    height: 200px;
    margin: auto;
    max-width: 400px;
    border-radius: 10px;
    padding: 20px;
    background-color: rgba(30, 28, 27, 0.795);
    border: none;
  }
  
  .header {
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
  }
  
  .footer {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
  }
  
  .btn {
    width: fit-content;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #fff;
  }
  .copy-btn{
    height: 30px;
    align-items: center;
    font-size: 14px;
    border-radius: 10px;
    background-color: #3ea6ff;
    border: none;

  }
  .slot-body{
    display: flex;
    justify-content: space-around;
  }
  .modal-input{
    width: 80%;
  }
  </style>
  