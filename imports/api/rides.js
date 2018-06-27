import {Mongo} from 'meteor/mongo'
import {Meteor} from 'meteor/meteor'
import CalendarAPI from 'node-google-calendar'
import moment from 'moment'
import 'moment/locale/nl';
const CONFIG = require('./google/Settings');
var total = {}

let cal = new CalendarAPI(CONFIG);


export const RidesDB = new Mongo.Collection('rides')

if (Meteor.isServer) {
	Meteor.publish('RidesDB', function() {
		if (!!this.userId) {
			return RidesDB.find();
		}
	})
};


function translateIt(params) {
	if(params.includes('pick up:'|'pickup:'|'pick-up:'|'from:')) {
			console.log(params)
	}
	params = params.replace(/ :/g,':')
	
	// //van
	params = params.replace(/pick up:|pickup:|pick-up:|from:/gi,'van:')
	//naar
	params = params.replace(/to:|drop-off:|drop off:|dropoff:/gi,'naar:')
	//bedrijf
	params = params.replace(/company:|client:/gi,'bedrijf:')
	// passagier
	params = params.replace(/passenger:|naam:|name:/gi,'passagier:')
	//kostenplaats
	params = params.replace(/cost center:|costcenter:/gi,'kostenplaats:')
	
	console.log(params)
	

	return params
}

function isInteger(x) {
    return x % 1 === 0;
}

function addTotal(params) {
	if(params != undefined && params.charAt(0) === ',') {
		while(params.charAt(0) === ',' || isInteger(params.charAt(0))){
			 params = params.substr(1);
			}
		lowerCase = params.toLowerCase()
		translated = translateIt(lowerCase)

		if(translated.includes('passagier:') || translated.includes('van:') || translated.includes('naar:') || translated.includes('bedrijf:') || translated.includes('comments:' || translated.includes('kostenplaats:'))){
			var toAdd = jsonIt(translated)
			console.log(toAdd)
		} else {
		var toAdd = [{}]
		}
	} else {
		var toAdd = [{}]
}
	total = Object.assign(total,toAdd[0])
	console.log(total)
}

function jsonIt(params) {
	if( params != undefined && params.includes(",") && params.includes(":") ) {
		params.replace(/(\r\n|\n|\r)/gm,"")
		var jsonStrig = '[{';
		var items = params.split(',');
		for (var i = 0; i < items.length; i++) {
		  var current = items[i].split(':');
		  var first = current[0].trim()
		  jsonStrig += '"' + first + '":"' + current[1] + '",';
		}
		jsonStrig = jsonStrig.substr(0, jsonStrig.length - 1);
		jsonStrig += '}]';
		var obj = JSON.parse(jsonStrig);
		return obj
			} else {
				return undefined
		}
};


Meteor.methods({
			'RidesDB.delete' (ID) {
				if (!this.userId) {
					throw new Meteor.error('not autherized')
				} else {
					for (var i = ID.length - 1; i >= 0; i--) {
						console.log('removed id: '+ ID[i])
						RidesDB.remove({_id: ID[i]})
					};
				}

			},'RidesDB.update' (rideId,row) {
				if (!this.userId) {
					throw new Meteor.error('not autherized')
				} else {
					RidesDB.update(rideId,row)
				}

			},'RidesDB.insert' (newRide) {
				if (!this.userId) {
					throw new Meteor.error('not autherized')
				} else {
					RidesDB.insert(newRide)
				}

			},
			googleSync() {
				if (Meteor.isServer) {
					let currentTime = moment().format('YYYY-MM-DDTHH:mm:ssZ')
					let params = {
						timeMin: moment('May 16, 2018').format('YYYY-MM-DDTHH:mm:ssZ'),
						maxResults: 2500,
						// timeMax: '2017-05-25T22:00:00+08:00',
						// q: 'query term',
						// singleEvents: true,
						// orderBy: 'startTime'
					}; //Optional query parameters referencing google APIs
					let calendarId = 'info.thijm.ecs@gmail.com'

					getCal = Meteor.bindEnvironment(function(json) {

					}, function(e) {
						throw e
					})

					cal.Events.list(calendarId, params)
						.then(Meteor.bindEnvironment(function(json) {
								for (var i = json.length - 1; i >= 0; i--) {
									moment.locale('nl');
									var dateFull = json[i].start.dateTime
									var date = new Date(json[i].start.dateTime)
									var datum = moment(json[i].start.dateTime).format("YYYY-MM-DD")
									var time = moment(json[i].start.dateTime).format('HH:mm')
									
									addTotal(json[i].location)
									addTotal(json[i].summary)
									addTotal(json[i].description)

									if(total.kostenplaats === undefined) {
										total.kostenplaats = 'op rekening'
									}

									if(!!!RidesDB.find({calId: json[i].id}).count()) {
										RidesDB.insert({
											calId : json[i].id,
											dateFull: dateFull,
											date: date,
											datum: datum,
											time: time,
											bedrijf: total.bedrijf,
											passagier: total.passagier,
											locatie: json[i].location,
											van: total.van,
											naar: total.naar,
											titel: json[i].summary,
											beschrijving: json[i].description,
											tel: total.tel,
											kostenplaats: total.kostenplaats,
											comments: total.comments

										})
									} else {
										let cal = RidesDB.findOne({calId: json[i].id})
										let _id = cal._id;
										// let bestuurder = cal.bestuurder;
										// let titel = json[i].summary;
										// let beschrijving = json[i].description;
										// let locatie = json[i].location;
										// let van = cal.van;
										// let naar = cal.naar;
										// let tel = cal.tel
										// let bedrijf = cal.bedrijf;
										// let kosten = cal.kosten;
										// let kostenplaats = cal.kostenplaats;
										// let roadshow = cal.roadshow
										// let wachttijd = cal.wachttijd
										// let comments = cal.comments
										// let passagier = cal.passagier
										// let agendapunt = {van: van,passagier: passagier, comments: comments, tel: tel, beschrijving: beschrijving, titel: titel, naar: naar, calId: json[i].id,dateFull: dateFull, date: date,time: time, bestuurder: bestuurder, locatie: locatie,bedrijf: bedrijf,kosten: kosten, kostenplaats: kostenplaats,roadshow: roadshow,wachttijd: wachttijd}
										// // console.log('json: ')
										// // console.log(json[i].summary)
										// // console.log('agendapunt: ')
										// // console.log(agendapunt)
										// RidesDB.update(_id,agendapunt)
										// RidesDB.update(_id,{
										// 		calId : json[i].id,
										// 		dateFull: dateFull,
										// 		date: date,
										// 		time: time,
										// 		datum: datum,
										// 		bedrijf: total.bedrijf,
										// 		passagier: total.passagier,
										// 		locatie: json[i].location,
										// 		van: total.van,
										// 		naar: total.naar,
										// 		titel: json[i].summary,
										// 		beschrijving: json[i].description,
										// 		tel: total.tel,
										// 		kostenplaats: total.kostenplaats,
										// 		comments: total.comments,
										// 		wachttijd: cal.wachttijd,
										// 		roadshow: cal.roadshow,
										// 		kosten: cal.kosten,
										// 		bestuurder: cal.bestuurder

										// 	})

									}
									total = {}
								};
								return json

							}, function(e) {
								throw e
							}))
						}
				}
			})