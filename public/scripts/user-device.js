   let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      let searchBtn = document.querySelector(".bx-search");
      let device = document.getElementById("devices").innerText;
      let devices = JSON.parse(device);
      let tables = document.getElementById("body")
      let button =  document.getElementById("button")


       $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
     


     document.getElementById("brand").selectedIndex = -1;

      closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange(); 
      });

    $(window).on('load', function () {
    $('#loading').hide();
  }) 
     

    
      function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
          closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
          closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); 
        }
      }
   devices.sort((a, b) => a.brand < b.brand ? 1 : -1)
       
    for(let i=0; i<devices.length; i++){
     console.log(devices[i])
      let row = `<tr>
                    <td class="brand">${devices[i].brand}</td>
                    <td class="model">${devices[i].model}</td>
                    <td class="variant">${devices[i].variant}</td>
                    <td class="color">${devices[i].colors}</td>
                    <td class="price">${devices[i].price}</td>
                  
                  </tr>`
      tables.innerHTML += row
   
    }
  $('#brand').on('change', function(){
    $('#body').html('');
       devices.sort((a, b) => a.brand < b.brand ? 1 : -1)
        for(let i=0; i<devices.length; i++){
          if($('#brand').val()==devices[i].brand){
      let options = `<tr>
                    <td class="brand">${devices[i].brand}</td>
                    <td class="model">${devices[i].model}</td>
                    <td class="variant">${devices[i].variant}</td>
                    <td class="color">${devices[i].colors}</td>
                    <td class="price">${devices[i].price}</td>
                  </tr> `
     $('#body').append(options)
    }else if($('#brand').val()=="All"){
      let options = `<tr>
                    <td class="brand">${devices[i].brand}</td>
                    <td class="model">${devices[i].model}</td>
                    <td class="variant">${devices[i].variant}</td>
                    <td class="color">${devices[i].colors}</td>
                    <td class="price">${devices[i].price}</td>
                  </tr> `
     $('#body').append(options)
    }
     
   
  }
      });

      $('#brand').one('change', function(){
    
          $('#brand').prepend(` <option value="All">All</option>`)
            
            });


    let brand = []
   
    for (device of devices) {
        brand.push(device.brand)
    }
 let uniqueItems = [...new Set(brand)]
     for(uniqueItem of uniqueItems) {
    $('<option/>')
  .val(uniqueItem)
  .text(`${uniqueItem}`)
  .appendTo('#brand')
      
    }
     document.getElementById("brand").selectedIndex = -1;
    
      