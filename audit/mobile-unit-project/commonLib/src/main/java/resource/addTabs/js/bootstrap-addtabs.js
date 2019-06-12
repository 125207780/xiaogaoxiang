
/**
 * Website: http://git.oschina.net/hbbcs/bootStrap-addTabs
 *
 * Version : 1.0
 *
 * Created by joe on 2016-2-4.
 */

$.fn.addtabs = function (options) {
    addTabsObj = $(this);
    Addtabs.options = $.extend({
        content: '', //直接指定所有页面TABS内容
        close: true, //是否可以关闭
        monitor: 'body', //监视的区域
        iframeUse: true, //使用iframe还是ajax
        iframeHeight: $(window).height() - 35, //固定TAB中IFRAME高度,根据需要自己修改
        method: 'init',
        callback: function () { //关闭后回调函数
        }
    }, options || {});


    $(Addtabs.options.monitor).on('click', '[data-addtab]', function () {
        Addtabs.add({
            id: $(this).attr('data-addtab'),
            title: $(this).attr('title') ? $(this).attr('title') : $(this).html(),
            content: Addtabs.options.content ? Addtabs.options.content : $(this).attr('content'),
            url: $(this).attr('url'),
            ajax: $(this).attr('ajax') ? true : false
        });
    });

    addTabsObj.on('click', '.close-tab', function () {
        var id = $(this).prev("a").attr("aria-controls");
        Addtabs.close(id);
    });
    
    //addTabsObj上禁用右键菜单
    /*addTabsObj.on('contextmenu', 'li[role=presentation]', function () {
        var id = $(this).children('a').attr('aria-controls');
        Addtabs.pop(id, $(this));
        return false;
    });*/

    //刷新页面
    addTabsObj.on('click', 'ul.rightMenu a[data-right=refresh]', function () {
        var id = $(this).parent('ul').attr("aria-controls").substring(4);
        var url=$(this).parent('ul').attr('aria-url');
        Addtabs.add({'id':id,'url':url});
        $('#popMenu').fadeOut();
    });

    //关闭自身
    addTabsObj.on('click', 'ul.rightMenu a[data-right=remove]', function () {
        var id = $(this).parent("ul").attr("aria-controls");
        Addtabs.close(id);
        Addtabs.drop();
        $('#popMenu').fadeOut();
    });

    //关闭其他
    addTabsObj.on('click', 'ul.rightMenu a[data-right=remove-circle]', function () {
        var tab_id = $(this).parent('ul').attr("aria-controls");
        addTabsObj.children('ul.nav').find('li').each(function () {
            var id = $(this).attr('id');
            if (id && id != 'tab_' + tab_id) {
                Addtabs.close($(this).children('a').attr('aria-controls'));
            }
        });
        Addtabs.drop();
        $('#popMenu').fadeOut();
    });

    //关闭左侧
    addTabsObj.on('click', 'ul.rightMenu a[data-right=remove-left]', function () {
        var tab_id = $(this).parent('ul').attr("aria-controls");
        $('#tab_' + tab_id).prevUntil().each(function () {
            var id = $(this).attr('id');
            if (id && id != 'tab_' + tab_id) {
                Addtabs.close($(this).children('a').attr('aria-controls'));
            }
        });
        Addtabs.drop();
        $('#popMenu').fadeOut();
    });

    //关闭右侧
    addTabsObj.on('click', 'ul.rightMenu a[data-right=remove-right]', function () {
        var tab_id = $(this).parent('ul').attr("aria-controls");
        $('#tab_' + tab_id).nextUntil().each(function () {
            var id = $(this).attr('id');
            if (id && id != 'tab_' + tab_id) {
                Addtabs.close($(this).children('a').attr('aria-controls'));
            }
        });
        Addtabs.drop();
        $('#popMenu').fadeOut();
    });

    addTabsObj.on('mouseover', 'li[role = "presentation"]', function () {
        $(this).find('.close-tab').show();
    });

    addTabsObj.on('mouseleave', 'li[role = "presentation"]', function () {
        $(this).find('.close-tab').hide();
    });

    $(window).resize(function () {
        addTabsObj.find('iframe').attr('height', '100%');
        Addtabs.drop();
    });

};

