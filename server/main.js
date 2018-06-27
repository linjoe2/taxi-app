import { Meteor } from 'meteor/meteor';
import { Accounts }
from 'meteor/accounts-base'
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import { RidesDB } from './../imports/api/rides'
import { Clients } from './../imports/api/clients'

Meteor.startup(() => {
  RidesDB.remove({})
	// code to run on server at startup
Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    try {
      new SimpleSchema({
        email: {
          type: String,
          regEx: SimpleSchema.RegEx.Email
        }
      }).validate({ email });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    return true;
  });

	Accounts.onCreateUser((options, user) => {
		user.profile = {role: options.profile.role}
		return user
	})


});
