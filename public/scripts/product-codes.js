    let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      let searchBtn = document.querySelector(".bx-search");
      let code = document.getElementById("codes").innerText;
      let codes = JSON.parse(code);
      let tables = document.getElementById("body")
      let button =  document.getElementById("button")
     


     document.getElementById("brand").selectedIndex = -1;

      closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange(); 
      });

    
    $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  })


    
      function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
          closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
          closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); 
        }
      }
  codes.sort((a, b) => a.brand  > b.brand ? 1 : -1)


       
    for(let i=0; i<codes.length; i++){
     console.log(codes[i])
      let row = `<tr onclick="window.location='product-codes/${codes[i].code}'">
                  <td class="brand">${codes[i].code}</td>
                    <td class="brand">${codes[i].brand}</td>
                    <td class="model">${codes[i].model}</td>
                    <td class="variant">${codes[i].variant}</td>
                    <td class="color">${codes[i].color}</td>
                    <td class="color">${codes[i].price}</td>
                   
                  
                  </tr>`
      tables.innerHTML += row
   
    }
  $('#brand').on('change', function(){
    $('#body').html('');
    $('#search').val('');
    codes.sort((a, b) => a.model > b.model ? 1 : -1)

        for(let i=0; i<codes.length; i++){
          if($('#brand').val()==codes[i].brand){
      let options = `<tr onclick="window.location='product-codes/${codes[i].code}'">
                  <td class="brand">${codes[i].code}</td>
                    <td class="brand">${codes[i].brand}</td>
                    <td class="model">${codes[i].model}</td>
                    <td class="variant">${codes[i].variant}</td>
                    <td class="color">${codes[i].color}</td>
                    <td class="color">${codes[i].price}</td>
                    
                  </tr> `
     $('#body').append(options)
    }else if($('#brand').val()=="All"){
        codes.sort((a, b) => a.brand  > b.brand ? 1 : -1)
      let options = `<tr onclick="window.location='product-codes/${codes[i].code}'">
                  <td class="brand">${codes[i].code}</td>
                    <td class="brand">${codes[i].brand}</td>
                    <td class="model">${codes[i].model}</td>
                    <td class="variant">${codes[i].variant}</td>
                    <td class="color">${codes[i].color}</td>
                    <td class="color">${codes[i].price}</td>
                   
                  </tr> `
     $('#body').append(options)
     
    }
     
   
  }
      });

      $('#brand').one('change', function(){
    
          $('#brand').prepend(` <option value="All">All</option>`)
            
            });

$(window).on('load', function () {
    $('#loading').hide();
  }) 
    let brand = []
   
    for (code of codes) {
        brand.push(code.brand)
    }
 let uniqueItems = [...new Set(brand)]
     for(uniqueItem of uniqueItems) {
    $('<option/>')
  .val(uniqueItem)
  .text(`${uniqueItem}`)
  .appendTo('#brand')
      
    }
     document.getElementById("brand").selectedIndex = -1;
    
      