/**
 * configuring router
 * set layoutTemplate to layout template (you can look layout template at client/views/index.html)
 * set every partial template / called yieldTemplates to choosen template (you can look templates at client/templates)
 * set loading template from templates folder too
 */
Router.configure({
    layoutTemplate: 'basic', //set default layout to basic
    yieldTemplates: {
        'meteorisFlash': {to: 'meteorisFlash'},
        'templateBasicHeader': {to: 'templateBasicHeader'},
        'templateBasicFooter': {to: 'templateBasicFooter'},
    },
    notFoundTemplate: 'templatePublicNotFound',
    loadingTemplate: 'templatePublicLoading',
});

/**
 * require login, if user logged in then call loading template else back to login page
 */
var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn())
            this.render('templatePublicLoading');
        else
            Router.go('usersLogin');
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin, {
    except: [
        'sitesIndex',
        'postsIndex',
        'usersRegister',
        'usersLogin',
    ]
});


/**
 * Mapping every router
 */

/* DASHBOARDS */
Router.route('/', {
    name: 'sitesIndex',
    controller: SitesController,
});
/* EOF DASHBOARDS */

/* USERS */
Router.route('users/register/', {
    name: 'usersRegister',
    controller: UsersController,
    yieldTemplates: {
        'meteorisFlash': {to: 'meteorisFlash'},
    },
});
Router.route('users/login/', {
    name: 'usersLogin',
    controller: UsersController,
    yieldTemplates: {},
});
/* EOF USERS */

/* POSTS */
Router.route('posts/index/:limit?/:search?/', {
    name: 'postsIndex',
    controller: PostsController,
});
Router.route('posts/insert/', {
    name: 'postsInsert',
    controller: PostsController,
});
Router.route('posts/update/:_id?', {
    name: 'postsUpdate',
    controller: PostsController,
});
Router.route('posts/view/:_id?', {
    name: 'postsView',
    controller: PostsController,
});
/* EOF POSTS */