/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Replacement = new Mongo.Collection("replacement");

var schemas = new SimpleSchema({
    [collectionFields]
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

Replacement.attachSchema(schemas);

Replacement.allow({
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

//activate groundDB for replacement collection to work offline
/* uncomment to use
 GroundDB(Replacement);
 */

/* register helper for default relations */
/* uncomment to use
 UI.registerHelper('replacement', function() {
 return Replacement.findOne(this.replacementId);
 });
 */