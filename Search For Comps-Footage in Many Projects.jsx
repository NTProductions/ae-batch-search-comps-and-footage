// Search for Comps/Footage in many projects

var projects = getProjectFiles(Folder("~/Videos"));
var compsAndFootage = getCompsAndFootage(projects);
// [0] == comps
// [1] == footage
alert(compsAndFootage[0]);
alert(compsAndFootage[1]);

function getProjectFiles(folder) {
    var files = folder.getFiles();
    var foundProjects = [];
    for(var i = 0; i < files.length; i++) {
        if(files[i].name.slice(files[i].name.length-4, files[i].name.length) == ".aep") {
            foundProjects.push(files[i]);
            }
        }
    return foundProjects;
    }

function getCompsAndFootage(projectFiles) {
    var foundComps = [];
    var foundFootage = [];
    app.beginSuppressDialogs();

    for(var i = 0; i < projectFiles.length; i++) {
    app.open(projectFiles[i]);
    for(var e = 1; e <= app.project.numItems; e++) {
        if(app.project.item(e) instanceof CompItem) {
            foundComps.push(app.project.item(e).name);
            }
        if(app.project.item(e).file) {
            foundFootage.push(app.project.item(e).name);
            }
        }
    app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
    }
    app.endSuppressDialogs(false);
    return [foundComps, foundFootage];
    }