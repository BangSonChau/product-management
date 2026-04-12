const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
  buttonStatus.forEach((button) => {
    let url = new URL(window.location.href);

    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      console.log(url);
      window.location.href = url.href;
    });
  });
}

const formSearch = document.querySelector("#form-search");

if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    const keyWord = e.target.keyword.value.trim();

    if (keyWord) {
      url.searchParams.set("keyword", keyWord);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}

//Pagination
const btnsPagination = document.querySelectorAll("[button-pagination]");

if (btnsPagination) {
  btnsPagination.forEach((btn) => {
    btn.addEventListener("click", () => {
      let url = new URL(window.location.href);

      const page = btn.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
//EndPagination

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");

if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");

    const inputsChecked = checkboxMulti.querySelectorAll(
      'input[name="id"]:checked',
    );

    const typeChange = e.target.type.value;

    if (typeChange === "delete-all") {
      const isConfirm = confirm(
        "Bạn có chắc chắn muốn xóa tất cả sản phẩm đã chọn không?",
      );

      if (!isConfirm) {
        return;
      }
    }

    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach((input) => {
        const id = input.value;

        if (typeChange === "change-position") {
          const position = input
            .closest("tr")
            .querySelector('input[name="position"]').value;

          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một sản phẩm để áp dụng thay đổi");
    }
  });
}
//End Form change multi

// Show-alert
const showAlert = document.querySelectorAll("[show-alert]");

if (showAlert.length > 0) {
  const dataTime = parseInt(showAlert[0].getAttribute("data-time"));
  const closeAlert = showAlert[0].querySelector("[close-alert]");

  setTimeout(() => {
    showAlert[0].classList.add("alert-hidden");
  }, dataTime);

  closeAlert.addEventListener("click", () => {
    showAlert[0].classList.add("alert-hidden");
  });
}
// End Show alert

// Upload image
const uploadImage = document.querySelector("[upload-image]");

if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector(
    "[upload-image-preview]",
  );

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End Upload image
