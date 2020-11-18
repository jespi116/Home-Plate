async function accountFormHandler(event) {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
     const first = document.querySelector('#first_name').value.trim();
     const last = document.querySelector('#last_name').value.trim();
     const phone = document.querySelector('#phone').value.trim();
     const address = document.querySelector('#address').value.trim();
     const city = document.querySelector('#city_state_zip').value.trim();
    
    
    const response = await fetch(`/api/users/${id}`, {
      method: 'put',
      body: JSON.stringify({
        first_name: first,
        last_name: last,
        phone: phone,
        address: address,
        city_state_zip: city
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    console.log(response)

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
    
}

document.querySelector('#account-form').addEventListener('submit', accountFormHandler);