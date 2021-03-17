import readFile from "@/helpers/readFile";

const collectAllFileData = async (data)  => {
    return await Promise.all(Array.from(data).map(async (file) => ({
        name: file.name,
        data: await readFile(file),
        value: 0,
    })));
}

const formatData = (results) => {
    return {
        fileCollection: results,
        targetFiles: [].concat(results[0])
    }
}

const calculateValues = (data, targetFiles, fileCollection) => {
    let result = 0;

    for (let i = 0; i < data.length; i++) {
        const string = data[i];
        const stringToInt = parseInt(data[i]);
        const newFile = fileCollection.find(file => file.name === string);

        if(newFile) {
            if(!targetFiles.find(file => file.name === newFile.name)) {
                targetFiles.push(newFile);
            }
            result += calculateValues(newFile.data, targetFiles, fileCollection)
        }

        if(!isNaN(stringToInt)) {
            result += stringToInt;
        }
    }

    return result;
}

const loopFileData = (data) => {
    for (let i = 0; i < data.targetFiles.length; i++) {
        const targetFile = data.targetFiles[i];
        targetFile.value += calculateValues(targetFile.data, data.targetFiles, data.fileCollection);
    }

    return data.targetFiles;
}

const calculateValueOfTargetFiles = async (data) => {
    return await collectAllFileData(data)
        .then(formatData)
        .then(loopFileData);
}

export default calculateValueOfTargetFiles;