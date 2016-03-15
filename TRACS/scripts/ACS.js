function ACS () {
    this.base = {text:null, nameElement:null, timestamp: null};
    this.ranges = {};
    this.scf = {};
    this.dcf = { steps:[], variables:[], evaluations:[], files:[] };
}

ACS.prototype.setupBase = function (nameElement, text) {
    this.base.nameElement = nameElement;
    this.base.text = text;
    this.base.timestamp = new Date();
}

ACS.prototype.getName = function () {
    return this.base.nameElement.innerText;
}

ACS.prototype.setupRanges = function () {

}

ACS.prototype.setupSCF = function () {

}

ACS.prototype.setupDCF = function () {

}

ACS.prototype.addFile = function (TRACSfile) {
    this.dcf.files.push(TRACSfile);
}

logAllEntries = function (listOfEntries) {
    var blob = "";
    for (var i in listOfEntries) {
        blob += ("\n" + listOfEntries[i]);
    }
    return blob;
}

ACS.prototype.download = function () {
    var blob = "";
    blob += ("ACS:{");
    blob += ("\n\tbase:{");
    blob += ("\n\t\tcreated:" + this.base.timestamp.toString());
    blob += (",\n\t\tname:" + this.getName());
    blob += (",\n\t\ttext:\n" + this.base.text);
    blob += ("\n\t},\n\tranges:{");
    blob += logAllEntries(this.base.ranges);
    blob += ("\n\t},\n\tscf:{");
    blob += ("\n\t},\n\tdcf:{");
    blob += ("\n\t\tsteps:{");
    blob += logAllEntries(this.dcf.steps);
    blob += ("\n\t\t},\n\t\tvariables:{");
    blob += logAllEntries(this.dcf.variables);
    blob += ("\n\t\t},\n\t\tevaluations:{");
    blob += logAllEntries(this.dcf.evaluations);

    blob += ("\n\t\t},\n\t\tfiles:{");
    for (var i in this.dcf.files) {
        blob += ("\n\t\t\tfileID:" + this.dcf.files[i].fileID);
        blob += ("\n\t\t\tname:" + this.dcf.files[i].nameElement.innerText);
        blob += ("\n\t\t\tcontents:" + this.dcf.files[i].contentsElement.innerText);
        blob += ("\n\t\t\tcreated:" + this.dcf.files[i].timeStamp.toString());
    }

    blob += ("\n\t\t}\n\t}\n}");

    return blob;

}