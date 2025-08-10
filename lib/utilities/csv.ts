export const parseCSVToJSON = (csvText: string) => {
	const lines = csvText
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0);

	// Assuming the first row might be the header
	const firstRow = lines[0].split(",");

	// Function to check if the first row seems like a header (contains non-numeric text)
	const isHeader = firstRow.every((value) => {
		const cleaned = value.replace(/^"+|"+$/g, "").trim();
		return isNaN(Number(cleaned)) && isNaN(Date.parse(cleaned));
	});
	console.log("HEADER", isHeader, firstRow);

	let headers: string[];
	let startIdx: number = 0;

	if (isHeader) {
		// If it's a header, use the first row as headers
		headers = firstRow;
		startIdx = 1;
	} else {
		// If there's no header, use default column names
		headers = Array.from({ length: firstRow.length }, (_, i) => String(i));
	}

	const json = lines.slice(startIdx).map((line) => {
		const values = line.split(",");
		const obj: Record<string, string> = {};

		// Map values to headers
		headers.forEach(
			(header, index) => (obj[header.trim()] = values[index]?.trim() ?? ""),
		);

		return obj;
	});

	return json;
};
