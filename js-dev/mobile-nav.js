// mobile nav toggle
(function(){
	var html    = document.querySelector('html'),
		menuBtn = document.querySelector('.mobile-nav-toggle'),
		navIsShowing = false,
		classnameShowNav = 'showNav';

	function toggleMobileNav(e){

		if( navIsShowing ){
			html.classList.remove( classnameShowNav );
		}else{
			html.classList.add( classnameShowNav );
		}

		navIsShowing = !navIsShowing;
	}

	menuBtn.addEventListener('click', toggleMobileNav);
})();