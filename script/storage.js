"use strict";

// lưu vào localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Lấy ra từ localStorage
function getFromStorage(key, macDinh) {
  return localStorage.getItem(key) ?? macDinh;
}
