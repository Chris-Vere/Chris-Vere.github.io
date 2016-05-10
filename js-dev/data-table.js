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