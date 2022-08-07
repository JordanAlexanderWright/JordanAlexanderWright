// document.getElementById('aboutMeNav').addEventListener('click', () => 
// {   
//     document.getElementById('aboutMe').classList.remove('show')
//     document.getElementById('aboutMe').classList.add('hide')
// });

// document.getElementById('projectsNav').addEventListener('click', () =>{
//     document.getElementById('projects').classList.add('show');
// });

let aboutMe = document.getElementById('aboutMe');
let projects = document.getElementById('projects');

sections = [aboutMe, projects]


document.getElementById('aboutMeNav').addEventListener('click', showSection);
document.getElementById('projectsNav').addEventListener('click', showSection);


function showSection(e){
    console.log(e.target);
    console.log(e.target.innerHTML);
    let sectionId;
    let splitName = e.target.innerHTML.split(' ');

    if (splitName[1]){
        
        splitName[0] = splitName[0].toLowerCase();
        sectionId = splitName.join('');
    } else {
        sectionId = splitName[0].toLowerCase();
    }

    let something = document.getElementById(sectionId);
    
    if (something.classList.contains('show')){

    } else {
       
        let stuff = document.getElementsByClassName('show')
        let otherContainer = stuff[0];        
        stuff[0].classList.replace('show', 'hide');

        setTimeout(() => {
            something.classList.replace('hide', 'show');
            something.style.order = 0;
            otherContainer.style.order=1;
        }, 500);
        
        
    

        // something.classList.replace('hide', 'show');
        
    }
}