window.Addtabs = {
    options: {},
    add: function (opts) {
    	opts = $.extend({
            content: '',
            close: true,
            monitor: 'body',
            iframeUse: true,
            iframeHeight: $(window).height() - 35,
            method: 'init',
            callback: function () {}
        }, opts || {});
    	
        var id = 'tab_' + opts.id;
        $('li[role = "presentation"].active').removeClass('active');
        $('div[role = "tabpanel"].active').removeClass('active');
        //如果TAB不存在，创建一个新的TAB
        if (!$("#" + id)[0]) {
            //创建新TAB的title

            var title = $('<li>', {
                'role': 'presentation',
                'id': 'tab_' + id,
                'data-id': opts.id,
                'aria-url':opts.url
            }).append(
                $('<a>', {
                    'href': '#' + id,
                    'aria-controls': id,
                    'role': 'tab',
                    'data-id': opts.id,
                    'data-toggle': 'tab',
                    'style': 'padding-right: 20px; padding-left: 15px;'
                }).html(opts.title)
            );

            //是否允许关闭
            if (opts.close) {
                title.append(
                    $('<i>', {'class': 'close-tab glyphicon glyphicon-remove', 'style': 'font-size: 13px; color: #b4c5cf;'})
                );
            }
            //创建新TAB的内容
            var content = $('<div>', {
                'class': 'tab-pane',
                'id': id,
                'role': 'tabpanel'
            });

            //加入TABS
            addTabsObj.children('.nav-tabs').append(title);
            addTabsObj.children(".tab-content").append(content);
        } else {
            var content = $('#' + id);
            content.html('');
        }

        //是否指定TAB内容
        if (opts.content) {
            content.append(opts.content);
        } else if (opts.iframeUse && !opts.ajax) {//没有内容，使用IFRAME打开链接
            content.append(
                $('<iframe>', {
                    'class': 'iframeClass',
                    'height': opts.iframeHeight,
                    'frameborder': "no",
                    'border': "0",
                    'src': opts.url
                })
            );
        } else {
            $.get(opts.url, function (data) {
                content.append(data);
            });
        }

        //激活TAB
        $('#tab_' + id).addClass('active');
        $('#' + id).addClass('active');
        Addtabs.drop();
    },
    pop: function (id,e) {
        $('body').find('#popMenu').remove();
        var pop = $('<ul>', {'aria-controls': id, 'class': 'rightMenu list-group', id: 'popMenu','aria-url':e.attr('url')})
            .append(
            '<a href="javascript:void(0);" class="list-group-item" data-right="refresh"><i class="glyphicon glyphicon-refresh"></i> 刷新此标签</a>' +
            '<a href="javascript:void(0);" class="list-group-item" data-right="remove"><i class="glyphicon glyphicon-remove"></i> 关闭此标签</a>' +
            '<a href="javascript:void(0);" class="list-group-item" data-right="remove-circle"><i class="glyphicon glyphicon-remove-circle"></i> 关闭其他标签</a>' +
            '<a href="javascript:void(0);" class="list-group-item" data-right="remove-left"><i class="glyphicon glyphicon-chevron-left"></i> 关闭左侧标签</a>' +
            '<a href="javascript:void(0);" class="list-group-item" data-right="remove-right"><i class="glyphicon glyphicon-chevron-right"></i> 关闭右侧标签</a>'
        );
        pop.css({
            'top': e.context.offsetHeight - 10 + 'px',
            'left': e.context.offsetLeft + 20 + 'px'
        });
        pop.appendTo(addTabsObj).fadeIn('slow');
        pop.mouseleave(function () {
            $(this).fadeOut('slow');
        });
    },
    close: function (id) {
    	// 判断当前标签是否可以关闭
    	if( $( '#tab_' + id ).find( 'i.close-tab.glyphicon.glyphicon-remove' ).length > 0 ) {
    		//如果关闭的是当前激活的TAB，激活他的前一个TAB
            if (addTabsObj.find("li.active").attr('id') === "tab_" + id) {
                $("#tab_" + id).prev().addClass('active');
                $("#" + id).prev().addClass('active');
            }
            //关闭TAB
            $("#tab_" + id).remove();
            $("#" + id).remove();
            Addtabs.drop();
            Addtabs.options.callback();
    	}
    },
    closeAll: function () {
        $.each(addTabsObj.find('li[id]'), function () {
            var id = $(this).children('a').attr('aria-controls');
            $("#tab_" + id).remove();
            $("#" + id).remove();
        });
        addTabsObj.find('li[role = "presentation"]').first().addClass('active');
        var firstID=addTabsObj.find('li[role = "presentation"]').first().children('a').attr('aria-controls');
        $('#'+firstID).addClass('active');
        Addtabs.drop();
    },
    drop: function () {
        element = addTabsObj.find('.nav-tabs');
        //创建下拉标签
        var dropdown = $('<li>', {
            'class': 'dropdown pull-right hide tabdrop tab-drop'
        }).append(
            $('<a>', {
                'class': 'dropdown-toggle',
                'data-toggle': 'dropdown',
                'href': '#'
            }).append(
                $('<i>', {'class': "glyphicon glyphicon-align-justify"})
            ).append(
                $('<b>', {'class': 'caret'})
            )
        ).append(
            $('<ul>', {'class': "dropdown-menu"})
        )

        //检测是否已增加
        if (!$('.tabdrop').html()) {
            dropdown.prependTo(element);
        } else {
            dropdown = element.find('.tabdrop');
        }
        //检测是否有下拉样式
        if (element.parent().is('.tabs-below')) {
            dropdown.addClass('dropup');
        }
        var collection = 0;

        //检查超过一行的标签页
        element.append(dropdown.find('li'))
            .find('>li')
            .not('.tabdrop')
            .each(function () {
                if (this.offsetTop > 0 || element.width() - $(this).position().left - $(this).width() < 83) {
                    dropdown.find('ul').append($(this));
                    collection++;
                }
            });

        //如果有超出的，显示下拉标签
        if (collection > 0) {
            dropdown.removeClass('hide');
            if (dropdown.find('.active').length == 1) {
                dropdown.addClass('active');
            } else {
                dropdown.removeClass('active');
            }
        } else {
            dropdown.addClass('hide');
        }
    }
}