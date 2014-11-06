var rootPath = process.env.PWD;

var Mugen = {
    rootPath: process.env.PWD + "/",
    controllerTemplatePath: 'mugen/controllers/TemplateController.js',
    controllerDestinationPath: "lib/controllers/",
    controllerPrefix: "Controller.js",
    collectionTemplatePath: 'mugen/collections/TemplateCollection.js',
    collectionDestinationPath: "lib/collections/",
    collectionPrefix: ".js",
    viewTemplatePath: 'mugen/views/',
    viewDestinationPath: "client/views/",
    viewPrefixJs: ".js",
    viewPrefixHtml: ".html",
    routerTemplatePath: 'mugen/routers/templateRouter.js',
    routerDestinationPath: "client/routers/",
    routerPrefix: ".js",
    /* write file to path */
    write: function(path, content) {
        fs.writeFile(this.rootPath + path, content, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved to " + path);
            }
        });
    },
    /* read file from path */
    read: function(path) {
        return Assets.getText(path);
    },
    mkdir: function(path) {
        fs.mkdir(this.rootPath + path, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The folder was created at " + path);
            }
        });
    },
    /* replace all string to desired string */
    replaceAll: function(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    },
    toTitleCase: function(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },
    /* generate your controller from template, then replacing with collection */
    generateController: function(collection, fields) {
        //get controller template content
        var controllerTemplate = this.read(this.controllerTemplatePath);

        //get destinationPath, and set the file name
        var path = this.controllerDestinationPath + this.toTitleCase(collection) + this.controllerPrefix;

        //get the content, replace the template with desired collection
        var content = this.replaceAll(controllerTemplate, "Template", this.toTitleCase(collection));
        content = this.replaceAll(content, "template", collection.toLowerCase());

        //reformat fields as string, and replace it with [mugenControllerFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            stringFields += "{" + name + ": {$regex: search, $options: 'i'}},\n";
        });
        content = content.replace("[mugenControllerFields]", stringFields);

        //finally write it
        this.write(path, content);
    },
    /* generate your collection from template, then replacing with collection */
    generateCollection: function(collection, fields) {
        //get collection template content
        var collectionTemplate = this.read(this.collectionTemplatePath);

        //get destinationPath, and set the file name
        var path = this.collectionDestinationPath + this.toTitleCase(collection) + this.collectionPrefix;

        //get the content, replace the template with desired collection
        var content = this.replaceAll(collectionTemplate, "Template", this.toTitleCase(collection));
        content = this.replaceAll(content, "template", collection.toLowerCase());

        //reformat fields as string, and replace it with [mugenCollectionFields]
        var stringFields = "";
        fields.forEach(function(obj) {
            var name = obj.name;
            var type = obj.type;
            var label = obj.label;
            stringFields += name + ":{\ntype:" + type + ",\n label: '" + label + "',\n},\n";
        });
        content = content.replace("[mugenCollectionFields]", stringFields);

        //finally write it
        this.write(path, content);
    },
    generateView: function(collection, fields) {
        //create directory for views first
        this.mkdir(this.viewDestinationPath + collection.toLowerCase());

        //================= generate _form ===============//
        //get view template content
        var viewTemplate_formHtml = this.read(this.viewTemplatePath + "_form" + this.viewPrefixHtml);
        var viewTemplate_formJs = this.read(this.viewTemplatePath + "_form" + this.viewPrefixJs);

        //get destinationPath, and set the file name
        var path_formHtml = this.viewDestinationPath + collection.toLowerCase() + "/_form" + this.viewPrefixHtml;
        var path_formJs = this.viewDestinationPath + collection.toLowerCase() + "/_form" + this.viewPrefixJs;

        //get the content, replace the template with desired collection
        var content_formHtml = this.replaceAll(viewTemplate_formHtml, "Replacement", this.toTitleCase(collection));
        content_formHtml = this.replaceAll(content_formHtml, "replacement", collection.toLowerCase());
        var content_formJs = this.replaceAll(viewTemplate_formJs, "Replacement", this.toTitleCase(collection));
        content_formJs = this.replaceAll(content_formJs, "replacement", collection.toLowerCase());

        //finally write it
        this.write(path_formHtml, content_formHtml);
        this.write(path_formJs, content_formJs);
        //================= generate _form ===============//

        //================= generate index ===============//
        //get view template content
        var viewTemplateindexHtml = this.read(this.viewTemplatePath + "index" + this.viewPrefixHtml);
        var viewTemplateindexJs = this.read(this.viewTemplatePath + "index" + this.viewPrefixJs);

        //get destinationPath, and set the file name
        var pathindexHtml = this.viewDestinationPath + collection.toLowerCase() + "/index" + this.viewPrefixHtml;
        var pathindexJs = this.viewDestinationPath + collection.toLowerCase() + "/index" + this.viewPrefixJs;

        //get the content, replace the template with desired collection
        var contentindexHtml = this.replaceAll(viewTemplateindexHtml, "Replacement", this.toTitleCase(collection));
        contentindexHtml = this.replaceAll(contentindexHtml, "replacement", collection.toLowerCase());
        var contentindexJs = this.replaceAll(viewTemplateindexJs, "Replacement", this.toTitleCase(collection));
        contentindexJs = this.replaceAll(contentindexJs, "replacement", collection.toLowerCase());

        //finally write it
        this.write(pathindexHtml, contentindexHtml);
        this.write(pathindexJs, contentindexJs);
        //================= generate index ===============//

        //================= generate insert ===============//
        //get view template content
        var viewTemplateinsertHtml = this.read(this.viewTemplatePath + "insert" + this.viewPrefixHtml);
        var viewTemplateinsertJs = this.read(this.viewTemplatePath + "insert" + this.viewPrefixJs);

        //get destinationPath, and set the file name
        var pathinsertHtml = this.viewDestinationPath + collection.toLowerCase() + "/insert" + this.viewPrefixHtml;
        var pathinsertJs = this.viewDestinationPath + collection.toLowerCase() + "/insert" + this.viewPrefixJs;

        //get the content, replace the template with desired collection
        var contentinsertHtml = this.replaceAll(viewTemplateinsertHtml, "Replacement", this.toTitleCase(collection));
        contentinsertHtml = this.replaceAll(contentinsertHtml, "replacement", collection.toLowerCase());
        var contentinsertJs = this.replaceAll(viewTemplateinsertJs, "Replacement", this.toTitleCase(collection));
        contentinsertJs = this.replaceAll(contentinsertJs, "replacement", collection.toLowerCase());

        //finally write it
        this.write(pathinsertHtml, contentinsertHtml);
        this.write(pathinsertJs, contentinsertJs);
        //================= generate insert ===============//

        //================= generate update ===============//
        //get view template content
        var viewTemplateupdateHtml = this.read(this.viewTemplatePath + "update" + this.viewPrefixHtml);
        var viewTemplateupdateJs = this.read(this.viewTemplatePath + "update" + this.viewPrefixJs);

        //get destinationPath, and set the file name
        var pathupdateHtml = this.viewDestinationPath + collection.toLowerCase() + "/update" + this.viewPrefixHtml;
        var pathupdateJs = this.viewDestinationPath + collection.toLowerCase() + "/update" + this.viewPrefixJs;

        //get the content, replace the template with desired collection
        var contentupdateHtml = this.replaceAll(viewTemplateupdateHtml, "Replacement", this.toTitleCase(collection));
        contentupdateHtml = this.replaceAll(contentupdateHtml, "replacement", collection.toLowerCase());
        var contentupdateJs = this.replaceAll(viewTemplateupdateJs, "Replacement", this.toTitleCase(collection));
        contentupdateJs = this.replaceAll(contentupdateJs, "replacement", collection.toLowerCase());

        //finally write it
        this.write(pathupdateHtml, contentupdateHtml);
        this.write(pathupdateJs, contentupdateJs);
        //================= generate update ===============//

        //================= generate view ===============//
        //get view template content
        var viewTemplateviewHtml = this.read(this.viewTemplatePath + "view" + this.viewPrefixHtml);
        var viewTemplateviewJs = this.read(this.viewTemplatePath + "view" + this.viewPrefixJs);

        //get destinationPath, and set the file name
        var pathviewHtml = this.viewDestinationPath + collection.toLowerCase() + "/view" + this.viewPrefixHtml;
        var pathviewJs = this.viewDestinationPath + collection.toLowerCase() + "/view" + this.viewPrefixJs;

        //get the content, replace the template with desired collection
        var contentviewHtml = this.replaceAll(viewTemplateviewHtml, "Replacement", this.toTitleCase(collection));
        contentviewHtml = this.replaceAll(contentviewHtml, "replacement", collection.toLowerCase());
        var contentviewJs = this.replaceAll(viewTemplateviewJs, "Replacement", this.toTitleCase(collection));
        contentviewJs = this.replaceAll(contentviewJs, "replacement", collection.toLowerCase());

        //finally write it
        this.write(pathviewHtml, contentviewHtml);
        this.write(pathviewJs, contentviewJs);
        //================= generate view ===============//
    },
    /* generate your controller from template, then replacing with collection */
    generateRouter: function(collection) {
        //get router template content
        var routerTemplate = this.read(this.routerTemplatePath);

        //get destinationPath, and set the file name
        var path = this.routerDestinationPath + collection.toLowerCase() + this.routerPrefix;

        //get the content, replace the template with desired collection
        var content = this.replaceAll(routerTemplate, "Replacement", this.toTitleCase(collection));
        content = this.replaceAll(content, "replacement", collection.toLowerCase());

        //finally write it
        this.write(path, content);
    },
};

Meteor.methods({
    "Mugen.write": function(path, content) {
        Mugen.write(path);
    },
    "Mugen.read": function(path) {
        Mugen.read(path);
    },
    "Mugen.generateController": function(collection, fields) {
        Mugen.generateController(collection, fields);
    },
    "Mugen.generateCollection": function(collection, fields) {
        Mugen.generateCollection(collection, fields);
    },
    "Mugen.generateAll": function(collection, fields) {
        Mugen.generateController(collection, fields);
        Mugen.generateCollection(collection, fields);
        Mugen.generateView(collection, fields);
        Mugen.generateRouter(collection);
    },
});