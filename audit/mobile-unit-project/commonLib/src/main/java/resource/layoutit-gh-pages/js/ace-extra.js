"ace"in window||(window.ace= {
}),"vars"in window.ace||(window.ace.vars= {
    icon: " ace-icon ",".icon":".ace-icon"
}),ace.config= {
    cookie_expiry: 604800,storage_method:2
},ace.settings= {
    is: function(e,a){return 1==ace.data.get("settings",e+"-"+a)
    },exists:function(e,a) {
        return null!==ace.data.get("settings",e+"-"+a)
    },set:function(e,a) {
        ace.data.set("settings",e+"-"+a,1)
    },unset:function(e,a) {
        ace.data.set("settings",e+"-"+a,-1)
    },remove:function(e,a) {
        ace.data.remove("settings",e+"-"+a)
    },navbar_fixed:function(e,a,t) {
        var n=document.getElementById("navbar");if(!n)return!1;if(e=e||!1,a=a&&!0,!e&&t!==!1){var s=null;(ace.settings.is("sidebar","fixed")||(s=document.getElementById("sidebar"))&&ace.hasClass(s,"sidebar-fixed"))&&ace.settings.sidebar_fixed(!1,a)
        }

        e?(ace.hasClass(n,"navbar-fixed-top")||ace.addClass(n,"navbar-fixed-top"),a!==!1&&ace.settings.set("navbar","fixed")):(ace.removeClass(n,"navbar-fixed-top"),a!==!1&&ace.settings.unset("navbar","fixed"));try {
            document.getElementById("ace-settings-navbar").checked=e
        }

        catch(i) {
        }

        window.jQuery&&jQuery(document).trigger("settings.ace",["navbar_fixed",e])
    },sidebar_fixed:function(e,a,t) {
        var n=document.getElementById("sidebar");if(!n)return!1;if(e=e||!1,a=a&&!0,!e&&t!==!1){var s=null;(ace.settings.is("breadcrumbs","fixed")||(s=document.getElementById("breadcrumbs"))&&ace.hasClass(s,"breadcrumbs-fixed"))&&ace.settings.breadcrumbs_fixed(!1,a)
        }

        if(e&&t!==!1&&!ace.settings.is("navbar","fixed")&&ace.settings.navbar_fixed(!0,a),e) {
            if(!ace.hasClass(n,"sidebar-fixed")){ace.addClass(n,"sidebar-fixed");var i=document.getElementById("menu-toggler");i&&ace.addClass(i,"fixed")
            }

            a!==!1&&ace.settings.set("sidebar","fixed")
        }

        else {
            ace.removeClass(n,"sidebar-fixed");var i=document.getElementById("menu-toggler");i&&ace.removeClass(i,"fixed"),a!==!1&&ace.settings.unset("sidebar","fixed")
        }

        try {
            document.getElementById("ace-settings-sidebar").checked=e
        }

        catch(c) {
        }

        window.jQuery&&jQuery(document).trigger("settings.ace",["sidebar_fixed",e])
    },breadcrumbs_fixed:function(e,a,t) {
        var n=document.getElementById("breadcrumbs");if(!n)return!1;e=e||!1,a=a&&!0,e&&t!==!1&&!ace.settings.is("sidebar","fixed")&&ace.settings.sidebar_fixed(!0,a),e?(ace.hasClass(n,"breadcrumbs-fixed")||ace.addClass(n,"breadcrumbs-fixed"),a!==!1&&ace.settings.set("breadcrumbs","fixed")): (ace.removeClass(n,"breadcrumbs-fixed"),a!==!1&&ace.settings.unset("breadcrumbs","fixed"));
        try{document.getElementById("ace-settings-breadcrumbs").checked=e
        }

        catch(s) {
        }

        window.jQuery&&jQuery(document).trigger("settings.ace",["breadcrumbs_fixed",e])
    },main_container_fixed:function(e,a) {
        e=e||!1,a=a&&!0;var t=document.getElementById("main-container");if(!t)return!1;var n=document.getElementById("navbar-container");e?(ace.hasClass(t,"container")||ace.addClass(t,"container"),ace.hasClass(n,"container")||ace.addClass(n,"container"),a!==!1&&ace.settings.set("main-container","fixed")): (ace.removeClass(t,"container"),ace.removeClass(n,"container"),a!==!1&&ace.settings.unset("main-container","fixed"));
        try{document.getElementById("ace-settings-add-container").checked=e
        }

        catch(s) {
        }

        if(navigator.userAgent.match(/webkit/i)) {
            var i=document.getElementById("sidebar");ace.toggleClass(i,"menu-min"),setTimeout(function(){ace.toggleClass(i,"menu-min")
            },0)
        }

        window.jQuery&&jQuery(document).trigger("settings.ace",["main_container_fixed",e])
    },sidebar_collapsed:function(e,a) {
        var t=document.getElementById("sidebar");if(!t)return!1;e=e||!1;var n,s,i=ace.isHTTMlElement(this)?this: t.querySelector(".sidebar-collapse"),c=i?i.querySelector(ace.vars[".icon"]):null;
        c&&(n=c.getAttribute("data-icon1"),s=c.getAttribute("data-icon2")),e?(ace.addClass(t,"menu-min"),c&&(ace.removeClass(c,n),ace.addClass(c,s)),a!==!1&&ace.settings.set("sidebar","collapsed")): (ace.removeClass(t,"menu-min"),c&&(ace.removeClass(c,s),ace.addClass(c,n)),a!==!1&&ace.settings.unset("sidebar","collapsed")),window.jQuery&&jQuery(document).trigger("settings.ace",["sidebar_collapsed",e])
    }},ace.settings.check=function(e,a) {
    if(ace.settings.exists(e,a)){var t=ace.settings.is(e,a),n={"navbar-fixed": "navbar-fixed-top","sidebar-fixed":"sidebar-fixed","breadcrumbs-fixed":"breadcrumbs-fixed","sidebar-collapsed":"menu-min","main-container-fixed":"container"
    },s=document.getElementById(e);t!=ace.hasClass(s,n[e+"-"+a])&&ace.settings[e.replace("-","_")+"_"+a](t)
    }},ace.data_storage=function(e,a) {
    var t="ace_",n=null,s=0;(1==e||e===a)&&"localStorage"in window&&null!==window.localStorage?(n=ace.storage,s=1): null==n&&(2==e||e===a)&&"cookie"in document&&null!==document.cookie&&(n=ace.cookie,s=2),this.set=function(e,a,i,c){if(n)if(i===c)i=a,a=e,null==i?n.remove(t+a):1==s?n.set(t+a,i):2==s&&n.set(t+a,i,ace.config.cookie_expiry);
    else if(1==s)null==i?n.remove(t+e+"_"+a): n.set(t+e+"_"+a,i);
    else if(2==s){var r=n.get(t+e),d=r?JSON.parse(r): {
    };

        if(null==i) {
            if(delete d[a],0==ace.sizeof(d))return void n.remove(t+e)
        }

        else d[a]=i;n.set(t+e,JSON.stringify(d),ace.config.cookie_expiry)
    }},this.get=function(e,a,i) {
        if(!n)return null;if(a===i)return a=e,n.get(t+a);if(1==s)return n.get(t+e+"_"+a);if(2==s){var c=n.get(t+e),r=c?JSON.parse(c): {
        };

            return a in r?r[a]:null
        }},this.remove=function(e,a,t) {
        n&&(a===t?(a=e,this.set(a,null)): this.set(e,a,null))
    }},ace.cookie= {
    get: function(e){var a,t,n=document.cookie,s=e+"=";
        if(n){if(t=n.indexOf("; "+s),-1==t){if(t=n.indexOf(s),0!=t)return null
        }

        else t+=2;return a=n.indexOf(";",t),-1==a&&(a=n.length),decodeURIComponent(n.substring(t+s.length,a))
        }},set:function(e,a,t,n,s,i) {
        var c=new Date;"object"==typeof t&&t.toGMTString?t=t.toGMTString(): parseInt(t,10)?(c.setTime(c.getTime()+1e3*parseInt(t,10)),t=c.toGMTString()):t="",document.cookie=e+"="+encodeURIComponent(a)+(t?"; expires="+t:"")+(n?"; path="+n:"")+(s?"; domain="+s:"")+(i?"; secure":"")
    },remove:function(e,a) {
        this.set(e,"",-1e3,a)
    }},ace.storage= {
    get: function(e){return window.localStorage.getItem(e)
    },set:function(e,a) {
        window.localStorage.setItem(e,a)
    },remove:function(e) {
        window.localStorage.removeItem(e)
    }},ace.sizeof=function(e) {
    var a=0;for(var t in e)e.hasOwnProperty(t)&&a++;return a
},ace.hasClass=function(e,a) {
    return(" "+e.className+" ").indexOf(" "+a+" ")>-1
},ace.addClass=function(e,a) {
    if(!ace.hasClass(e,a)){var t=e.className;e.className=t+(t.length?" ": "")+a
    }},ace.removeClass=function(e,a) {
    ace.replaceClass(e,a)
},ace.replaceClass=function(e,a,t) {
    var n=new RegExp("(^|\\s)"+a+"(\\s|$)","i");e.className=e.className.replace(n,function(e,a,n){return t?a+t+n: " "
    }).replace(/^\s+|\s+$/g,"")
},ace.toggleClass=function(e,a) {
    ace.hasClass(e,a)?ace.removeClass(e,a): ace.addClass(e,a)
},ace.isHTTMlElement=function(e) {
    return window.HTMLElement?e instanceof HTMLElement: "nodeType"in e?1==e.nodeType:!1
},ace.data=new ace.data_storage(ace.config.storage_method);