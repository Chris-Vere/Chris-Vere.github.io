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