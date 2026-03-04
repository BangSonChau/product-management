const buttonStatus = document.querySelectorAll('[button-status]');

if (buttonStatus.length > 0) {
  buttonStatus.forEach((button) => {
    let url = new URL(window.location.href);

    console.log(url);
    
    button.addEventListener('click', () => {
      const status = button.getAttribute('button-status');
      
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      console.log(url);
      window.location.href = url.href;
    })
    
  })
}

const formSearch = document.querySelector('#form-search');

if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener('submit', (e) => {  
    e.preventDefault();

    const keyWord = e.target.keyword.value.trim();

    if (keyWord) {
      url.searchParams.set("keyword", keyWord);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  }) 
}


