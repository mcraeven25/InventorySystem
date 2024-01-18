let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      let searchBtn = document.querySelector(".bx-search");
      let user = document.getElementById("users").innerText;
      let users = JSON.parse(user);
      let tables = document.getElementById("body")
      let openModalsButtons = document.querySelectorAll('[data-modals-target]')
      let closeModalsButtons = document.querySelectorAll('[data-close-button]')
      let overlay = document.getElementById('overlay')



      closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange(); 
      });
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
    
     $(window).on('load', function () {
    $('#loading').hide();
  }) 
      document.getElementById("position").selectedIndex = -1;
    
     function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
          closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    

        } else {
          closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); 
          
        }
      }
  users.sort((a, b) => a.id > b.id ? 1 : -1)
       
    for(let i=0; i<users.length; i++){
     
      
      let row =  ` <tr onclick="window.location='sale/${users[i].id}'"> 
                   <td class="_id"><a href="user/${users[i].id}">${users[i].id}</a></td>
                    <td class=""><a href="user/${users[i].id}">${users[i].firstName}</a></td>
                    <td class="lastName"><a href="user/${users[i].id}">${users[i].lastName}</a></td>
                    <td class="number"><a href="user/${users[i].id}">${users[i].number}</a></td>
                    <td class="address"><a href="user/${users[i].id}">${users[i].email}</a></td>
                    <td class="authorization"><a href="user/${users[i].id}">${users[i].position}</a></td>
                  </tr> `
      tables.innerHTML += row
      
    }
 // modals
    openModalsButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modals = document.querySelector(button.dataset.modalsTarget)
        openModals(modals)
       })
      })

    closeModalsButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modals = button.closest('.modals')
          closeModals(modals)
      })
        })

    function openModals(modals) {
      if (modals == null) return
      modals.classList.add('activate')
      overlay.classList.add('activate')
      }

    function closeModals(modals) {
      if (modals == null) return
      modals.classList.remove('activate')
      overlay.classList.remove('activate')
      }
      
    overlay.addEventListener('click', () => {
      const modalss = document.querySelectorAll('.modals.activate')
        modalss.forEach(modals => {
        closeModals(modals)
       })
        })
let maxLength = 11;
$(document).ready(function(){
    $('#number').on('keydown keyup change', function(){
        let char = $(this).val();
        let charLength = $(this).val().length;
        if(charLength > maxLength){
            $(this).val(char.substring(0, maxLength));
       
        }
    });
});
  $('th').on('click', function(){
   this
  })
