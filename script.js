function greeting() {
    alert("May your day will be NIce, Thank You for attending Us..")
}

 document.querySelector(".icon-add").addEventListener("click", function(){
    document.querySelector(".popup").classList.add("active");

 });
 document.querySelector(".popup .icon-close").addEventListener("click", function(){
    document.querySelector(".popup").classList.remove("active");

 });