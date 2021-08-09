function setTokenToCookie(value) {
    var Days = 1; //此 cookie 将被保存 30 天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = "Authorization =" + escape(value) + ";expires=" + exp.toGMTString();
}


function getCookie(name) {
    var cookieValue = "null";
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function getLoginCookie() {
    return getCookie("Authorization");
}

function isLogin() {
    if (getLoginCookie() == "null") {
        window.location.href = "/login.html";
    }
}

function hasLogin(code){
    if (getLoginCookie() == "null" || code == 401) {
        window.location.href = "/login.html";
    }
}

function post(url){
    let result = "";
    $.ajax({
        url: url,
        type: "post",
        async:false,
        headers: {
            "Authorization":"Bearer "+getLoginCookie()
        },
        success: function (data) {
            result = data;
            if (data.code == 401) {
                window.location.href = "/login.html";
            }
        },
        error:function (data){
            result = data;
            if (data.code == 401) {
                window.location.href = "/login.html";
            }
        }
    });
    return result;
}

function postJson(url,params){
    let result = "";
    $.ajax({
        url: url,
        type: "post",
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data:params,
        headers: {
            "Authorization":"Bearer "+getLoginCookie()
        },
        success: function (data) {
            result = data;
            if (data.code == 401) {
                window.location.href = "/login.html";
            }
        },
        error:function (data){
            result = data;
            if (data.code == 401) {
                window.location.href = "/login.html";
            }
        }
    });
    return result;
}

function getUserInfo(){
    let result = post(serverHost + "/getUserInfo");
		if (result.code === 200 && result.success == true) {
			let temp = "<h5>" + result.content.data.user + "</h5>" + "<p>" + result.content.data.userName + "</p>";
			$(".media-body").html(temp);
		}
}

function logout() {
    swal({
        title: '是否退出登录?',
        //text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '退出',
        cancelButtonText:  '取消',
        padding: '2em'
    }).then(function (result) {
        if (result.value) {
            let data = post(serverHost + "/logout");
            if (data.code == 200 && data.success == true) {
                swal({
                      title: '退出成功',
                      text: "",
                      type: 'success',
                      padding: '2em'
                    })
                setTimeout("window.location.href = '/login.html'", 2000 );
            }
        }
    })

}

function getMenu(){
    let menuResult = post(serverHost+"/getMenu");
			var menuTemp = "";
			if (menuResult.code == 200 && menuResult.success == true) {
				$.each(menuResult.content.data,function(index,value){
                    if (value != null) {
					menuTemp = menuTemp + "<li class=\"menu\">";
					menuTemp = menuTemp + "<a href=\""+value.url+"\" aria-expanded=\"false\" class=\"dropdown-toggle\"><div>⭐"+
						"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\""+
						"fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\""+
						"stroke-linejoin=\"round\" class=\"feather feather-folder\">"+
						"<path"+
							"d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\">"+
						"</path></svg>"+
						"<span>"+value.name+"</span></div></a></li>";
                    }
				})
			}
			$("#accordionExample").append(menuTemp);
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
