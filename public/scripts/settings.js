let model = document.getElementById("models").innerText
    let models = JSON.parse(model)
    let variant = document.getElementById("variants").innerText
    let variants = JSON.parse(variant)
    let price = document.getElementById("prices").innerText
    let prices = JSON.parse(price)
    let colors = document.getElementById("colors").innerText
    let colours = JSON.parse(colors)
    let tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    function validate(){
  'use strict'


  let forms = document.querySelectorAll('.needs-validation')


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
}

validate()

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const target = document.querySelector(tab.dataset.tabTarget)
          tabContents.forEach(tabContent => {
           tabContent.classList.remove('active')
          })
          tabs.forEach(tab => {
           tab.classList.remove('active')
          })
          target.classList.add('active')
          tab.classList.add('active')

        })
      })
      //update brand input
     $('#update-brand').on('change', function(){
       $('#brand-input').html('');
       let value = $('#update-brand').val()
         $('#brand-input').val(value)
        })
        

        $('#update-model').on('change', function(){
       $('#model-input').html('');
       let value = $('#update-model').val()
         $('#model-input').val(value)
        })
      $('#update-variant').on('change', function(){
       $('#variant-input').html('');
       let value = $('#update-variant').val()
         $('#variant-input').val(value)
        })
        
      $('#update-color').on('change', function(){
       $('#color-input').html('');
       let value = $('#update-color').val()
         $('#color-input').val(value)
        })

     

         document.getElementById("update-brand").selectedIndex = -1;

      $('#update-model-brand').on('change', function(){
       $('#update-model').html('');
        for(let i = 0; i < models.length; i++){
          console.log(models[i])
          if($('#update-model-brand').val()==models[i].brand){
          $('#update-model').append(`<option value="${models[i].model}">${models[i].model}</option>`);
        }
        }
        document.getElementById("update-model").selectedIndex = -1;
         $('#model-input').val('')
      })
      $('#update-variant-brand').on('change', function(){
       $('#update-variant-model').html('');
        for(let i = 0; i < models.length; i++){
          if($('#update-variant-brand').val()==models[i].brand){
          $('#update-variant-model').append(`<option value="${models[i].model}">${models[i].model}</option>`);
        }
        }
        document.getElementById("update-variant-model").selectedIndex = -1;
        $('#variant-input').val('')
         $('#update-variant').val('')
      })
    

      $('#update-variant-model').on('change', function(){
        console.log(true)
       $('#update-variant').html('');
        for(let i = 0; i < variants.length; i++){
          if($('#update-variant-model').val()==variants[i].model){
             $('#update-variant').append(`<option value="${variants[i].variant}">${variants[i].variant}</option>`)
         
        }
        }
         document.getElementById("update-variant").selectedIndex = -1;
      })

       $('#update-color-brand').on('change', function(){
       $('#update-color-model').html('');
        for(let i = 0; i < models.length; i++){
          if($('#update-color-brand').val()==models[i].brand){
          $('#update-color-model').append(`<option value="${models[i].model}">${models[i].model}</option>`);
        }
        }
         document.getElementById("update-color-model").selectedIndex = -1;
        $('#update-color-model').val('')
        $('#update-color-variant').val('')
        $('#update-color').val('')
        $('#color-input').val('')
      })
      

      $('#update-color-model').on('change', function(){
       $('#update-color-variant').html('');
        for(let i = 0; i < variants.length; i++){
          if($('#update-color-model').val()==variants[i].model){
          $('#update-color-variant').append(`<option value="${variants[i].variant}">${variants[i].variant}</option>`);
        }
        }
         document.getElementById("update-color-variant").selectedIndex = -1;
        $('#update-color-variant').val('')
        $('#update-color').val('')
        $('#color-input').val('')
      })
        $('#update-color-variant').on('change', function(){
       $('#update-color').html('');
        for(let i = 0; i < colours.length; i++){
          if( $('#update-color-model').val()==colours[i].model &&  $('#update-color-brand').val()==colours[i].brand && $('#update-color-variant').val()==colours[i].variant){
            let color = colours[i].colors
            for(let j = 0; j <color.length; j++){
           $('#update-color').append(`<option value="${color[j]}">${color[j]}</option>`);
              document.getElementById("update-color").selectedIndex = -1;
            }
        $('#update-color').val('')
        $('#color-input').val('')
        }
        }
      })

       $('#update-price-brand').on('change', function(){
       $('#update-price-model').html('');
       console.log(true)
        for(let i = 0; i < models.length; i++){
          if($('#update-price-brand').val()==models[i].brand){
          $('#update-price-model').append(`<option value="${models[i].model}">${models[i].model}</option>`);
        }
        }
         document.getElementById("update-price-model").selectedIndex = -1;
        $('#update-price-model').val('')
        $('#update-price-variant').val('')
        $('#update-price').val('')
        $('#price-input').val('')
      })
      

      $('#update-price-model').on('change', function(){
       $('#update-price-variant').html('');
        for(let i = 0; i < variants.length; i++){
          if($('#update-price-model').val()==variants[i].model){
          $('#update-price-variant').append(`<option value="${variants[i].variant}">${variants[i].variant}</option>`);
        }
        }
         document.getElementById("update-price-variant").selectedIndex = -1;
        $('#update-price-variant').val('')
        $('#update-price').val('')
        $('#price-input').val('')
      })
        $('#update-price-variant').on('change', function(){
       $('#update-price').html('');
        for(let i = 0; i < prices.length; i++){
          if( $('#update-price-model').val()==prices[i].model &&  $('#update-price-brand').val()==prices[i].brand  &&  $('#update-price-variant').val()==prices[i].variant){
          let price = prices[i].price
          console.log(price)
          $('#update-price').val(price);
          $('#old-price').val(price)
          }
        
        }
      })
      //add
     $('#variant-brand').on('change', function(){
       $('#variant-model').html('');
        for(let i = 0; i < models.length; i++){
          console.log(models[i])
          if($('#variant-brand').val()==models[i].brand){
          $('#variant-model').append(`<option value="${models[i].model}">${models[i].model}</option>`);
        }
        }
        document.getElementById("variant-model").selectedIndex = -1;
      })

      //delete
         $('#delete-model-brand').on('change', function(){
       $('#delete-model').html('');
        for(let i = 0; i < models.length; i++){
        
          if($('#delete-model-brand').val()==models[i].brand){
          $('#delete-model').append(`<option value="${models[i].model}">${models[i].model}</option>`);
        }
        }
         document.getElementById("delete-model").selectedIndex = -1;
      })

          $('#delete-variant-brand').on('change', function(){
       $('#delete-variant-model').html('');
        for(let i = 0; i < models.length; i++){
          if($('#delete-variant-brand').val()==models[i].brand){
          $('#delete-variant-model').append(`<option value="${models[i].model}">${models[i].model}</option>`);
        }
        }
         document.getElementById("delete-variant-model").selectedIndex = -1;
      })
      

      $('#delete-variant-model').on('change', function(){
       $('#delete-variant').html('');
        for(let i = 0; i < variants.length; i++){
          if($('#delete-variant-model').val()==variants[i].model){
          $('#delete-variant').append(`<option value="${variants[i].variant}">${variants[i].variant}</option>`);
        }
        }
         document.getElementById("delete-variant").selectedIndex = -1;
      })


       $('#delete-color-brand').on('change', function(){
       $('#delete-color-model').html('');
        for(let i = 0; i < models.length; i++){
          if($('#delete-color-brand').val()==models[i].brand){
          $('#delete-color-model').append(`<option value="${models[i].model}">${models[i].model}</option>`);
        }
        }
         document.getElementById("delete-color-model").selectedIndex = -1;
      })
      

      $('#delete-color-model').on('change', function(){
       $('#delete-color-variant').html('');
        for(let i = 0; i < variants.length; i++){
          if($('#delete-color-model').val()==variants[i].model){
          $('#delete-color-variant').append(`<option value="${variants[i].variant}">${variants[i].variant}</option>`);
        }
        }
         document.getElementById("delete-color-variant").selectedIndex = -1;
      })
        $('#delete-color-variant').on('change', function(){
       $('#delete-color').html('');
        for(let i = 0; i < colours.length; i++){
          if( $('#delete-color-model').val()==colours[i].model &&  $('#delete-color-brand').val()==colours[i].brand && $('#delete-color-variant').val()==colours[i].variant){
            let color = colours[i].colors
            for(let j = 0; j <color.length; j++){
           $('#delete-color').append(`<option value="${color[j]}">${color[j]}</option>`);
              document.getElementById("delete-color").selectedIndex = -1;
            }
        }
        }
      })
      

      //add color
       $('#color-brand').on('change', function(){
       $('#color-model').html('');
        for(let i = 0; i < models.length; i++){
          if($('#color-brand').val()==models[i].brand){
        
          $('#color-model').append(`<option value="${models[i].model}">${models[i].model}</option>`);
        }
        }
        document.getElementById("color-model").selectedIndex = -1;
      });
   
        $('#color-model').on('change', function(){
       $('#color-variant').html('');
        for(let i = 0; i < variants.length; i++){
          if($('#color-model').val()==variants[i].model){
        
          $('#color-variant').append(`<option value="${variants[i].variant}">${variants[i].variant}</option>`);
        }
        }
         document.getElementById("color-variant").selectedIndex = -1;
      });

      let selects = document.querySelectorAll(".hide")
      selects.forEach(select => {
        select.selectedIndex = -1;
      })
 
$(window).on('load', function () {
    $('#loading').hide();
  }) 
      