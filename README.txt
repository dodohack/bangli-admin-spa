# This is the repository of admin.huluwa.uk/admin.bangli.uk/admin.bangli.us/... #

This admin backend is a multisites management backend which has the ability to
access multiple RESTful api server(api.bangli.uk, api.huluwa.uk etc).

This admin backend app is based on Angular2 and Bootstrap4, it communicates between
the users and the api servers. user authentication is done with
auth.bangli.uk by using JWT(JSON Web Token).

##############################################################################
There are lots of 3 party libraries we are using, especially useful ones
includes ng2-file-upload, n2g-dragular, ng2-bootstrap, ng2-charts etc, they
are located at: https://github.com/valor-software/ng2-plans

Post revision comparison javascript lib:
https://code.google.com/p/google-diff-match-patch/ (a very good one)
##############################################################################

# DEVELOPMENT #

*. Run git pull and npm install
*. Modify app/api/index.ts to correct set the auth-server and api-server to your
   test servers(you should run both bangli-auth and huluwa-api in order to
   test it).
*. Run npm start to start this server, see package.json for how 'npm start'
   defined
*. You don't need to restart the server if you have modified any source code,
   it monitors your changes and compile the code on the fly.
*. You need to refresh your page if html templates is changed(cause the build
   system does not monitor them).
*. Have fun.

# DEPLOY #


# REF #
Here lists various of useful links for this project:

Recursive Tree Directive: http://www.syntaxsuccess.com/viewarticle/recursive-treeview-in-angular-2.0
Lots of Angular2 demo codes can be borrowed: http://www.syntaxsuccess.com/angular-2-samples/#/demo/

A good blog about Angular2 and more: http://blog.mgechev.com/posts/
