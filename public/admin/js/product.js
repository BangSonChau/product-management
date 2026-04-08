//Change status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach((btn) => {
    btn.addEventListener("click", () => {
      const statusCurrent = btn.getAttribute("data-status");
      const id = btn.getAttribute("data-id");

      let statusChange = statusCurrent == "active" ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;

      console.log(action);

      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
//End Change status

//Checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");

if (checkboxMulti) {
  const inputCheckAll = document.querySelector('input[name="checkAll"]');
  const inputsId = document.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    //thay đổi trạng thái của tất cả
    if (inputCheckAll.checked) {
      inputsId.forEach((inputBtn) => {
        inputBtn.checked = true;
      });
    } else {
      inputsId.forEach((inputBtn) => {
        inputBtn.checked = false;
      });
    }
  });

  //check nếu tất cả checked thì checkAll sẽ được checked, ngược lại sẽ không được checked
  inputsId.forEach((inputBtn) => {
    inputBtn.addEventListener("click", () => {
      //lấy số lượng checked
      const countChecked = checkboxMulti.querySelectorAll(
        'input[name="id"]:checked',
      ).length;

      if (countChecked === inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

//End Checkbox multi

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");

if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");

    const inputsChecked = checkboxMulti.querySelectorAll(
      'input[name="id"]:checked',
    );

    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach((input) => {
        const id = input.value;
        ids.push(id);
      });

      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một sản phẩm để áp dụng thay đổi");
    }
  });
}
//End Form change multi
