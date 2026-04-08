//Change status
const buttonsChangeStatus = document.querySelectorAll('[button-change-status]');

if(buttonsChangeStatus.length > 0) {

  const formChangeStatus = document.querySelector('#form-change-status');
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
    })
  })
  
}


//End Change status
