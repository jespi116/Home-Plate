async function addFormHandler(event) {
    event.preventDefault();

    const user_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    let quant = document.querySelector('#quant').value;
    const product_id = document.querySelector('#pid').textContent.split(':')[1];

    if(!quant){
        quant = 1;
    }

    console.log(user_id, quant, product_id)

    if(user_id === '0'){
        document.location.replace('/login');
    }
    else{
        
        const response = await fetch(`/api/mycart`, {
            method: 'post',
            body: JSON.stringify({
              
              product_id: product_id,
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

document.querySelector('.add-form').addEventListener('submit', addFormHandler);