async function addFormHandler(product_id, $this) {
    //event.preventDefault();

    
   const user_id = document.querySelector("#user").getAttribute("attr");
   let quant = $this.previousElementSibling.value;
   

    
    if(!quant){
        quant = 1;
    }

    if(!user_id){
        document.location.replace('/login');
    }
    else{

      if(!(await val).valueOf()){

        const response = await fetch(`/api/mycart`, {
            method: 'post',
            body: JSON.stringify({
              user_id,
              product_id,
              quantity: quant       
            }),
           headers: { 'Content-Type': 'application/json' }
          });
  
          if (response.ok) {
            document.location.replace('/myCart');
          } else {
            alert(response.statusText);
          }
        }
    }
    
}