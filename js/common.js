/****************************************************
	파일명	: common.js
	최초작성자	: 이민혁
	최초작성일	: 2024-09-28
	-------------------------------------------------
	Dec. ui 핸들링, 공통 기능 구현 js
	-------------------------------------------------
	최종수정자	: 이민혁
	최종수정일	: 2024-09-28
	수정내용	: 최초작성
*****************************************************/

/**
 * 함수명 : 
 * 설명   : 스크롤 올릴 때 헤더 상단 고정
 * param  : 
 */

let lastScrollTop = 0;
$(window).scroll(function () {
	let scrollTop = $(this).scrollTop();
	let headerHeight = $(".ly-header").outerHeight();

	if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
	$(".ly-header").removeClass("is-fixed"); 
	} else if (scrollTop < lastScrollTop || scrollTop <= headerHeight) {
	$(".ly-header").addClass("is-fixed");  // 스크롤을 올릴 때 헤더를 고정
	}
	if (scrollTop <= headerHeight) {
		$(".ly-header").removeClass("is-fixed"); // 단 스크롤 높이 값이 header의 Height값보다 작아진다면 relative로 다시 전환하기 (최상단 애니메이션 막기)
	}
	lastScrollTop = scrollTop;
	lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 스크롤이 0일 때 음수로 가지 않게 함
});

/**
 * 함수명 : 
 * 설명   : gnb depth-1 버튼 클릭 시 active 클래스 바인딩
 * param  : 
 */
$('#gnb-lg .gnb-menu > button').on('click', function(){
	let isActive = $(this).parent().hasClass('is-active') 
	if (!isActive){ 
		$('#gnb-lg .gnb-menu').removeClass('is-active')
		$(this).parent().addClass('is-active')
		gnbBgOpen(true)
	} else {
		$(this).parent().removeClass('is-active')
		gnbBgOpen(false)
	}
})

/**
 * 함수명 : 
 * 설명   : gnb depth-2 버튼 클릭 시 active 클래스 바인딩, 진입 시 첫번째 서브 메뉴 액티브 처리
 * param  : 
 */

$('.gnb-submenu').each(function() {
	$(this).find('.gnb-submenu-link').eq(0).addClass('is-active');
});
$('#gnb-lg .gnb-submenu-link > button').on('click', function(){
	$('#gnb-lg .gnb-submenu-link').removeClass('is-active')
	$(this).parent().addClass('is-active')
})

/**
 * 함수명 : gnbBgOpen
 * 설명   : gnb 오픈 여부에 따라 배경 추가 및 삭제
 * param  : 오픈 값
 */
function gnbBgOpen(isOpen){
	if(isOpen){
		$('.gnb-backdrop').remove();
		$('body').append('<div class="gnb-backdrop"></div>')
	} else {
		$('.gnb-backdrop').remove();
	}
}

/**
 * 함수명 : 
 * 설명   : gnb 배경 클릭 시 gnb 비활성화 및 배경 비활성화
 * param  : 
 */
$('body').on("click", '.gnb-backdrop', function() { 
	$(this).hide();
	$('#gnb-lg .gnb-menu').removeClass('is-active')
});

/**
 * 함수명 : 
 * 설명   : 탭 콘텐츠 변경
 * param  : 
 */
$('.tab__content .tab').hide().eq(0).show();
$('.tab__btn button').eq(0).addClass('active');
$(".tab__wrap .tab__btn button").click(function () {
	var idx = $(this).parent().index();
	$(".tab__content .tab").hide();
	$(".tab__content .tab").eq(idx).fadeIn();
	$(".tab__btn button").removeClass("active");
	$(this).addClass("active");

	// 재외동포 민원 포털에서 가지고 옴. (접근성 위에 추가해야할듯)
	btnTab.removeClass("on").removeAttr("title");
	$(this).addClass("on").attr("title","선택됨");
});

/**
 * 함수명 : 
 * 설명   : 제이쿼리 달력 출력
 * param  : 
 */
$.datepicker.setDefaults({
	prevText: "이전 달",
	nextText: "다음 달",
	closeText: '닫기',
	monthNames: ["1","2","3","4","5","6","7","8","9","10","11","12"],
	monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
	dayNames: ['S','M','T','W','T','F','S'],
	dayNamesShort: ['S','M','T','W','T','F','S'],
	//dayNamesMin: ['S','M','T','W','T','F','S'],
	dayNamesMin: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
	weekHeader: 'Wk',
	yearSuffix: '.',
	dateFormat: "yy-mm-dd",
	firstDay: 0,
	showMonthAfterYear: true,
	//showOtherMonths: true,
	showOn: "both",
	buttonImage: "../../../images/portal/v2/icon_calendar.png",
	buttonImageOnly: true,
	buttonText: "달력 선택",
	changeMonth : true,
	changeYear : true,
	yearRange : "c-100:c+5",
	isRTL: false
});
$(".datepicker1").datepicker();
$(".datepicker1").on('click', function(){
	$('.ui-datepicker').addClass('clickEvent');
})


/**
 * 함수명 : fn_layers
 * 설명   : 다중 레이어 팝업 관리
 * param  : 
 */
function fn_layers(e){
	$('#' + e).fadeIn().addClass('is-open')
	$('#' + e).attr('tabindex', 0).focus()
	$('body').append('<div class="el-bg-popup"></div>')
	$('html, body').css('overflow', 'hidden')
}
// 레이어 닫기
function fn_layers_close(e){
	$('.modal').fadeOut();
	$('.modal').removeAttr('tabindex')
	$('.el-bg-popup').fadeOut()
	$('html, body').css('overflow', '')
}
// 레이어 bg 클릭 hide
$('body').on("click", '.el-bg-popup', function() { 
	$(this).hide();
	$('#gnb-lg .gnb-menu').removeClass('is-active')
	$('.modal').removeAttr('tabindex')
	$('.modal').fadeOut();
	$('html, body').css('overflow', '')
});


/**
 * 함수명 : 
 * 설명   : 커스텀 list 토글 클래스 부착, (화살표 백그라운드 변경 등에 사용)
 * param  : 
 */
$('.el-toggle-open').on('click',function(){
	$(this).parent().toggleClass('is-open')
	$(this).toggleClass('is-open')

	if($(this).parent()=== $('.bl-select')){
		overflowAutoAfterCheck()
	}
})

/**
 * 함수명 : popMyOption
 * 설명   : 로그인 후 마이페이지 클릭 시 팝업 토글
 * param  : 
 */
function popMyOption(){

}










