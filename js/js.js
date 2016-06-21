$(function(){
    //固定导航
    function rightFixedNav(){
        var HV = $(window).height();
        $(window).resize(function(){
            var HV = $(this).height();
            $('#rightFixedNav').height(HV);
        })
        var _scrollTop = $(window).scrollTop();
        $(window).scroll(function(){
            scrollTopNav = $(window).scrollTop();
            _scrollTop = scrollTopNav;
            if(_scrollTop > HV / 2){
                $('#rightFixedNav .digg').fadeIn(1000);
            }else{
                $('#rightFixedNav .digg').fadeOut(1000);
            }
        })
        $('#rightFixedNav').height(HV);
        $('#rightFixedNav li') .hover(function(){
            $(this).find('span').css({ display:'block'});
        },function(){
            $(this).find('span').css({ display:'none'});
        })
        $('#rightFixedNav .digg').click(function(){
            $('html,body').animate({scrollTop:0},1000)
        })
    }
    rightFixedNav();

    //nav
    function indexNav(){
        $('#nav .columnList').hover(function(){
            $(this).addClass('active').find('em').html('&#xe601;');
        },function(){
            $(this).removeClass('active').find('em').html('&#xe600;');
        })
        $('.line').click(function(event) {
            $(this).toggleClass('out').siblings('.nav-pad').slideToggle(300);
        });
    }
    indexNav();

    // banner部分
   function indexBanner(){
       var w = $(window).width();
       $('#indexBanner ul li a').width(w);
       var tag = $('#indexBanner ul li.first').clone();
       $('#indexBanner ul').append(tag);

       $('#indexBanner ol li').click(function(event) {
           $(this).addClass('current').siblings('li').removeClass('current');
           var index = $(this).index();
           bannerNum=index;
           $('#indexBanner ul').animate({left:-index*w}, 500);
       });
       function autoPlay(){
           bannerNum++;
           if(bannerNum > 4){
               $('#indexBanner ul').css({left:0});
               bannerNum=1;
           }
           $('#indexBanner ol li').eq(bannerNum).addClass('current').siblings('li').removeClass('current');

           $('#indexBanner ul').animate({left:-bannerNum*w}, 500);
           if(bannerNum == 4){
               $('#indexBanner ol li').eq(0).addClass('current').siblings('li').removeClass('current');
           }
       }
       function prevPlay(){
           bannerNum --;
           if(bannerNum < 0){
               $('#indexBanner ul').css({left:-4*w});
               bannerNum = 3;
           }
           $('#indexBanner ol li').eq(bannerNum).addClass('current').siblings('li').removeClass('current');

           $('#indexBanner ul').animate({left:-bannerNum*w}, 500);
           if(bannerNum == 4){
               $('#indexBanner ol li').eq(0).addClass('current').siblings('li').removeClass('current');
           }
       }
       var bannerTimer = null;
       var bannerNum=0;
       bannerTimer = setInterval(autoPlay,2000);
       $('#indexBanner').hover(function() {
           clearInterval(bannerTimer);
           $('#indexBanner .left, #indexBanner .right').fadeIn(300);
       }, function() {
           clearInterval(bannerTimer);
           bannerTimer = setInterval(autoPlay,2000);
           //$('#indexBanner .left, #indexBanner .right').fadeOut(300);
       });

       $('#indexBanner .right').click(function(event) {
           autoPlay();
       });
       $('#indexBanner .left').click(function(event) {
           prevPlay();
       });
       $(window).resize(function(event) {
           w = $(window).width();
           $('.banner ul li a').width(w);
           $('.banner ul').stop().animate({left:-bannerNum*w}, 500);
       });
   }
    indexBanner();

    //item鼠标经过效果
    function item(){
        var $div = $('<div class="margin"></div>')
        $('#indexMain .investmentItem').hover(function(){
            $(this).css({'border-color':'#eaeaea'}).append($div)
        },function(){
            $(this).css({'border-color':'#d3d3d3'}).children('div.margin').remove();
        })
    }
    item();

    //倒记时插件
    function countdownTime(){
        var countdownTime;
        var countdownInterVal;

        $(document).ready(function() {
            countdownTime = parseInt($("#countdown").html()); //这里获取倒计时的起始时间
            countdownInterVal = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行
        });

        //将时间减去1秒，计算天、时、分、秒
        function SetRemainTime() {
            if (countdownTime > 0) {
                countdownTime = countdownTime - 1;
                var second = Math.floor(countdownTime % 60);             // 计算秒
                var minite = Math.floor((countdownTime / 60) % 60);      //计算分

                $("#countdownWrap").html(minite + "分" + second + "秒");
            } else {//剩余时间小于或等于0的时候，就停止间隔函数
                window.clearInterval(countdownInterVal);
                //这里可以添加倒计时时间为0后需要执行的事件
            }
        }
    }
    countdownTime();

    //进度条
    function progressBar(){
        var dataW = 11080;
        var canW =  Math.floor(dataW / 258);
        $('.progressBar').width(canW).siblings('span').html(canW+'%');
    }
    progressBar();

    //发标预告
    function indexUpdataTxt(){
        var tag = $('.updataTxt li').clone();
        $('.updataTxt').append(tag);
        var updataTime = null;
        var num = 0;
        var LiH = $('.updataTxt li').outerHeight(true);
        var updataLenght = $('#indexMain .updataTxt li').length;
        var all = updataLenght / 2;
        function autoPlay(){
            num ++;
            if(num > all){
                $('#indexMain .updataTxt').css({top:0});
                num = 0;
            }
            $('#indexMain .updataTxt').animate({top:- num * LiH},500);
        }
        updataTime = setInterval(autoPlay,2000);
    }
    indexUpdataTxt();

    //我的帐户tab切换
    function myAccountTab(){
        $('#myAccountMain .info .Tab span').click(function(){
            var index = $(this).index();
            $(this).addClass('active').siblings('span').removeClass('active');
            $('#myAccountMain .info .item table').eq(index).css({display:'block'}).siblings('table').css({display:'none'})
        })
    }
    myAccountTab();

    //我的投资tab切换
    function myInvestmentTab(){
        $('#myInvestmentMain .Tab .tableTab').click(function(){
            var index = $(this).index();
            $(this).addClass('active').siblings('span').removeClass('active');
            $('#myInvestmentMain .Tab table').eq(index).css({display:'block'}).siblings('table').css({display:'none'})
        })
    }
    myInvestmentTab();

    //jumpPage
    function jumpPage(){
        var pageListHeight = $('.jumpPage .pageList').width();
        $('.jumpPage .pageList').css({'margin-left': - pageListHeight / 2});
        $('.jumpPage .pageList li').eq(0).css({'border-color':'#fff'});
        $('.jumpPage .pageList li').eq(1).css({'border-color':'#fff'});
        $('.jumpPage .pageList li').eq(8).css({'border-color':'#fff'});
        $('.jumpPage .pageList li').click(function(){
            $(this).css({'border-color':'#fff'}).siblings('li').css({'border-color':'#dfdfdf'});
            $('.jumpPage .pageList li').eq(0).css({'border-color':'#fff'});
            $('.jumpPage .pageList li').eq(1).css({'border-color':'#fff'});
            $('.jumpPage .pageList li').eq(8).css({'border-color':'#fff'});
        });
        $('.jumpPage .pageList li').hover(function(){
            var index = $(this).index();
            if(index != 0 ) {
                if(index !=1){
                    if(index != 8){
                        $(this).css({'border-color':'#1e7ed7','background':'#dfedfa'});
                    }
                }
            }
        },function(){
            var index = $(this).index();
            if(index != 0 ) {
                if(index != 1) {
                    if (index != 8) {
                        $(this).css({'border-color': '#dfdfdf', 'background': 'none'});
                    }
                }
            }
        })
    }
    jumpPage();

    //关于我们,帮助中心切换
    function aboutUs(){
        var index;
        $('.sideNav1 dd').hover(function(){
            index = $(this).index();
            if($(this).hasClass('default')){
                $(this).children('a').css({color:'#fff','cursor':'text'})
            }else{
                $(this).css({background:'#ececec'});
                    $('.sideNav1 .activeDt').css({top: index * 57, display:'block'})
            }
        },function(){
            if($(this).hasClass('default')){}else {
                $(this).css({background: '#fff'})
                $('.sideNav1 .activeDt').css({display: 'none'})
            }
        })
        $('.sideNav1 dd a').click(function(){
            $('.detailsListTab .page').eq(index).css({display:'block'}).siblings('div').css({display:'none'});
            $(this).css({color:'#fff'}).parent('dd').addClass('default').siblings('dd').removeClass('default').css({background:'#fff'}).children('a').css({color:'#767676'});
            $('.sideNav1 .defaultDt').css({top:index * 57,display:'block'})
        })
    }
    aboutUs();

    //理财详情页tab切换
    function financialDetailsTab(){
        $('#financialDetailsMain .Tab .tableTab').click(function(){
            var index = $(this).index();
            $(this).addClass('active').siblings('span').removeClass('active');
            $('#financialDetailsMain .Tab div').eq(index).css({display:'block'}).siblings('div').css({display:'none'})
        })
    }
    financialDetailsTab();

    //理财详情页模态
    function modalityUserForm(){
        var WC = ($(window).width() - 445) / 2;
        var WH = ($(window).height())
        var arr = [];
        var arrH = new Array($('.modality div.user').length)
        $('.modality .user').each(function(index,e){
            arr[index] = $(this).height();
            arrH[index] = arr[index];
        })
        $('.modality').css({display:'none'});
        $('.modality .user').css({display:'none'});
        $('#securityCenterMain td.three').click(function(){
            var index = $(this).parent('tr').prevAll().length
            $('.modality').css({display:'block'});
            $('.modality .user').eq(index).css({display:'block','margin-left': WC,'margin-top':(WH - arrH[index]) / 2}).siblings('div.user').css({display:'none'});
        })
        $(window).resize(function(){
            var WC = ($(window).height() - $('.modality .user').height()) / 2;
            var HC = ($(window).width() - $('.modality .user').width()) / 2;
            $('.modality .user').css({ 'margin-top':WC});
            $('.modality .user').css({'margin-left':HC});
        })
        $('.modality .close').click(function(){
            $('.modality').css({display:'none'})
        })
    }
    modalityUserForm();

//    表单验证
    function FormValidation(){
        var $phone = $('.userFrom .phone input');
        var $mail = $('.userFrom .mail input');
        var $userName = $('.userFrom .userName input');
        var $password = $('.userFrom .password input');
        var $passwordOk = $('.userFrom .confirmPassword input');
        var rePhone = /^1[3|4|5|7|8]\d{9}$/;
        var reMail =  /^([\w\.\-]+)@([\w\.\-]+)\.([\w]{2,4})$/i;
        var reName = /[^\w\u4e00-\u9fa5]/g;  //不分中英文4-8
        $phone.focus(function(){
            $(this).siblings('p').html( '<i class="info"></i>请输入11位手机号' )
        })
        $phone.blur(function(){
            if( $(this).val() == '' ){
                $(this).siblings('p').html( '<i class="error"></i>手机号不能为空' )
            }else if(!rePhone.test($(this).val())){
                $(this).siblings('p').html( '<i class="error"></i>手机号格式不正确，请重新输入' )
            }else{
                $(this).siblings('p').html( '<i class="success"></i>' )
            }
        })
        $mail.focus(function(){
            $(this).siblings('p').html( '<i class="info"></i>请输入邮箱账号' )
        })
        $mail.blur(function(){
            if( $(this).val() == '' ){
                $(this).siblings('p').html( '<i class="error"></i>邮箱不能为空' )
            }else if(!reMail.test($(this).val())){
                $(this).siblings('p').html( '<i class="error"></i>邮箱格式不正确，请重新输入' )
            }else{
                $(this).siblings('p').html( '<i class="success"></i>' )
            }
        })

        $userName.focus(function(){
            $(this).siblings('p').html( '<i class="info"></i>请输入4-8个字符' )
        })
        $userName.blur(function(){
            if($(this).val() == ''){
                $(this).siblings('p').html( '<i class="error"></i>用户名不能为空' )
            }else if(reName.test($(this).val())){
                $(this).siblings('p').html( '<i class="error"></i>用户名含有非法字符，请重新输入' )
            }else if($(this).val().length < 4){
                $(this).siblings('p').html( '<i class="error"></i>用户名不能少于4个字符' )
            }else if($(this).val().length >8 ){
                $(this).siblings('p').html( '<i class="error"></i>用户名不能高于8个字符' )
            }else{
                $(this).siblings('p').html( '<i class="success"></i>' )
            }
        })
        $password.focus(function(){
            $(this).siblings('p').html( '<i class="info"></i>密码由6-16位数字，字母和下划线组成' )
        })
        $password.keyup(function(){
            if($(this).val().length > 5){
                $(this).parents('.setPassword').find('u').eq(0).addClass('weak');
                if($(this).val().length > 7){
                    if(/(?=.*[A-Z])(?=.*[a-z])(?=.*[_])/g.test($(this).val())){
                        $(this).parents('.setPassword').find('u').eq(1).addClass('on');
                    }else if(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/g.test($(this).val())){
                        $(this).parents('.setPassword').find('u').eq(1).addClass('on');
                    }else if(/(?=.*[_])(?=.*[a-z])(?=.*[0-9])/g.test($(this).val())){
                        $(this).parents('.setPassword').find('u').eq(1).addClass('on');
                    }else if(/(?=.*[A-Z])(?=.*[_])(?=.*[0-9])/g.test($(this).val())){
                        $(this).parents('.setPassword').find('u').eq(1).addClass('on');
                    }else if(/(?=.*[A-Z])(?=.*[a-z])(?=.*[_])(?=.*[0-9])/g.test($(this).val())){
                        $(this).parents('.setPassword').find('u').eq(1).addClass('on');
                    }else{
                        $(this).parents('.setPassword').find('u').removeClass('on');
                    }
                    if($(this).val().length > 9) {
                        if(/(?=.*[A-Z])(?=.*[a-z])/g.test($(this).val())) {
                            $(this).parents('.setPassword').find('u').eq(1).addClass('on');
                        } else if(/(?=.*[a-z])(?=.*[0-9])/g.test($(this).val())) {
                            $(this).parents('.setPassword').find('u').eq(1).addClass('on');
                        }else if(/(?=.*[a-z])(?=.*[_])/g.test($(this).val())) {
                            $(this).parents('.setPassword').find('u').eq(1).addClass('on');
                        }else if(/(?=.*[A-Z])(?=.*[0-9])/g.test($(this).val())) {
                            $(this).parents('.setPassword').find('u').eq(1).addClass('on');
                        }else if(/(?=.*[A-Z])(?=.*[_])/g.test($(this).val())) {
                            $(this).parents('.setPassword').find('u').eq(1).addClass('on');
                        }else if(/(?=.*[_])(?=.*[0-9])/g.test($(this).val())) {
                            $(this).parents('.setPassword').find('u').eq(1).addClass('on');
                        }
                    }
                    if($(this).val().length > 11){
                          if(/(?=.*[_])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g.test($(this).val())){
                                  $(this).parents('.setPassword').find('u').eq(2).addClass('strong');
                            }else if(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g.test($(this).val())){
                                $(this).parents('.setPassword').find('u').eq(2).addClass('strong');
                            }else if(/(?=.*[_])(?=.*[0-9])(?=.*[a-z])/g.test($(this).val())){
                                $(this).parents('.setPassword').find('u').eq(2).addClass('strong');
                            }else if(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g.test($(this).val())){
                                  $(this).parents('.setPassword').find('u').eq(2).addClass('strong');
                            }else if(/(?=.*[0-9])(?=.*[_])(?=.*[A-Z])/g.test($(this).val())){
                                  $(this).parents('.setPassword').find('u').eq(2).addClass('strong');
                            }else if(/(?=.*[_])(?=.*[a-z])(?=.*[A-Z])/g.test($(this).val())){
                                  $(this).parents('.setPassword').find('u').eq(2).addClass('strong');
                              }
                    }else{
                        $(this).parents('.setPassword').find('u').removeClass('strong');
                    }
                }else{
                    $(this).parents('.setPassword').find('u').removeClass('strong');
                    $(this).parents('.setPassword').find('u').removeClass('on');
                }
            }else{
                $(this).parents('.setPassword').find('u').removeClass('weak');
                $(this).parents('.setPassword').find('u').removeClass('on');
                $(this).parents('.setPassword').find('u').removeClass('strong');
            }

        })
        $password.blur(function(){
            if( $(this).val() == '' ){
                $(this).siblings('p').html('<i class="error"></i>密码不能为空');
            }else if($(this).val().length<6){
                $(this).siblings('p').html('<i class="error"></i>密码不能少于6位');
            }else if($(this).val().length >16){
                $(this).siblings('p').html('<i class="error"></i>密码不能多于16位');
            }else if(/\W/g.test($(this).val())){
                $(this).siblings('p').html('<i class="error"></i>密码不能为特殊字符');
            }else if(!/[^\d]/g.test($(this).val())){
                $(this).siblings('p').html( '<i class="error"></i>密码不能为纯数字' )
            }else if(!/[^a-z]/g.test($(this).val())){
                $(this).siblings('p').html( '<i class="error"></i>密码不能为纯字母' )
            }else if(!/[^A-Z]/g.test($(this).val())){
                $(this).siblings('p').html( '<i class="error"></i>密码不能为纯字母' )
            }else if(!/[^_]/g.test($(this).val())){
                $(this).siblings('p').html( '<i class="error"></i>密码不能为纯下划线' )
            }else{
                $(this).siblings('p').html('<i class="success"></i>');
            }
        })

        $passwordOk.focus(function(){
            $(this).siblings('p').html( '<i class="info"></i>请再次输入密码' )
        })
        $passwordOk.blur(function(){
            if( $passwordOk.val() == ''){
                $(this).siblings('p').html( '<i class="error"></i>确认密码不能为空' )
            }else if( $passwordOk.val() != $password.val()){
                $(this).siblings('p').html( '<i class="error"></i>密码不一致，请再次输入密码' )
            }else{
                $(this).siblings('p').html( '<i class="success"></i>' )
            }
        })













    }
    FormValidation();

//    60S之后才能获取验证码
    function validationCode(){
        var validCode = true;
        $('.textCode').click(function(){
            $(this).addClass('weakTime');
            var time = 60;
            var code = $(this);
            if(validCode){
                validCode=false;
                var t=setInterval(function  () {
                    time--;
                    code.html(time+"s重新获取");
                    if (time==0) {
                        clearInterval(t);
                        code.html("获取短信验证码");
                        $(this).removeClass('weakTime')
                        validCode=true;
                    }
                },1000)
            }
        })
    }
    validationCode();

//    注册切换
    function registerTab(){
        $('.user span.regsiter').click(function(){
            var index = $(this).index();
            $(this).addClass('active').siblings('span').removeClass('active');
            $('.user .userFrom').eq(index).css({display:'block'}).siblings('form').css({display:'none'})
        })
    }
    registerTab();




})
