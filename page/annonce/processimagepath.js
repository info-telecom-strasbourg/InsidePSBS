import React from "react";
export function ProcessImagePath(strfichiers) {
    var fichiers = strfichiers
    fichiers=fichiers.replace("[","");
    fichiers=fichiers.replace("]","");
    fichiers=fichiers.replace("\\","");
    fichiers=fichiers.split(",");
    return (
        fichiers
    );
}  

