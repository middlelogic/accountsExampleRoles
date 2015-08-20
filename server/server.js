// run at Meteor app startup
Meteor.startup(function() {
  // if users database is empty, seed these values
  if(Meteor.users.find().count() < 1) {
    // users array
    var users = [
      { name: 'Lena', email: 'lena@example.com', password: 'admin#1', roles: ['admin'] },
      { name: 'Mike', email: 'mike@example.com', password: 'editor#1', roles: ['editor'] }
    ];
    // user creation
    _.each(users, function(d) {
      // return id for use in roles assignment below
      var userId = Accounts.createUser({
        email: d.email,
        password: d.password,
        username: d.email,
        profile: {
          name: d.name
        }
      });
      // verify user email
      Meteor.users.update({ _id: userId }, { $set: { 'emails.0.verified': true } });
      // add roles to user
      Roles.addUsersToRoles(userId, d.roles);
    });
  }
});
