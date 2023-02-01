/**
 * fonction qui permet de traiter le chemin des images reçu du laravel en un path utilisable par react native
 * @param {string} string contenant le chemin des images venant du laravel
 * @returns {string} string contenant le chemin des images utilisable par react native
 * 
*/
export function processImagePath(strfichiers) {
    var fichiers = strfichiers
    fichiers=fichiers.replace("[","");
    fichiers=fichiers.replace("]","");
    fichiers=fichiers.replace("\\","");
    fichiers=fichiers.split(",");
    return (
        fichiers
    );
}  

