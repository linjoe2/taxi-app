import {Mongo} from 'meteor/mongo'
import {Meteor} from 'meteor/meteor'

export const Clients = new Mongo.Collection('clients')


if (Meteor.isServer) {
	Meteor.publish('Clients', function() {
		console.log(this.userId)
		if (!!this.userId) {
			console.log('test')
			return Clients.find();
		}
	})
// 	var clientList = ["90/24 Sports"
// ,"Amsterdam Redefined"
// ,"Atricure"
// ,"Avega"
// ,"De Baker Kraamzorg"
// ,"BAM"
// ,"Blackrock"
// ,"Blastradius"
// ,"Boston Scientific"
// ,"Brinkmansbeheer"
// ,"Bunzl"
// ,"Edelman"
// ,"Cisi Care"
// ,"Edison"
// ,"Equinix"
// ,"Equinix Nederland"
// ,"H.I.G."
// ,"Hoshizaki"
// ,"Iamsterdam"
// ,"Johnson&Johnson"
// ,"Kraam en Co"
// ,"Mammae Mia"
// ,"Mirabeau"
// ,"MSREF"
// ,"Mylan"
// ,"Novagraaf"
// ,"Orange Connect"
// ,"Pepperminds"
// ,"Randstad Holding"
// ,"Mw. A. Schwartz"
// ,"Service Now"
// ,"SMS Oncology"
// ,"South Stream"
// ,"Stryker"
// ,"Stryker Flexim"
// ,"UBS"
// ,"Uniqure"
// ,"Zin Kraamzorg"]

// 	for (var i = clientList.length - 1; i >= 0; i--) {
// 		Clients.insert({bedrijf: clientList[i]})
// 	};
};

Meteor.methods({
			'Clients.delete' (ID) {
				if (!this.userId) {
					throw new Meteor.error('not autherized')
				} else {
					for (var i = ID.length - 1; i >= 0; i--) {
						console.log('removed id: '+ ID[i])
						Clients.remove({_id: ID[i]})
					};
				}

			},'Clients.update' (rideId,row) {
				if (!this.userId) {
					throw new Meteor.error('not autherized')
				} else {
					Clients.update(rideId,row)
				}

			},'Clients.insert' (newRide) {
				if (!this.userId) {
					throw new Meteor.error('not autherized')
				} else {
					Clients.insert(newRide)
				}

			}
	});
