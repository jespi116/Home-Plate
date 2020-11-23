
async function isProductExist(user_id, product_id){

  const response = await fetch(`/api/mycart/user`, {
    method: 'post',
    body: JSON.stringify({
      user_id,
      product_id       
    }),
   headers: { 'Content-Type': 'application/json' }
  });
  
  const data = await response.json();

  if (data !== null) {
    return true
  } else {
    return false
  }

}
async function addFormHandler(product_id, quantity) {

  const user_id = document.querySelector("#user").getAttribute("attr");

    const val =  isProductExist(user_id.toString(), product_id.toString());

    if(!quant){
        quant = 1;
    }

    if(user_id === '0'){
        document.location.replace('/login');
    }
    else{

      if(!(await val).valueOf()){

        const response = await fetch(`/api/mycart`, {
            method: 'post',
            body: JSON.stringify({
              user_id,
              product_id,
              quantity           
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