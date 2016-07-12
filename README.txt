# This is the repository of admin.huluwa.uk/admin.bangli.uk/admin.bangli.us/... #

This admin backend is a multisites management backend which has the ability to
access multiple RESTful api server(api.bangli.uk, api.huluwa.uk etc).

This admin backend app is based on Angular2 and Bootstrap4, it communicates between
the users and the api servers. user authentication is done with
auth.bangli.uk by using JWT(JSON Web Token).

# DEVELOPMENT #

*. Run git pull and npm install
*. Modify app/app.api.ts to correct set the auth-server and api-server to your
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
