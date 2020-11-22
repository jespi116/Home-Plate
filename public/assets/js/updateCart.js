async function deleteCartHandler(id) {
  
    if (id) {
      const response = await fetch('/api/mycart/'+id, {
        method: 'DELETE',
        body: JSON.stringify({
            id
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        document.location.replace('/myCart');
      } else {
        alert(response.statusText); // Include Modal in every error
      }
    }
  }

  async function updateCartHandler(id, user_id, product_id, quantity) {
   
    if (product_id && user_id && id && quantity) {
      const response = await fetch('/api/mycart/'+id, {
        method: 'PUT',
        body: JSON.stringify({
            id, 
            product_id,
            user_id,
            quantity
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        //console.log('success');
        document.location.replace('/myCart');
      } else {
        alert(response.statusText); // Include Modal in every error
      }
    }
  }
