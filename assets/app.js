$('.carousel').carousel({
  interval: false
});

$('.navbar-nav>li>a').on('click', function(){
  $('.navbar-collapse').collapse('hide');
});