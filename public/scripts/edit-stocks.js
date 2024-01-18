 let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      let select = document.getElementById("model");
      let model = document.getElementById("models").innerText;
      let models = JSON.parse(model);
       let variant = document.getElementById("variants").innerText;
      let variants = JSON.parse(variant);
      let color = document.getElementById("colors").innerText;
      let colours = JSON.parse(color);
      let price = document.getElementById("prices").innerText;
      let prices = JSON.parse(price);
      let phone = document.getElementById("phones").innerText;
      let phones = JSON.parse(phone);
      let tables = document.getElementById("body")
      let openModalsButtons = document.querySelectorAll('[data-modals-target]')
      let closeModalsButtons = document.querySelectorAll('[data-closed-button]')
      let overlay = document.getElementById('overlay')
      let brandFilter = document.getElementById('brand-filter');
       import { downloadFile } from 'fs-browsers';

  closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange(); 
      });

         

    


    
      function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
          closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      


        } else {
          closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); 
        

         
        }
      }
      

    (function () {
  'use strict'

 
  var forms = document.querySelectorAll('.needs-validation')


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
    
  
     $('#brand').on('change', function(){
       $('#model').html('');
        for(let i = 0; i < models.length; i++){
          if($('#brand').val()==models[i].brand){
        
          $('#model').append(`<option value="${models[i].model}">${models[i].model}</option>`);
        }
        }

      document.getElementById("model").selectedIndex = -1;
         $("#variant").empty();
      $("#price").val("")
         $("#color").empty();
    
      });
   
      $('#model').on('change', function(){
       $('#variant').html('');
        for(let i = 0; i < variants.length; i++){
          if( $('#model').val()==variants[i].model &&  $('#brand').val()==variants[i].brand){
           $('#variant').append(`<option value="${variants[i].variant}">${variants[i].variant}</option>`);
        }
        }
       document.getElementById("variant").selectedIndex = -1;
       document.getElementById("price").selectedIndex = -1;
       
 
      $("#price").val("")
         $("#color").empty();

      });

      $('#variant').on('change', function(){
       $('#color').html('');
        for(let i = 0; i < colours.length; i++){
          if( $('#model').val()==colours[i].model &&  $('#brand').val()==colours[i].brand && $('#variant').val()==colours[i].variant){
            let color = colours[i].colors
            for(let j = 0; j <color.length; j++){
           $('#color').append(`<option value="${color[j]}">${color[j]}</option>`);
              
            }
        }
        }
        document.getElementById("price").selectedIndex = -1;
        document.getElementById("color").selectedIndex = -1;
           $("#price").val("")

      });
       $('#variant').on('change', function(){
       $('#price').html('');
        for(let i = 0; i < prices.length; i++){
          if( $('#model').val()==prices[i].model &&  $('#brand').val()==prices[i].brand  &&  $('#variant').val()==prices[i].variant){
           $('#price').val(prices[i].price);
        }
        }
       
      });
        
    
  for(let i = 0; i < models.length; i++){
          if($('#brand').val()==models[i].brand && $('#model').val()!=models[i].model){
        
          $('#model').append(`<option value="${models[i].model}">${models[i].model}</option>`);
        }
        }
 for(let i = 0; i < variants.length; i++){
          if( $('#model').val()==variants[i].model &&  $('#brand').val()==variants[i].brand &&  $('#variant').val()!=variants[i].variant){
           $('#variant').append(`<option value="${variants[i].variant}">${variants[i].variant}</option>`);
        }
        }

     for(let i = 0; i < colours.length; i++){
          if( $('#model').val()==colours[i].model &&  $('#brand').val()==colours[i].brand && $('#variant').val()==colours[i].variant){
            let color = colours[i].colors
            for(let j = 0; j <color.length; j++){
                if($('#color').val()!=color[j]){
           $('#color').append(`<option value="${color[j]}">${color[j]}</option>`);
                }
            }
        }
        }  
        document.getElementById("generate").addEventListener("click", e => {
          e.preventDefault()
          var a = $("<a>").attr("href", "https://api.qrserver.com/v1/create-qr-code/?data=<%=stocks.code%>&amp;size=1980x1280")
            downloadFile("https://api.qrserver.com/v1/create-qr-code/?data=<%=stocks.code%>&amp;size=1980x1280")
        })
        $(window).on('load', function () {
    $('#loading').hide();
  }) 