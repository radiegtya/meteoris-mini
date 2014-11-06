var rootPath = process.env.PWD;

var Mugen = {
    rootPath: process.env.PWD + "/",
    controllerTemplatePath: 'mugen/controllers/TemplateController.js',
    controllerDestinationPath: "lib/controllers/",
    controllerPrefix: "Controller.js",
    collectionTemplatePath: 'mugen/collections/TemplateCollection.js',
    collectionDestinationPath: "lib/collections/",
    collectionPrefix: ".js",
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
        content = this.replaceAll(content, "Template", collection.toLowerCase());

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
    /* http://jsfiddle.net/zvLgk9bn/ */
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
            stringFields += name + ":\n {\ntype:" + type + ",\n label: '" + label + "',\n},\n";
        });
        content = content.replace("[mugenCollectionFields]", stringFields);

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
    },
});