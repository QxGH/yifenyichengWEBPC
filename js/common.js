$(function () {
  // sessionStorage.setItem("adata", "123");
  // 加载 header
  $('#header').load('./components/header.html', function () {
    // 选中导航
    $(".nav a").each(function () {
      var $this = $(this);
      var href = $this[0].href.replace(window.location.origin, '');
      var pathname = window.location.pathname;
      if (pathname == '/index.html') {
        pathname = '/'
      } else if(pathname  == '/newsDetails.html') {
        pathname = '/news.html'
      };
      if (href == pathname) {
        $this.parent().addClass("active");
      } else {
        $this.parent().removeClass("active");
      };
    });
  });

  // 加载 banner
  $('#banner').load('./components/banner.html');

  // 加载 footer
  $('#footer').load('./components/footer.html', function () {
    init();
  });

  // 展示品牌加盟弹窗
  setTimeout(() => {
    $('#brandJoinDialog').show(0, function() {
      $(this).addClass('visible');
    })
  }, 1000);
  // 关闭品牌加盟弹窗
  $('#brandJoinDialogCloseBtn').click(function() {
    $('#brandJoinDialog').removeClass('visible');
    setTimeout(() => {
      $('#brandJoinDialog').hide();
    }, 500);
  });
  // 品牌加盟弹窗点击
  $('#brandJoinDialogImg').click(function() {
    alert('click')
  });

  // 加盟咨询 点击显示弹窗
  // $('#joinConsultativeHandle').click(function() {
  //   $('#joinConsultativeDialog').show(0, function() {
  //     $('#joinConsultativeDialog').addClass('visible');
  //   })
  // });
  // 加盟咨询 关闭弹窗
  $('#joinConsultativeDialogCloseBtn').click(function() {
    $('#joinConsultativeDialog').removeClass('visible');
    setTimeout(() => {
      $('#joinConsultativeDialog').hide();
    }, 500);
  });
})

function init() {
  $('#app').show(0);
  AOS.init();
};

/**
 * ajax start
 */
var baseUrl = 'https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api';
function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
};
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
function ajax(obj, type) {
  $.ajax({
    type: type,
    url: baseUrl + obj.url,
    data: isObject(obj.data) ? obj.data : {},
    timeout: typeof (obj.timeout) === 'number' ? obj.timeout : 6000,
    async: typeof (obj.async) === "boolean" ? obj.async : true,
    cache: typeof (obj.cache) === "boolean" ? obj.cache : true,
    beforeSend: function (xhr) {
      if (isFunction(obj.beforeSend)) {
        obj.beforeSend(xhr)
      };
    },
    complete: function(xhr, status) {
      if (isFunction(obj.complete)) {
        obj.complete(xhr, status)
      };
    },
    success: function (result, status, xhr) {
      if (isFunction(obj.success)) {
        obj.success(result, status, xhr)
      };
    },
    error: function (xhr, status, error) {
      if (isFunction(obj.error)) {
        obj.error(xhr, status, error)
      } else {
        console.error('ajax error -> ', error)
      };
    }
  })
};

var $ajax = new function () {
  this.post = function (obj) {
    return ajax(obj, 'POST');
  };
  this.get = function (obj) {
    return ajax(obj, 'GET');
  };
};
/**
 * ajax end
 */

/**
 * 提交加盟咨询
 */
function submitJoinConsultatice() {
  if($('#joinConsultativeName').val() == '') {
    alert('请输入您的姓名')
    return;
  }
  if($('#joinConsultativePhone').val() == '') {
    alert('请输入您的电话')
    return;
  }
  var formData = {
    name: $('#joinConsultativeName').val(),
    phone: $('#joinConsultativePhone').val(),
    other: $('#joinConsultativeOther').val(),
  };

  // $ajax.post({
  //   url: '/submitJoinConsultatice',
  //   data: formData,
  //   success: function (res) {
  //     console.log('submitJoinConsultatice ->', res);
  //     $('#joinConsultativeName').val('');
  //     $('#joinConsultativePhone').val('');
  //     $('#joinConsultativeOther').val('');
  //   }
  // });
}

// 加盟咨询 拖动
var mouseDownTime = '';
function joinConsultativeMousedown(e) {
  var box = $('#joinConsultativeHandle');
  mouseDownTime = new Date().getTime();

  var event = e || window.event;
  var starty = event.clientY;
  var sb_bky = starty - box[0].offsetTop;

  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  };

  document.onmousemove = function(ev) {
    var event_ = ev || window.event;
    var endy = event_.clientY - sb_bky;
    if (endy <= 64) {
      endy = 64;
    };
    var mainContainerH = document.body.offsetHeight;
    if(endy > mainContainerH-56) {
      endy = mainContainerH-56;
    };
    $('#joinConsultativeHandle').css('top', endy+'px')
  }
  document.onmouseup = function() {
    document.onmousemove = null;
  };
}
function joinConsultativeMouseup(e) {
  document.onmousemove = null;
  var time = new Date().getTime();
  if((time - mouseDownTime) < 200){
    // 打开弹窗
    $('#joinConsultativeDialog').show(0, function() {
      $('#joinConsultativeDialog').addClass('visible');
    })
  };
}
