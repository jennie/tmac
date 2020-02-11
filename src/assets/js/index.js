const mobileMenu = document.querySelector('.nav-menu');
const burg = document.querySelector('.burg');
const x = document.querySelector('.x');
const menuItems = document.querySelectorAll('.nav-menu li a');

function isHidden(e) {
 return (e.offsetParent === null)
}
function hideNav() {
 mobileMenu.setAttribute('style','display: none')
}
function toggleNav() {
 if(isHidden(mobileMenu)) {
   mobileMenu.setAttribute('style','display: block')
   burg.setAttribute('style','display: none')
   x.setAttribute('style','display: block')
 }
 else {
   hideNav()
   burg.setAttribute('style','display: block')
   x.setAttribute('style','display: none')
 }
}
for (var i = 0 ; i < menuItems.length; i++) {
  menuItems[i].addEventListener('click', toggleNav, false) ;
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-16850490-7', 'auto');
ga('send', 'pageview');
