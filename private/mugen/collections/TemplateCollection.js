/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Template = new Mongo.Collection("template");

var schemas = new SimpleSchema({
    [mugenCollectionFields]
    /* AUTOVALUE */
    appId: {
        type: String,
        label: "App Id",
        autoValue: function() {
            if (this.isInsert)
                return App.id;
        },
    },
    createdDate: {
        type: Date,
        label: "Created Date",
        autoValue: function() {
            if (this.isInsert)
                return new Date;
        },
        denyUpdate: true,
        optional: true
    },
    updatedDate: {
        type: Date,
        label: "Updated Date",
        autoValue: function() {
            if (this.isUpdate || this.isInsert)
                return new Date();
        },
        optional: true
    },
    createdUserId: {
        type: String,
        label: "Created by",
        autoValue: function() {
            if (this.isInsert)
                return this.userId;
        },
        denyUpdate: true,
        optional: true
    },
    updatedUserId: {
        type: String,
        label: "Updated by",
        autoValue: function() {
            if (this.isUpdate || this.isInsert)
                return this.userId;
        },
        optional: true
    },
});

Template.attachSchema(schemas);

Template.allow({
    insert: function(userId, doc) {
        return userId ? true : false;
    },
    update: function(userId, doc) {
        return doc && doc.createdUserId === userId;
    },
    remove: function(userId, doc) {
        return doc && doc.createdUserId === userId;
    },
});

//activate groundDB for template collection to work offline
/* uncomment to use
 GroundDB(Template);
 */

/* register helper for default relations */
/* uncomment to use
 UI.registerHelper('template', function() {
 return Template.findOne(this.templateId);
 });
 */