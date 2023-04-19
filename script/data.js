"use strict";

const sideBar = document.querySelector("#sidebar");
let export_file = document.querySelector("#export-btn");
let import_file = document.querySelector("#import-btn");
let input_file = document.querySelector("#input-file");

sideBar.addEventListener("click", function (e) {
  sideBar.classList.toggle("active");
});
// export
export_file.addEventListener("click", function (e) {
  var blob = new Blob([JSON.stringify(getFromStorage("petArr"))], {
    type: "application/json",
  });
  saveAs(blob, "petData.json");
});

import_file.addEventListener("click", function (e) {
  // Cần sửa phần import;
  if (!input_file.value) {
    alert("Vui lòng chọn file muốn import!");
  } else {
    let isImport = confirm("Bạn muốn Import file này !");
    if (isImport) {
      const file = input_file.files[0];

      const reader = new FileReader();
      // Sự kiện load dữ liệu từ file
      reader.addEventListener(
        "load",
        function () {
          // kiểm tra file có phù hợp
          console.log(reader.result);
          const isValidate = isPetObject(JSON.parse(JSON.parse(reader.result)));
          if (isValidate) {
            // lưu vào localStorage
            saveToStorage("petArr", JSON.parse(reader.result));
            // thông báo
            alert("Import thành công!");
          }
        },
        false
      );

      // đọc file
      if (file) {
        reader.readAsText(file);
      }
      // làm trống input file
      input_file.value = "";
    }
  }
});

function isPetObject(data) {
  console.log(data);
  console.log(typeof data);
  if (!(data instanceof Array)) {
    alert("Đây không phải mảng thú cưng !");
    return false;
  } else {
    if (!data.every((pet) => pet instanceof Object)) {
      alert("file không hợp lệ: có phần tử không phải object");
      return false;
    }
  }

  let isRight = data.every(
    (pet) =>
      Object.keys(pet).length === 12 &&
      pet.hasOwnProperty("id") &&
      pet.hasOwnProperty("name") &&
      pet.hasOwnProperty("age") &&
      pet.hasOwnProperty("type") &&
      pet.hasOwnProperty("weight") &&
      pet.hasOwnProperty("length") &&
      pet.hasOwnProperty("color") &&
      pet.hasOwnProperty("breed") &&
      pet.hasOwnProperty("vaccinated") &&
      pet.hasOwnProperty("dewormed") &&
      pet.hasOwnProperty("sterilized") &&
      pet.hasOwnProperty("date")
  );
  return isRight;
}
