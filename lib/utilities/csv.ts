const parseCSVToJSON = (csvText: string) => {
  const lines = csvText.split("\n");
  const headers = lines[0].split(",");
  const json = lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index].trim();
    });
    return obj;
  });
  return json;
};
