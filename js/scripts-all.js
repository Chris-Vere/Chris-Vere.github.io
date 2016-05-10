// @codekit-append "globals.js";
// @codekit-append "mobile-nav.js";
// @codekit-append "tabs.js";
// @codekit-append "login-modal.js";
// @codekit-append "data-table.js";

var cv = {
	log: function(message){
		console.log(message);
	},
	newElem:function(elementName){
		return document.createElement(elementName);
	}
};

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

// tabs
(function(){
	var tabs = document.querySelectorAll('.tabs'),
		classNameActiveTab = 'tabs__item--is-active',
		classNameActivePanel = 'tabs__panel--is-active';

	for(var i = 0; i < tabs.length; i++){
		var tabInstance = tabs[i],
			tabLinks = tabInstance.querySelectorAll('.tabs__link'),
			activeLink,
			activePanel;


		function handleTabClicked(e){
			var item = this,
				targetPanel = tabInstance.querySelector(item.getAttribute( 'href' ));

			activeLink.setAttribute('aria-selected', false);
			activeLink.parentNode.classList.remove( classNameActiveTab );
			activeLink = item;
			activeLink.setAttribute('aria-selected', true);
			activeLink.parentNode.classList.add( classNameActiveTab );

			activePanel.classList.remove( classNameActivePanel );
			activePanel.setAttribute('aria-hidden', 'true');
			activePanel = targetPanel;
			activePanel.setAttribute('aria-hidden', 'false');
			activePanel.classList.add( classNameActivePanel );

			e.preventDefault();
			return false;
		}

		for(var j = 0; j < tabLinks.length; j++){
			var tabItem = tabLinks[j];
			if( tabItem.parentNode.classList.contains( classNameActiveTab ) ){
				activeLink  = tabItem;
				activePanel = tabInstance.querySelector(activeLink.getAttribute('href'));
			}
			tabItem.addEventListener('click', handleTabClicked);
		}

	}
})();

// login modal
(function(){
	var html    = document.querySelector('html'),
		overlay = document.querySelector('.overlay'),
		modals  = overlay.querySelectorAll('.overlay-module'),
		classNameOverlayIsActive = "overlay--is-active",
		classNameOverlayIsBlock  = "overlay--is-block",
		classNameModalOpen = 'modal-open',
		currentModal;

	var modalLaunchers = document.querySelectorAll('[data-modal-launch]');

	function handleLaunchClicked(e){
		var targetModalId = this.dataset.modalTarget;
		var targetModal   = getModal( targetModalId );

		currentModal = targetModal;

		positionOverlay();
		launchOverlay();
		focusFirstField();

		html.addEventListener('keydown', onKeyDown);

		e.preventDefault();
		return false;
	}

	function getModal(modalId){
		for(var i = 0; i < modals.length; i++){
			// would use === for comparison here, but IE9 doesn't like it :(
			if( modals[i].getAttribute('id') == modalId ){
				return modals[i];
			}
		}
	}

	function onKeyDown(e){
		if(e.keyCode == 27){
			closeCurrentModal();
		}
	}

	function positionOverlay(){
		var body = document.body,
		    html = document.documentElement;

		var height = Math.max(
				body.scrollHeight,
				body.offsetHeight,
				html.clientHeight,
				html.scrollHeight,
				html.offsetHeight
			);

		overlay.style.height = height + "px";
		currentModal.style.top = window.scrollY + 'px';
	}

	function launchOverlay(){
		overlay.classList.add(classNameOverlayIsBlock);
		overlay.getBoundingClientRect();
		overlay.classList.add(classNameOverlayIsActive);
	}

	function closeCurrentModal(){
		overlay.classList.remove( classNameOverlayIsActive );
		html.removeEventListener('keydown', onKeyDown);
		window.setTimeout(function(){
			overlay.classList.remove(classNameOverlayIsBlock);
		}, 200);
	}

	function focusFirstField(){
		var inputs = currentModal.querySelectorAll('input');
		inputs[0].focus();
	}

	for(var i = 0; i < modalLaunchers.length; i++){
		modalLaunchers[i].addEventListener('click', handleLaunchClicked);
	}

	for(var i = 0; i < modals.length; i++){
		var closeBtns = modals[i].querySelectorAll('[data-modal-close]');
		for(var j = 0; j < closeBtns.length; j++){
			closeBtns[i].addEventListener('click', closeCurrentModal);
		}
	}

})();

// data table
(function(){
	var table = document.querySelector( '.table--feature' );
	var tbody = cv.newElem('tbody');
	var respAttrs = [ "", "Annual Percentage Yield", "Est. Earnings for 1 Year*" ];

	function buildTable(data){
		for(var i = 0; i < data.length; i++){
			var row = cv.newElem('tr');

			var index = 0;
			for( val in data[i] ){
				var td = cv.newElem('td');
				td.dataset.respText = respAttrs[index];
				td.textContent = data[i][val];
				row.appendChild( td );
				index++;
			}
			tbody.appendChild(row);
		}
		table.appendChild( tbody );
	}

	function buildError(){
		var row = cv.newElem('tr');
		var cell = cv.newElem('td');
		cell.classList.add('center')
		cell.setAttribute('colspan', '3');
		cell.textContent = 'Sorry, there was an error loading the content.';

		row.appendChild( cell );
		tbody.appendChild( row );
		table.appendChild( tbody );
	}

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'data/code-test.json');
	xhr.send(null);

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				buildTable(JSON.parse(xhr.responseText));
			}else{
				buildError();
			}
		}
	}
})();

