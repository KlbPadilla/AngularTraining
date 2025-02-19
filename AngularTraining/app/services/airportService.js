// create a data service that provides airport data
// (no need to create/download each time)
angular.module('app').factory("airportService", function () {

    // list of major US airports and their traffic in 2005-2011
    // source http://en.wikipedia.org/wiki/List_of_the_busiest_airports_in_the_United_States
    var airports = [
        { "name": "Hartsfield Jackson Atlanta International Airport", "code": "ATL", "city": "Atlanta", "state": "GA", "lat": 33.64, "lon": -84.444, "pop2011": 432427, "vol2011": 44414121, "vol2010": 43130585, "vol2009": 42280868, "vol2008": 43236665, "vol2007": 43236665, "vol2006": 41352038, "vol2005": 42402653 },
        { "name": "O'Hare International Airport", "code": "ORD", "city": "Chicago", "state": "IL", "lat": 41.9794, "lon": -87.9044, "pop2011": 2707120, "vol2011": 31892301, "vol2010": 32171831, "vol2009": 31135732, "vol2008": 33683991, "vol2007": 36521585, "vol2006": 36825097, "vol2005": 36720005 },
        { "name": "Los Angeles International Airport", "code": "LAX", "city": "Los Angeles", "state": "CA", "lat": 33.9425, "lon": -118.4081, "pop2011": 3819702, "vol2011": 30528737, "vol2010": 28857755, "vol2009": 27439897, "vol2008": 28861477, "vol2007": 30113985, "vol2006": 29357327, "vol2005": 29372272 },
        { "name": "Dallas/Fort Worth International Airport", "code": "DFW", "city": "Dallas/Fort Worth", "state": "TX", "lat": 32.8974, "lon": -97.0407, "pop2011": 1223229, "vol2011": 27518358, "vol2010": 27100656, "vol2009": 26663984, "vol2008": 27219985, "vol2007": 28482417, "vol2006": 28627749, "vol2005": 28079147 },
        { "name": "Denver International Airport", "code": "DEN", "city": "Denver", "state": "CO", "lat": 39.8631, "lon": -104.6736, "pop2011": 619968, "vol2011": 25667499, "vol2010": 25241962, "vol2009": 24013669, "vol2008": 24287939, "vol2007": 20796173, "vol2006": 20591909, "vol2005": 20315544 },
        { "name": "John F. Kennedy International Airport", "code": "JFK", "city": "New York", "state": "NY", "lat": 40.6438, "lon": -73.782, "pop2011": 8244910, "vol2011": 23664830, "vol2010": 22934047, "vol2009": 22710272, "vol2008": 23620948, "vol2007": 23401351, "vol2006": 21071501, "vol2005": 20260359 },
        { "name": "San Francisco International Airport", "code": "SFO", "city": "San Francisco", "state": "CA", "lat": 37.6152, "lon": -122.39, "pop2011": 812826, "vol2011": 20038679, "vol2010": 19359003, "vol2009": 18467908, "vol2008": 18135827, "vol2007": 17280328, "vol2006": 16236592, "vol2005": 16070133 },
        { "name": "McCarran International Airport", "code": "LAS", "city": "Las Vegas", "state": "NV", "lat": 36.085, "lon": -115.1511, "pop2011": 589317, "vol2011": 19854759, "vol2010": 18996738, "vol2009": 19445952, "vol2008": 21024443, "vol2007": 22537950, "vol2006": 22028521, "vol2005": 21402676 },
        { "name": "Phoenix Sky Harbor International Airport", "code": "PHX", "city": "Phoenix", "state": "AZ", "lat": 33.4365, "lon": -112.0073, "pop2011": 1469471, "vol2011": 19750306, "vol2010": 18907171, "vol2009": 18559647, "vol2008": 19450576, "vol2007": 20767144, "vol2006": 20479291, "vol2005": 19032196 },
        { "name": "George Bush Intercontinental Airport", "code": "IAH", "city": "Houston", "state": "TX", "lat": 29.9867, "lon": -95.3381, "pop2011": 2145146, "vol2011": 19306660, "vol2010": 19528631, "vol2009": 19290239, "vol2008": 20030898, "vol2007": 24117623, "vol2006": 22822111, "vol2005": 20799886 },
        { "name": "Charlotte/Douglas International Airport", "code": "CLT", "city": "Charlotte", "state": "NC", "lat": 35.221, "lon": -80.9442, "pop2011": 751087, "vol2011": 19022535, "vol2010": 18629181, "vol2009": 18165476, "vol2008": 19291428, "vol2007": 16884780, "vol2006": 14949568, "vol2005": 14109608 },
        { "name": "Miami International Airport", "code": "MIA", "city": "Miami", "state": "FL", "lat": 25.7965, "lon": -80.2756, "pop2011": 408750, "vol2011": 18342158, "vol2010": 17017654, "vol2009": 16187768, "vol2008": 16369998, "vol2007": 16377488, "vol2006": 15664791, "vol2005": 15092763 },
        { "name": "Orlando International Airport", "code": "MCO", "city": "Orlando", "state": "FL", "lat": 28.4316, "lon": -81.3083, "pop2011": 243195, "vol2011": 17250415, "vol2010": 17017491, "vol2009": 16371016, "vol2008": 17288480, "vol2007": 17614679, "vol2006": 16807856, "vol2005": 16592133 },
        { "name": "Newark Liberty International Airport", "code": "EWR", "city": "Newark", "state": "NJ", "lat": 40.6899, "lon": -74.1782, "pop2011": 277540, "vol2011": 16814092, "vol2010": 16571754, "vol2009": 16659441, "vol2008": 17599578, "vol2007": 18163652, "vol2006": 17804107, "vol2005": 16444959 },
        { "name": "Seattle-Tacoma International Airport", "code": "SEA", "city": "Seattle", "state": "WA", "lat": 47.4444, "lon": -122.3005, "pop2011": 620778, "vol2011": 15971676, "vol2010": 15406243, "vol2009": 15273092, "vol2008": 15839504, "vol2007": 15419116, "vol2006": 14703928, "vol2005": 14359530 },
        { "name": "Minneapolis-St. Paul International Airport/Wold-Chamberlain Airport", "code": "MSP", "city": "Minneapolis/St. Paul", "state": "MN", "lat": 44.8812, "lon": -93.2031, "pop2011": 387753, "vol2011": 15895653, "vol2010": 15512487, "vol2009": 15551206, "vol2008": 16369324, "vol2007": 16962563, "vol2006": 17192410, "vol2005": 17971771 },
        { "name": "Detroit Metropolitan Wayne County Airport", "code": "DTW", "city": "Detroit", "state": "MI", "lat": 42.2083, "lon": -83.3572, "pop2011": 706585, "vol2011": 15716865, "vol2010": 15643890, "vol2009": 15211402, "vol2008": 16998174, "vol2007": 17495135, "vol2006": 17483468, "vol2005": 17580363 },
        { "name": "Philadelphia International Airport", "code": "PHL", "city": "Philadelphia", "state": "PA", "lat": 39.875, "lon": -75.2491, "pop2011": 1536471, "vol2011": 14883180, "vol2010": 14951254, "vol2009": 15002961, "vol2008": 15586852, "vol2007": 15656653, "vol2006": 15390848, "vol2005": 15376569 },
        { "name": "Logan International Airport", "code": "BOS", "city": "Boston", "state": "MA", "lat": 42.3695, "lon": -71.0201, "pop2011": 625087, "vol2011": 14171476, "vol2010": 13561814, "vol2009": 12566797, "vol2008": 12820489, "vol2007": 13783297, "vol2006": 13544552, "vol2005": 13214923 },
        { "name": "LaGuardia Airport", "code": "LGA", "city": "New York", "state": "NY", "lat": 40.7739, "lon": -73.8718, "pop2011": 8244910, "vol2011": 11989227, "vol2010": 12001501, "vol2009": 11084300, "vol2008": 11567586, "vol2007": 12529890, "vol2006": 12925697, "vol2005": 13014314 },
        { "name": "Fort Lauderdale/Hollywood International Airport", "code": "FLL", "city": "Fort Lauderdale", "state": "FL", "lat": 26.0727, "lon": -80.14, "pop2011": 168528, "vol2011": 11332466, "vol2010": 10829810, "vol2009": 10258118, "vol2008": 11020091, "vol2007": 11079250, "vol2006": 10204579, "vol2005": 10729468 },
        { "name": "Baltimore-Washington International Thurgood Marshall Airport", "code": "BWI", "city": "Baltimore/Washington, DC", "state": "MD", "lat": 39.188537, "lon": -76.678077, "pop2011": 619493, "vol2011": 11067317, "vol2010": 10848633, "vol2009": 10338950, "vol2008": 10215225, "vol2007": 10487789, "vol2006": 10297607, "vol2005": 9829432 },
        { "name": "Washington Dulles International Airport", "code": "IAD", "city": "Washington, DC", "state": "VA", "lat": 38.9534, "lon": -77.4477, "pop2011": 617996, "vol2011": 11043829, "vol2010": 11276481, "vol2009": 11132098, "vol2008": 11348775, "vol2007": 11789441, "vol2006": 11045217, "vol2005": 13032502 },
        { "name": "Salt Lake City International Airport", "code": "SLC", "city": "Salt Lake City", "state": "UT", "lat": 40.7868, "lon": -111.9819, "pop2011": 189899, "vol2011": 9701756, "vol2010": 9910493, "vol2009": 9903821, "vol2008": 9993198, "vol2007": 10560906, "vol2006": 10289129, "vol2005": 10601918 },
        { "name": "Midway International Airport", "code": "MDW", "city": "Chicago", "state": "IL", "lat": 41.7883, "lon": -87.7418, "pop2011": 2707120, "vol2011": 9134576, "vol2010": 8518957, "vol2009": 8253620, "vol2008": 8021383, "vol2007": 9132836, "vol2006": 8915292, "vol2005": 8383698 },
        { "name": "Ronald Reagan Washington National Airport", "code": "DCA", "city": "Washington, DC", "state": "VA", "lat": 38.8519, "lon": -77.0375, "pop2011": 617996, "vol2011": 9053004, "vol2010": 8736804, "vol2009": 8490288, "vol2008": 8704466, "vol2007": 9038174, "vol2006": 8973410, "vol2005": 8623907 },
        { "name": "Honolulu International Airport", "code": "HNL", "city": "Honolulu", "state": "HI", "lat": 21.3329, "lon": -157.9214, "pop2011": 340936, "vol2011": 8643494, "vol2010": 8740077, "vol2009": 8739389, "vol2008": 9013440, "vol2007": 10393929, "vol2006": 9855838, "vol2005": 9784404 },
        { "name": "San Diego International Airport", "code": "SAN", "city": "San Diego", "state": "CA", "lat": 32.7323, "lon": -117.1974, "pop2011": 1326179, "vol2011": 8465683, "vol2010": 8430509, "vol2009": 8453854, "vol2008": 9007617, "vol2007": 9138116, "vol2006": 8724442, "vol2005": 8628648 },
        { "name": "Tampa International Airport", "code": "TPA", "city": "Tampa", "state": "FL", "lat": 27.9769, "lon": -82.5334, "pop2011": 346037, "vol2011": 8174194, "vol2010": 8137222, "vol2009": 8263294, "vol2008": 8871917, "vol2007": 9306036, "vol2006": 9187865, "vol2005": 9297643 },
        { "name": "Portland International Airport", "code": "PDX", "city": "Portland", "state": "OR", "lat": 45.5892, "lon": -122.5939, "pop2011": 593820, "vol2011": 6808486 },
        { "name": "Lambert-St. Louis International Airport", "code": "STL", "city": "St. Louis", "state": "MO", "lat": 38.7422, "lon": -90.3658, "pop2011": 318069, "vol2011": 6159090 },
        { "name": "Kansas City International Airport", "code": "MCI", "city": "Kansas City", "state": "MO", "lat": 39.2977, "lon": -94.7163, "pop2011": 463202, "vol2011": 5011000 },
        { "name": "William P. Hobby Airport", "code": "HOU", "city": "Houston", "state": "TX", "lat": 29.6541, "lon": -95.2766, "pop2011": 2145146, "vol2011": 4753554 },
        { "name": "Nashville International Airport", "code": "BNA", "city": "Nashville", "state": "TN", "lat": 36.1302, "lon": -86.6672, "pop2011": 609644, "vol2011": 4673047 },
        { "name": "General Mitchell International Airport", "code": "MKE", "city": "Milwaukee", "state": "WI", "lat": 42.9476, "lon": -87.9029, "pop2011": 597867, "vol2011": 4671976 },
        { "name": "Metropolitan Oakland International Airport", "code": "OAK", "city": "Oakland", "state": "CA", "lat": 37.7107, "lon": -122.2144, "pop2011": 395817, "vol2011": 4550526 },
        { "name": "Raleigh-Durham International Airport", "code": "RDU", "city": "Raleigh/Durham", "state": "NC", "lat": 35.8767, "lon": -78.7931, "pop2011": 416468, "vol2011": 4462508 },
        { "name": "Austin-Bergstrom International Airport", "code": "AUS", "city": "Austin", "state": "TX", "lat": 30.2026, "lon": -97.6681, "pop2011": 820611, "vol2011": 4436661 },
        { "name": "Cleveland-Hopkins International Airport", "code": "CLE", "city": "Cleveland", "state": "OH", "lat": 41.4117, "lon": -81.8347, "pop2011": 393806, "vol2011": 4401033 },
        { "name": "Sacramento International Airport", "code": "SMF", "city": "Sacramento", "state": "CA", "lat": 38.6927, "lon": -121.5879, "pop2011": 472178, "vol2011": 4370895 },
        { "name": "Memphis International Airport", "code": "MEM", "city": "Memphis", "state": "TN", "lat": 35.0447, "lon": -89.9817, "pop2011": 652050, "vol2011": 4344213 },
        { "name": "Louis Armstrong New Orleans International Airport", "code": "MSY", "city": "New Orleans", "state": "LA", "lat": 29.9842, "lon": -90.256, "pop2011": 360740, "vol2011": 4255411 },
        { "name": "John Wayne Airport-Orange County", "code": "SNA", "city": "Orange County", "state": "CA", "lat": 33.6805, "lon": -117.8602, "pop2011": 138409, "vol2011": 4247802 },
        { "name": "San Jose International Airport", "code": "SJC", "city": "San Jose", "state": "CA", "lat": 37.3667, "lon": -121.9259, "pop2011": 967487, "vol2011": 4108006 },
        { "name": "Pittsburgh International Airport", "code": "PIT", "city": "Pittsburgh", "state": "PA", "lat": 40.496, "lon": -80.2567, "pop2011": 307484, "vol2011": 4070614 },
        { "name": "San Antonio International Airport", "code": "SAT", "city": "San Antonio", "state": "TX", "lat": 29.5249, "lon": -98.4733, "pop2011": 1359758, "vol2011": 3984024 },
        { "name": "Luis Muñoz Marín International Airport", "code": "SJU", "city": "San Juan", "state": "PR", "lat": 18.4365, "lon": -66.0051, "pop2011": 389714, "vol2011": 3983130 },
        { "name": "Dallas Love Field", "code": "DAL", "city": "Dallas", "state": "TX", "lat": 32.841, "lon": -96.8461, "pop2011": 1223229, "vol2011": 3852886 },
        { "name": "Southwest Florida International Airport", "code": "RSW", "city": "Fort Myers", "state": "FL", "lat": 26.5429, "lon": -81.7546, "pop2011": 63512, "vol2011": 3748366 },
        { "name": "Indianapolis International Airport", "code": "IND", "city": "Indianapolis", "state": "IN", "lat": 39.715, "lon": -86.2962, "pop2011": 827609, "vol2011": 3670396 },
        { "name": "Cincinnati/Northern Kentucky International Airport", "code": "CVG", "city": "Greater Cincinnati", "state": "KY", "lat": 39.0552, "lon": -84.6613, "pop2011": 296223, "vol2011": 3422466 },
        { "name": "Port Columbus International Airport", "code": "CMH", "city": "Columbus", "state": "OH", "lat": 39.9939, "lon": -82.891, "pop2011": 797434, "vol2011": 3134379 },
        { "name": "Palm Beach International Airport", "code": "PBI", "city": "West Palm Beach", "state": "FL", "lat": 26.6886, "lon": -80.0907, "pop2011": 101043, "vol2011": 2877158 },
        { "name": "Bradley International Airport", "code": "BDL", "city": "Windsor Locks", "state": "CT", "lat": 41.9287, "lon": -72.6839, "pop2011": 12498, "vol2011": 2772315 },
        { "name": "Albuquerque International Sunport Airport", "code": "ABQ", "city": "Albuquerque", "state": "NM", "lat": 35.0487, "lon": -106.6167, "pop2011": 552804, "vol2011": 2768435 },
        { "name": "Jacksonville International Airport", "code": "JAX", "city": "Jacksonville", "state": "FL", "lat": 30.4935, "lon": -81.6802, "pop2011": 827908, "vol2011": 2700514 },
        { "name": "Kahului Airport", "code": "OGG", "city": "Kahului", "state": "HI", "lat": 20.8928, "lon": -156.4388, "pop2011": 26337, "vol2011": 2683933 },
        { "name": "Buffalo Niagara International Airport", "code": "BUF", "city": "Buffalo", "state": "NY", "lat": 42.9339, "lon": -78.7308, "pop2011": 261025, "vol2011": 2582597 },
        { "name": "Ted Stevens Anchorage International Airport", "code": "ANC", "city": "Anchorage", "state": "AK", "lat": 61.1739, "lon": -149.981, "pop2011": 295570, "vol2011": 2354987 },
        { "name": "Ontario International Airport", "code": "ONT", "city": "Ontario", "state": "CA", "lat": 34.0609, "lon": -117.5983, "pop2011": 166390, "vol2011": 2271458 },
        { "name": "Bob Hope Airport", "code": "BUR", "city": "Burbank", "state": "CA", "lat": 34.1958, "lon": -118.3492, "pop2011": 104092, "vol2011": 2144915 },
        { "name": "Eppley Airfield", "code": "OMA", "city": "Omaha", "state": "NE", "lat": 41.3025, "lon": -95.8936, "pop2011": 415068, "vol2011": 2047055 },
        { "name": "Theodore Francis Green State Airport", "code": "PVD", "city": "Warwick", "state": "RI", "lat": 41.7251, "lon": -71.45, "pop2011": 82361, "vol2011": 1920699 },
        { "name": "Reno/Tahoe International Airport", "code": "RNO", "city": "Reno", "state": "NV", "lat": 39.5058, "lon": -119.7754, "pop2011": 227511, "vol2011": 1821051 }
    ];

    // geocode airports (10 at a time...)
    //    var output = "";
    //    var geocoder = new google.maps.Geocoder();
    //    for (var i = 0; i < airports.length; i++) {
    //        var ap = airports[i];
    //        if (!ap.lat || !ap.lon) {
    //            geocoder.geocode({ address: ap.code + " airport, " + ap.city + ", " + ap.state }, function (results, status) {
    //                if (status == google.maps.GeocoderStatus.OK) {
    //                    var res = results[0];
    //                    var loc = results[0].geometry.location;
    //                    output += res.formatted_address + "\tlat\t" + loc.lat().toFixed(4) + "\tlon\t" + loc.lng().toFixed(4) + "\r\n";
    //                    console.log(output);
    //                }
    //            });
    //        }
    //    }

    // return object with airport list
    return { airports: airports };
});