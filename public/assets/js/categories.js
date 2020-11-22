async function addFormHandler(product_id, quantity) {
    //event.preventDefault();

    //const user_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
   const user_id = document.querySelector("#user").getAttribute("attr");
   //let quant = document.querySelector('#quant').value;
    /*const product_id = document.querySelector('#pid').textContent.split(':')[1]; */

    alert("User ID: "+ user_id);
    alert("Product ID: "+ product_id);
    alert("Quantity: "+ quantity)
    if(!quant){
        quant = 1;
    }
    console.log("\n====================================\n");
    console.log(user_id, quant, product_id);
    console.log("\n====================================\n");

    if(user_id === '0'){
        document.location.replace('/login');
    }
    else{
        
        const response = await fetch(`/api/mycart`, {
            method: 'post',
            body: JSON.stringify({
              user_id,
              product_id,
              quantity           
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