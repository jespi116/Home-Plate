async function signupFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#signup-user').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    const username = document.querySelector('#signup-username').value.trim();
  
    if (username && password && username) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          password, 
          email
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        //console.log('success');
        document.location.replace('/login');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);