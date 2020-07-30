module.exports = {
    upload: function(file, destinationPath, maxSize) {
        return new Promise((resolve, reject) => {
            file.upload({
                dirname: "../../assets/uploads" + destinationPath,
                maxBytes: maxSize
                }, function (err, filesUploaded) {
                if (err) {
                    return reject(err)
                }
                const fullImageDirectory = filesUploaded[0].fd;
                fullImageDirectoryElements = fullImageDirectory.split('/');
                const fileName = fullImageDirectoryElements[fullImageDirectoryElements.length-1];
                const hostname = 'http://localhost:1337';
                const imageDirectory = hostname + '/uploads' + destinationPath + '/' + fileName;
                console.log(imageDirectory);
                return resolve(imageDirectory)
            })
        })
    }
}