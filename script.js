'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); //It returns nodelist.
const header = document.querySelector('.header');

const openModal = function (e) {
  // e.prventDeafault(); //With this openModal windown no open.We don't know about reason.
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Creating Element: //Cookies:

// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.innerHTML =
//   'Please Accept All Cookies : <button class="btn  btn-close-cookie" >Got it!</button>';

// header.prepend(message);
// header.append(message);

//Deleting Element:  //Remove Cookies

// const btnclosecookies = document.querySelector('.btn-close-cookie');
// btnclosecookies.addEventListener('click', function () {
//   message.remove();
// });
// setTimeout(()=>{
//   message.remove();
// },1000);  //Now we add little functionality is that our cookies message automatically remove after some second if we don't remove manually.

//Smooth Scrolling:
//First of all select button that we want to click and the select whole section that we apply on smooth scrolling:
const learnmorebtn = document.querySelector('.btn--scroll-to');
let sectionone = document.querySelector('#section--1');

learnmorebtn.addEventListener('click', function (e) {
  const s1cords = sectionone.getBoundingClientRect();
  // console.log(s1cords); //It returns object that contains some info. about section .
  //It returns some info. about section elements but it relative to viewports.
  //Top means distance from top of section to top of viewports.
  //Bottom means bottom of section selected and top of viewports.
  //please go mdn reference for more information.

  //We want to find the DOMREC of btn.
  // console.log(e.target.getBoundingClientRect()); //When we scroll x and y changes x is horizontal scrolling and y is vertical.
  //Y represent the distannce between button and top of viewport.
  //X represent the distance from left side that scroll or not . If not then x is zero.
  //These values relative to the viewports not the documents.


  //Now we want to get current scrolling of btn.
  // console.log(
  //   'Current Scrolling Postion (X/Y)',
  //   window.scrollX,
  //   window.scrollY
  // );
  //It returns the scroll distance from top and from left. If not scroll then both are zero.

  //Now we want to get the height and width of our given viewports.
  //  console.log('Current Height/Width of viewports',document.documentElement.clientHeight,document.documentElement.clientWidth)

  //  window.scrollTo(s1cords.left,s1cords.top);
  //s1cords.top means top of section that is selected and the top of given viewports.
  //But when we already some scroll before clicking the selected btn then it's not work because then top value are less becasue it the distace between top of section and the top of current viewport.

  //  window.scrollTo({left: s1cords.left+window.scrollX,top: s1cords.top+window.scrollY,behavior:'smooth'});
  //Now if we already scroll then this is added and then scroll.
  // window.scrollY is the distance between top of current viewports and top of section.
  //basically scrollY or X is relative to deocumets not viewports.

  //But in nowdays modern functions are used for smooth scrooling and get rid of this above calculations.

  sectionone.scrollIntoView({ behavior: 'smooth' });
});




//Event Propagation: Event Bubbling ,Event capturing.
//If we have container and inside container have a div and inside div have a button.
//If we apply any event on three items individually then if we click on container then only container event triger but when we click on div then also container and div both envent triger because div also in continaer and same for button. If we click on button then three event trigers.
//But problem is that what event trigers first like if we click on button then what event triger first of container or div or button.
//Now to overcome this problem two concepts arised first bubbling and second capturing.
//Event bubbling means first inside event trigers and then go to outside events like first button then div and then contaier.
//Event Capturing means first outside event trigers then first insde and then inside like first cotainer and then div and then button.
//By default event bubbling happens.
//But if we want to event capturing then we pass third argument in addEventListerne that is true.When we pass true then first container event trigers and then inside event trigers.
//By default false value exist as a third arguments.

//We implements this concepts in page navigation means click on any link on navbar then go to that page.
//First we add this functionality without bubbling and capturing to see why we need this concept.

// const navlinks = document.querySelectorAll('.nav__links');
// navlinks.forEach((el)=>{

//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     // console.log(e.target);
//     // const id = e.target.href;
//     // console.log(id);
//     const id = e.target.getAttribute('href');
//     console.log(id)
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//   })
// })
//This works very beautiful but in this case for each create copy of eact link.If we more than thousands link then this impact our functionlity. To overcome this problem we use bubbling.
//We follow two steps:
//1.Add event listenre to common parent in which all links exist.
//2. Determine what element originated the event.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//In this case not create any copy of events.So it's useful

//DOM Transversing:
//Means select any elements based on another elements.
const firsth = document.querySelector('.header__title h1');
// firsth.addEventListener('click',()=>{
//   alert("First h was Clicked");
// });

//Going Downwards Child:
// console.log(firsth.querySelectorAll(".highlight")); //It returns a nodelist.
// //NodeList objects are collections of nodes, usually returned by properties such as Node.childNodes and methods such as document.querySelectorAll().
// console.log(firsth.childNodes)
// console.log(firsth.children);//It returns HTML Collections.
// firsth.firstElementChild.addEventListener('click',()=>{
//   alert("First Child Element was Clicked")
// })
// firsth.lastElementChild.addEventListener('click',()=>{
//   alert("Last Child Element was Clicked")
// })

//Going Upwards Parents:
//This returns the parent element of selected elements.
// console.log(firsth.parentNode);
// console.log(firsth.parentElement);

// //If we want to select seected parents then use closeset methods to select selected parents.
// console.log(firsth.closest('.header'));
// // firsth.closest('.header').addEventListener('click',()=>{
// //   alert("Header Body Was Clicked");
// // })
// firsth.closest('h1').addEventListener('click',()=>{
//   alert("H1 Heading as a Body Was Clicked");
// })

//Go Sideways Siblings:
// console.log(firsth.nextElementSibling);
// console.log(firsth.previousElementSibling); //It returns null because previous sibling not exist.

// //If I want to returns all siblings then this methods is used.
// console.log(firsth.parentElement.children) //It return HTMLCollenction but not array but also iterables contais all siblings.
//  const arr = [...firsth.parentElement.children];
//  arr.forEach((el)=>{
//   if(el !==firsth){
//     el.style.transform= 'scale(0.5)'
//   }
// })

//We use this concept to implement functionaliy on tab.
//First of select button,button container and content container.
const tabsbtn = document.querySelectorAll('.operations__tab');
const btncontainer = document.querySelector('.operations__tab-container');
const contentcontainer = document.querySelectorAll('.operations__content');

btncontainer.addEventListener('click', e => {
  // const clicked = e.target;
  // console.log(clicked); //If we click on span number then obviously span return but we  want to retrun must button and apply operations.
  //For this we use closet method to select
  const clicked = e.target.closest('.operations__tab'); //It return only buttons
  console.log(clicked);
  if (!clicked) return; //With this line we click outside the button but inside the btn container then value null and returns alos eorror. To overcome this we add this line this menas when falsy value then not returns and otherwise returns.
  //It's called Gaurd Cluase.
  //First remove active class from all the button
  tabsbtn.forEach(el => {
    el.classList.remove('operations__tab--active'); //It's work fine.
  });
  clicked.classList.add('operations__tab--active');

  //First remove active class from all the content container
  contentcontainer.forEach(el => {
    el.classList.remove('operations__content--active'); //It's work fine.
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//Now similar content functionaliy implenment.

//New Functionality:
//On Navigation Fade animation functionaily:
//First of all select parent of links that is nav.
const nav = document.querySelector('.nav');
// nav.addEventListener('mouseover', e => {
//   if (e.target.classList.contains('nav__link')) {
//     const clicked = e.target;
//     console.log(clicked);
//     //Here not use closet method like tab becuae there is no parent of nav.
//     const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
//     const logo = clicked.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== clicked) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
// nav.addEventListener('mouseout', e => {
//   if (e.target.classList.contains('nav__link')) {
//     const clicked = e.target;
//     console.log(clicked);
//     //Here not use closet method like tab becuae there is no parent of nav.
//     const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
//     const logo = clicked.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== clicked) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });
//It works but code resueabiltu not works here so use another methods.

function handover(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const clicked = e.target;
    console.log(clicked);
    //Here not use closet method like tab becuae there is no parent of nav.
    const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
    const logo = clicked.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== clicked) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}
//  nav.addEventListener('mouseover',handover(e,0.5)) //Like not workds
//  nav.addEventListener('mouseover',(e)=>{
//   handover(e,0.5)
//  })
//  nav.addEventListener('mouseout',(e)=>{
//   handover(e,1)
//  })  //It works but use also another methods

nav.addEventListener('mouseover', handover.bind(0.5));
nav.addEventListener('mouseout', handover.bind(1));

//Sitcky Navigations:

// const intialcords = sectionone.getBoundingClientRect();
// console.log(intialcords);
// window.addEventListener('scroll', e => {
//   // console.log(e);
//   // console.log(window.scrollY)
//   if (window.scrollY > intialcords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
//It's work properly but not use usaully. For this we use observation intersection api.with javaSciprt.
//Now we use InterSectionObserver Api to do same work:
const Header = document.querySelector(".header");

const RevealNav = (entries) => {
  const [entry] =entries;
  console.log(entry);
  if(!entry.isIntersecting)  nav.classList.add('sticky');
  else{
    nav.classList.remove('sticky');
  }
}
const options ={
  root : null,
  threshold:0 , //Means seleected section out of the viewports.
  rootMargin: '-90px' //Means observer apply before 90 px from top.
}

const observerNav = new IntersectionObserver(RevealNav,options);
observerNav.observe(Header);


// Reveal Section on scrollings:
const allsections = document.querySelectorAll('.section');

function Revealsection(entries, option) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;  //retrun statement immediately exit from function and there is no further line run.
  entry.target.classList.remove('section--hidden');
}

const observer = new IntersectionObserver(Revealsection, {
  root: null,
  threshold: 0.15,
});
allsections.forEach(function (section) {
  observer.observe(section);

  section.classList.add('section--hidden');
});



//Lazy Loadin Images:
const imageTargets = document.querySelectorAll('img[data-src]');
const Revealimage = (entries,option)=>{
const [entry]= entries;

if(!entry.isIntersecting) return ;
entry.target.src = entry.target.dataset.src; //only last word not fll data-src:

entry.target.addEventListener('load',function(){
  entry.target.classList.remove('lazy-img')
});
observer.unobserve(entry.target)
}


const observerr = new IntersectionObserver(Revealimage,{
  root:null,
  threshold:0,
  rootMargin:'-200px'
})
imageTargets.forEach((img)=> observerr.observe(img));




