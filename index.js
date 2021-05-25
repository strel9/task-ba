const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

const table = document.querySelector('.table');
const modal = document.querySelector('.modal');
const modalDialog = document.querySelector('.modal-dialog');
const tableHeaders = document.getElementsByTagName('th');

const getData = async function (url) {
	const res = await fetch(url);
	return await res.json();
};

const findUserById = (array, id) => array.find((item) => item.id === id);

const sortTable = (columnId) => {
	let rows, switching, i, x, y, shouldSwitch;

	switching = true;
	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < rows.length - 1; i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName('TD')[columnId];
			y = rows[i + 1].getElementsByTagName('TD')[columnId];
			if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
};

const renderRow = (parentNode, item) => {
	const tableRow = document.createElement('tr');
	parentNode.append(tableRow);
	tableRow.className = 'tableRow';
	tableRow.innerHTML = `
						<td class='tableCell' id="${item.id}">${item.name}</td>
						<td class='tableCell' id="${item.id}">${item.username}</td>
						<td class='tableCell' id="${item.id}">${item.email}</td>
						<td class='tableCell' id="${item.id}">${item.website}</td>
	`;
};

const renderTable = (users) => {
	users.map((item) => renderRow(table, item));
};
const renderModal = (user) => {
	modal.classList.add('is-open');
	modalDialog.innerHTML = `
									<table class='table'>
										<thead>
											<tr>
												<th class='tableCell'>street</th>
												<th class='tableCell'>city</th>
												<th class='tableCell'>zipcode</th>
												<th class='tableCell'>website</th>
											</tr>
										</thead>
								
										<tbody>
											<td class='tableCell'>${user.address.street}</td>
											<td class='tableCell'>${user.address.city}</td>
											<td class='tableCell'>${user.address.zipcode}</td>
											<td class='tableCell'>${user.website}</td>
										</tbody>
									</table>
						`;
};

getData(BASE_URL).then((data) => {
	renderTable(data);

	table.onclick = function (event) {
		if (event.target.tagName === 'TD') {
			const tabCell = event.target.closest('.tableCell');
			renderModal(findUserById(data, parseInt(tabCell.id)));
		}
	};
});

const item = (columnId) => () => sortTable(columnId);

for (let i = 0; i < tableHeaders.length; i++) {
	tableHeaders[i].addEventListener('click', item(i));
}

modal.onclick = (event) => {
	const modalDialog = event.target.closest('.modal-dialog');
	if (event.target.tagName != modalDialog) {
		modal.classList.remove('is-open');
	}
};
