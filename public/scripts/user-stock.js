 let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      let select = document.getElementById("model");
      let e = document.getElementById("brand-filter");
      let value = e.value;
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


       $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
       

  closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange(); 
      });

         
      document.getElementById("brand-filter").selectedIndex = -1;
    


    
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
       
      $("#color").empty();
      $("#variant").empty();
       $("#price").empty();

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
      });
       $('#variant').on('change', function(){
       $('#price').html('');
        for(let i = 0; i < prices.length; i++){
          if( $('#model').val()==prices[i].model &&  $('#brand').val()==prices[i].brand  &&  $('#variant').val()==prices[i].variant){
           $('#price').append(`<option value="${prices[i].price}">${prices[i].price}</option>`);
        }
        }
       
      });
    ///table

          for(let i=0; i < phones.length; i++){
              console.log(phones[i])
      let row = `<tr> 
                    <td class="imei">${phones[i].imei}</td>
                    <td class="brand">${phones[i].brand}</td>
                    <td class="model">${phones[i].model}</td>
                    <td class="variant">${phones[i].variant}</td>
                    <td class="color">${phones[i].color}</td>
                    <td class="price">${phones[i].price}</td>
                  </tr> `
      tables.innerHTML += row
      
    }
      

  $('#brand-filter').on('change', function(){
       $('#body').html('');
        for(let i=0; i<phones.length; i++){
          if($('#brand-filter').val()==phones[i].brand){
      let options = `<tr >
                      <td class="imei">${phones[i].imei}</td>
                    <td class="brand">${phones[i].brand}</td>
                    <td class="model">${phones[i].model}</td>
                    <td class="variant">${phones[i].variant}</td>
                    <td class="color">${phones[i].color}</td>
                    <td class="price">${phones[i].price}</td>
                  </tr> `
     $('#body').append(options)
    
    
    }else if($('#brand-filter').val()=="All"){
     
       console.log("okay")
     let options = `<tr>
                     <td class="imei">${phones[i].imei}</td>
                    <td class="brand">${phones[i].brand}</td>
                    <td class="model">${phones[i].model}</td>
                    <td class="variant">${phones[i].variant}</td>
                    <td class="color">${phones[i].color}</td>
                    <td class="price">${phones[i].price}</td>
                  </tr> `
     $('#body').append(options)
  
}}
      });

      $('#brand-filter').one('change', function(){
    
          $('#brand-filter').prepend(` <option value="All">All</option>`)
            
            });



$(window).on('load', function () {
    $('#loading').hide();
  }) 

  
    
    let brand = []
   
    for (device of phones) {
        brand.push(device.brand)
    }
 let uniqueItems = [...new Set(brand)]
     for(uniqueItem of uniqueItems) {
    $('<option/>')
  .val(uniqueItem)
  .text(`${uniqueItem}`)
  .appendTo('#brand-filter')
      
    }
     document.getElementById("brand-filter").selectedIndex = -1;



    

     
   