/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
/**
 * Define Global Variables
 * 
*/
const ACTIVE_TOP_COORD_PERCENT = 0.2;
const SECTION_FIT_OFFSET  = 150;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//function helps scroll to section
function scroll_to_section(evt){
    //if click on A or LI 
    if(evt.target.nodeName == 'A' || evt.target.nodeName == 'LI'){
        const targeted_section_text = evt.target.textContent;
        const section_number = Number(targeted_section_text.split(" ")[1]);
        let sections = document.querySelectorAll('section');
        let targeted_section = sections[section_number - 1];
        let section_y = targeted_section.offsetTop;
        window.scrollTo({left:0,top:section_y - SECTION_FIT_OFFSET,behavior:'smooth'});
    }
}

//function help switch active class from previous active class to current active class 
function add_active_class(){
    //detect section
    const sections = document.querySelectorAll('section');
    let cur_active_section_index = -1;
    let prev_active_section_index = -1;
    for(let i = 0; i < sections.length ; i++){
        if( sections[i].className == 'your-active-class'){
            prev_active_section_index = i;
            break;
        }
    }
    //detect the current actual active section
    for(let i = 0; i <sections.length; i++){
        let y = sections[i].getBoundingClientRect().y;
        if(y< ACTIVE_TOP_COORD_PERCENT*window.innerHeight && y >0){
            //console.log(sections[i].id , sections[i].getBoundingClientRect().y);
            cur_active_section_index = i;
            break;
        }
        prev_active_section_index 
    }
    if(cur_active_section_index == -1){
        cur_active_section_index = prev_active_section_index;
    }

    //remove active from previous section 
    sections[prev_active_section_index].classList.remove('your-active-class');
    //add active to current section
    sections[cur_active_section_index].classList.add('your-active-class');
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
function build_the_nav(){
    const navbar = document.createDocumentFragment();
    const sectionCount = document.querySelectorAll('section').length;
    for(let i = 0; i < sectionCount; i++){
        const list_item = document.createElement('li');
        const list_link = document.createElement('a');
        list_link.innerHTML = `Section ${i+1}`;
        list_link.style.color = '#fff';
        list_item.appendChild(list_link);
        navbar.appendChild(list_item);
    }
    document.querySelector('#navbar__list').appendChild(navbar);
}

// Add class 'active' to section when near top of viewport
function add_mousewheel_listener_to_sections(){
    const section = document.querySelector('section');
    section.parentElement.addEventListener('mousewheel',add_active_class);
    window.addEventListener('scroll',add_active_class);

}

function add_click_to_scroll_listener_to_sections(){
    const nav_list = document.querySelector('#navbar__list');
    nav_list.addEventListener('click',function(evt){scroll_to_section(evt);});
}

// Scroll to anchor ID using scrollTO event
/**
 * End Main Functions
 * Begin Events
 * 
*/
// Build menu 
build_the_nav();
// Scroll to section on link click
add_mousewheel_listener_to_sections();
// Set sections as active
add_click_to_scroll_listener_to_sections();






