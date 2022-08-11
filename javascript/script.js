
let aboutMe = document.getElementById('aboutMe');
let projects = document.getElementById('projects');


document.getElementById('aboutMeNav').addEventListener('click', showSection);
document.getElementById('projectsNav').addEventListener('click', showSection);
document.getElementById('contactMeNav').addEventListener('click', showSection);

// This function handles the navigation transitions

function showSection(e){

    //getting the section ID from parsing target html
    let sectionId;
    let splitName = e.target.innerHTML.split(' ');

    if (splitName[1]){        
        splitName[0] = splitName[0].toLowerCase();
        sectionId = splitName.join('');

    } else {
        sectionId = splitName[0].toLowerCase();
    }

    let newSection = document.getElementById(sectionId);
    
    // Checking to make sure the current section isn't already selected, then hiding / showing what is needed
    if (newSection.classList.contains('show')){

    } else {
       
        let sectionContainer = document.getElementsByClassName('show')
        let currentSection = sectionContainer[0];    
        console.log(currentSection);  
        currentSection.classList.replace('show', 'hide');

        // setTimeout to let the hide animation finish
        setTimeout(() => {
            currentSection.style.display = 'none';

            newSection.style.order = 0;
            if(newSection.classList.contains('hide')){
                newSection.classList.replace('hide', 'show');
            } else{
                newSection.classList.add('show')
            }  
            if (sectionId == 'aboutMe' || sectionId == 'contactMe'){
                newSection.style.display = 'flex'
            } else {
                newSection.style.display = 'unset'
            }                      
        }, 500);
    }
}

let requestOptions = {
  method: 'POST',
  body: JSON.stringify({
    title: 'Goodbye',
    body: 'world',
  }),
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
};

// document.getElementById('formSubmit').addEventListener('click', (e) => {
//     e.preventDefault()
//     console.log('hello');
//     fetch("https://www.actionforms.io/e/r/portfolio-forms", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
//   })

document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault()
    console.log('hello');
    let userName = document.getElementById('nameField').value;
    let emailAddress = document.getElementById('emailField').value;
    let message = document.getElementById('messageField').value;
    console.log(userName, emailAddress, message);

    let contactData = {
        name: userName,
        email: emailAddress,
        message: message,
    };

    let requestPayload = {
        method: 'POST',
        body: JSON.stringify(contactData),
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    console.log('attempting post');
    fetch("https://www.actionforms.io/e/r/portfolio-forms", requestPayload)
        .then(response => {
            if (response.status === 200) {
                console.log('Yep!');               
            }

            showMessage(response.status)
            return response.text()
        })
        .then(text => console.log(text))
        .catch(error => console.log('error', error));

    })

    function showMessage(responseCode){
        let messageContainer = document.getElementById('responseMessage')
        if (responseCode === 200) {        
            messageContainer.innerHTML = 'Thank You! Your Response Was Submitted'
            messageContainer.style.color = '#CAD2C5'
            messageContainer.style.display = 'inline'
            messageContainer.classList.add('showMessage')

            setTimeout( () => messageContainer.classList.replace('showMessage', 'hideMessage'), 2000)
            
        } else {
            messageContainer.innerHTML = 'There was an error while submitting your form, please try again.'
            messageContainer.style.color = 'red'
            messageContainer.style.display = 'inline'
            messageContainer.classList.add('showMessage')

            setTimeout( () => messageContainer.classList.replace('showMessage', 'hideMessage'), 2000)
        }
    }

    let messageContainer = document.getElementById('responseMessage')
    // messageContainer.style.display = 'inline'