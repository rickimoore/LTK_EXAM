const readFile = (file) => new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = function() {
        resolve(reader.result.split("\n"))
    };
    reader.onerror = reject;
    reader.readAsText(file);
});

export default readFile;