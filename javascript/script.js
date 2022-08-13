
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
        // NavigationCheck will run if hamburger menu exists
       
        if (document.documentElement.clientWidth < 640){
            navigationCheck()
        }
       
        let sectionContainer = document.getElementsByClassName('show')
        let currentSection = sectionContainer[0];    
        
        try {
            currentSection.classList.replace('show', 'hide');
        } catch {
            //User is clicking the same section
        }
       
        // setTimeout to let the hide animation finish
        setTimeout(() => {

            try{
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
            } catch{
                console.log('I see you are trying to break me')
            }
                               
        }, 500);
    }
}

// Handles the form submission

document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault()

    let userName = document.getElementById('nameField').value;
    let emailAddress = document.getElementById('emailField').value;
    let message = document.getElementById('messageField').value;

    switch(true){
    case (userName && emailAddress && message && emailAddress.includes('@')):
        {

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

        fetch("https://www.actionforms.io/e/r/portfolio-forms", requestPayload)
            .then(response => {              
                showMessage('Returned Response', response.status)
            })
        
        break;
        }
    
    case (!userName || !emailAddress || !message):  
        showMessage('Please fill out all fields');  
        break;  

    case (!emailAddress.includes('@')):
        {
            showMessage('Email must include an @ sign');
            break;
        }
    }
})

// Messages for contact form error / success
function showMessage (message = 'An Error occured, please try again', responseCode = 0,){
    let messageContainer = document.getElementById('responseMessage')

    if (responseCode === 200) { 
        message = " Thank You! Your Response Was Submitted"    
        messageContainer.style.color = '#CAD2C5';
 
    } else {
        messageContainer.style.color = 'red';
    }

    messageContainer.innerHTML = message;
    messageContainer.classList.add('showMessage');
    
    setTimeout( () => {
        messageContainer.classList.replace('showMessage', 'hideMessage');     
    }, 2000)

    setTimeout( () => {   
        messageContainer.classList.remove('hideMessage');
    }, 4000)
}

// hamburger menu events

document.getElementById('hamburger').addEventListener('click', () => {

    navigation = document.getElementsByTagName('nav')[0]
    navigationCheck();
})

function navigationCheck(){
    
    if (navigation.style.maxHeight){
        navigation.style.maxHeight = null;
        navigation.style.overflow = 'hidden';
    } else {
        navigation.style.maxHeight = '200px';
        navigation.style.overflow = 'visible';
    }
}