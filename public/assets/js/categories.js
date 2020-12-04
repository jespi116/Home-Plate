async function addFormHandler(product_id, $this) {
    //event.preventDefault();

    
   const user_id = document.querySelector("#user").getAttribute("attr");
   let quant = $this.previousElementSibling.value;
   

    
    if(!quant){
        quant = 1;
    }
    console.log("\n====================================\n");
    console.log(user_id, quant, product_id);
    console.log("\n====================================\n");

    if(!user_id){
        document.location.replace('/login');
    }
    else{
        
        const response = await fetch(`/api/mycart`, {
            method: 'post',
            body: JSON.stringify({
              user_id,
              product_id,
              quantity: quant       
            }),
           headers: { 'Content-Type': 'application/json' }
          });
  
          console.log(response)
  
          if (response.ok) {
            document.location.replace('/myCart');
          } else {
            alert(response.statusText);
          }
    }
    
}

//document.querySelector('.add-form').addEventListener('submit', addFormHandler);