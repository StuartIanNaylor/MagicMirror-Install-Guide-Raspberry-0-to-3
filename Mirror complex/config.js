/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "0.0.0.0", // Address to listen on, can be:
	                      // - "localhost", "0.0.0.0", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.0/24"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 24,
	units: "metric",

	modules: [
		{
        module: 'MMM-pages',
			config: {
			modules:
					[["clock", "weatherforecast", "compliments", "currentweather" ],
					[ "clock", "calendar", "newsfeed" ],
					[ "clock", "MMM-News" ]],
			fixed: ["MMM-page-indicator"],
			animationTime: 5*1000,
			rotationTime: 30*1000,
			delayTime: 60*1000
        }
		},
		{
			module: 'MMM-page-indicator',
			position: 'bottom_bar',
			config: {
            pages: 3,
				}
		},
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left",
			config: {
						displayType: "both",
						analogFace: "face-003"
					}
		},
		{
			module: "calendar",
			header: "Calendar",
			position: "top_right",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/mirrormagic643%40gmail.com/private-2dbcb7b7f1b76e99dd2291e288f5c3ed/basic.ics"
					},
					{
						url: 'https://calendar.google.com/calendar/ical/en-gb.uk%23holiday%40group.v.calendar.google.com/public/basic.ics',
						symbol: 'calendar'
					}
				]
			}
		},
		{
			module: "compliments",
			position: "lower_third"
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Blackpool, UK",
				locationID: "2655459",  //ID from http://bulk.openweathermap.org/sample/; unzip the gz file and find your city
				appid: "cc91cf6b15ace4f2efe08d085c64d649"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Blackpool, UK",
				locationID: "2655459",  //ID from https://openweathermap.org/city
				appid: "cc91cf6b15ace4f2efe08d085c64d649"
			}
		},
		{
			module: "MMM-News",
			position: "top_center",
			config: {
					apiKey : "7e927dda122942f4b175085f6f2085d0",
					type: "vertical",
					query : [
							{
							sources: "bbc-news, independent, the-guardian-uk",
															},
							{
							country: "gb",
															},
							{
							country: "gb",
							category: "sports"							
															}
							],
					items: 20, // number of how many headlines to get from each query. max 100
					timeFormat: "relative", // Or You can use "YYYY-MM-DD HH:mm:ss" format.
					drawInterval: 30*1000, // How long time each article will be shown.
					autoScroll: false, // some site will not be displayed as normal when this is set as true. but normally, we have no interface to control the scroll of MM. Choice is yours.
					scrollStep: 100,
					scrollInterval: 1000,
					touchable: false, // When you have a touchable or clickable interface on your MM.
					detailTimeout : 20*1000
					}
		},
		{
			module: "newsfeed",
			position: "lower_third",
			config: {
				feeds: [
					{
					title: "New York Times",
					url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml",
				},
					{
						title: "BBC UK",
						url: "http://feeds.bbci.co.uk/news/uk/rss.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
