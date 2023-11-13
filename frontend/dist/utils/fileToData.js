/**
 * Converts a file to base64 string
 *
 * @param file - File to convert to base64
 * @returns  - Promise that resolves to base64 string
 */
export default function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
        if (!file.type.match(/image\/(jpeg|png)/)) {
            reject(new Error('Invalid file type. Only JPG and PNG files are allowed.'));
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var result = reader.result;
            resolve(result);
        };
        reader.onerror = function (error) { return reject(error); };
    });
}
//# sourceMappingURL=fileToData.js.map