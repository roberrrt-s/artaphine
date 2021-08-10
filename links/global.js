// lol

fetch("https://spreadsheets.google.com/feeds/list/1N_w4sj2uziwG1_8OQXCsOGYnAdEf0grCljdPdd5IJcA/1/public/values?alt=json")
	.then(res => res.json())
	.then(json => {
		const data = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */

		const rows = json.feed.entry

		for(const row of rows) {
			const formattedRow = {}

			for(const key in row) {
				if(key.startsWith("gsx$")) {

				/* The actual row names from your spreadsheet
				 * are formatted like "gsx$title".
				 * Therefore, we need to find keys in this object
				 * that start with "gsx$", and then strip that
				 * out to get the actual row name
				 */

					formattedRow[key.replace("gsx$", "")] = row[key].$t

				}
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

			console.log(data)

    	}
	})