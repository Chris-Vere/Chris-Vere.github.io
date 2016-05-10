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