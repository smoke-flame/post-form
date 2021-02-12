
const inputs = document.querySelectorAll('.form-input');
const form = document.getElementById('form');
const formFile = document.getElementById('input-file');

let body = {
    "test_file": null
}

formFile.addEventListener('dragenter', event => {
    body.test_file = event.target.value;
})

inputs.forEach(item =>{
    item.addEventListener('change', event => {
        switch(event.target.id) {
            case 'form-name':
                body.test_name = event.target.value;
                break;
            case 'form-email':
                body.test_email = event.target.value;
                break;
            case 'form-text':
                body.test_message = event.target.value;
                break;
            case 'input-file':
                body.test_file = event.target.value;
                break; 
        }
    })
})

const url = 'https://beryl-boggy-ceiling.glitch.me/email';
form.addEventListener('submit', event => {
    event.preventDefault()
    if(body.test_message && body.test_email && body.test_name) {
      
        sendRequest('POST', url, body)
    } else {
        alert('Fields: Name, Email, Message - must be filled \nComplete the information and submit the form again')
    }
})

////////////////////////
function sendRequest(method, url, obj = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onload = () => {
            if(xhr.status > 400) {
                reject(`Произошла ошибка ${xhr.status}`)
            }
            resolve(xhr.response);
        }
        xhr.onerror = () => {
            reject("Произошла ошибка");
        }
        xhr.send(JSON.stringify(obj));
    }
)}
