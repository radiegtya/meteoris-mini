Template.mugen_form.helpers({
});

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

Template.mugen_form.events = {
    'keyup #collection': function(e) {
        var collection = $(e.target).val();
        $(e.target).val(collection.toLowerCase());
    },
    'click #btnAddField': function(e) {
        e.preventDefault();
        var html = $('.collectionFields').html();
        $('.collectionFields').append(html);
    },
    'click #btnSave': function(e, t) {
        e.preventDefault();
        var collection = t.find('#collection').value;
        var names = $('.names').map(function() {
            return $(this).val();
        }).get();
        var types = $('.types').map(function() {
            return $(this).val();
        }).get();
        var labels = $('.labels').map(function() {
            return $(this).val();
        }).get();

        //check whether collection cannot be empty
        if (!collection || collection == "") {
            var errMessage = "Collection is required";
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        }
        //check whether names cannot be empty
        if (names.length < 1) {
            var errMessage = "Field Name is required";
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        }
        //check whether types cannot be empty
        if (types.length < 1) {
            var errMessage = "Field Type is required";
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        }

        var fields = [];
        for (i = 0; i < names.length; i++) {
            var name = names[i];
            var type = types[i];
            var label = labels[i] ? labels[i] : toTitleCase(names[i]);

            fields.push({
                name: name,
                type: type,
                label: label,
            });
        }

        Meteor.call("Mugen.generateAll", collection, fields, function(err) {
            if (err)
                MeteorisFlash.set('danger', err.reason);
            else{
                MeteorisFlash.set('success', 'Success generating code!');
                Router.go('mugen');
            }
        });
    },
};