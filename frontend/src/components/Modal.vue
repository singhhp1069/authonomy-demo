<template>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div  style="color: white;" class="modal-header">
            <slot name="header"></slot>
          </div>
          <div style="color: white;" class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button  @click="$emit('close')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: "modal-component",
  };
  </script>
<style>
.modal-footer button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #fff;
    color: #FF6712;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
  }

  .modal-footer button:hover {
    background-color: #933e0c;
    color: #fff;
  }
  </style>
