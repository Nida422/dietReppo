(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
function greeting() {
    alert("May your day will be NIce, Thank You for attending Us..")
}

 document.querySelector(".icon-add").addEventListener("click", function(){
    document.querySelector(".popup").classList.add("active");
    document.querySelector(".popup").classList.remove("hide");

 });
 document.querySelector(".popup .icon-close").addEventListener("click", function(){
    document.querySelector(".popup").classList.remove("active");
    document.querySelector(".popup").classList.add("hide");

 });