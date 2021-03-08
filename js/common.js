$(function() {
  // sessionStorage.setItem("adata", "123");
  // 加载 header
  $('#header').load('./components/header.html', function() {
    // 选中导航
    $(".nav a").each(function(){  
      var $this = $(this);  
      var href = $this[0].href.replace(window.location.origin, '');
      var pathname = window.location.pathname;
      if(pathname == '/index.html') {
        pathname = '/'
      };
      if(href == pathname){  
        $this.parent().addClass("active");  
      } else {
        $this.parent().removeClass("active");  
      };
    });
  });

  // 加载 banner
  $('#banner').load('./components/banner.html');

  // 加载 footer
  $('#footer').load('./components/footer.html', function() {
    init();
  });
})

function init() {
  $('#app').show();
  AOS.init();
};