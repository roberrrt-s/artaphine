// lol

const spreadsheetId = '1N_w4sj2uziwG1_8OQXCsOGYnAdEf0grCljdPdd5IJcA'

fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`)
    .then(res => res.text())
    .then(text => {
        const json = JSON.parse(text.substr(47).slice(0, -2))

        console.log(json);

		const data = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */

		const rows = json.table.rows

		for(const row of rows) {
			const formattedRow = {
				url: row.c[1].v,
				text: row.c[0].v
			}

			data.push(formattedRow)

		}


		if(data) {
			const list = document.querySelector("#links");

			while(list.firstChild ){
				list.removeChild(list.firstChild );
			}

			data.forEach(item => {
				let li = document.createElement('li');
				let link = document.createElement('a');
                let text = document.createTextNode(item.text);

				link.href = item.url;
				link.title = item.text;

				list.appendChild(li);
				li.appendChild(link);
				link.appendChild(text);
			})

    	}
	}).catch(err => {
		console.log(err)
	});
