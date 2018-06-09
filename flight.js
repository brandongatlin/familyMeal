// https://flightaware.com/about/careers/apply?data=
//
// by setting the content of the data variable to valid JSON with the following properties:
//
// name: String with your name (required)
// email: String with your email address (required)
// position: String with the position you are applying for (required)
// urls: Array of strings with links to your resume (required), along with any personal sites, sample projects, or your Github profile
// comment: String with any comment/request you might have (optional)

// let url = "https://flightaware.com/about/careers/apply?data=%7b%0d%0a++name%3a+%22Brandon+Gatlin%22%2c%0d%0a++email%3a+%22brandongatlin1981%40me.com%22%2c%0d%0a++position%3a+%22Web+Software+Developer%22%2c%0d%0a++comment%3a+%22Im+no+pilot%2c+but+I+have+experience+tracking+objects+using+SONAR+when+I+was+in+the+Navy%22%2c%0d%0a++urls%3a+%5b+%22www.brandongatlin.work%22%2c+%22https%3a%2f%2fgithub.com%2fbrandongatlin%22+%5d%0d%0a%7d"
//
// {
//   name: "Brandon Gatlin"
//   email: "brandongatlin1981@me.com"
//   position: "Web Software Developer"
//   urls: [
//     "www.brandongatlin.work",
//     "https://github.com/brandongatlin"
//   ],
//   comment: "Im no pilot, but I have experience tracking objects using SONAR when I was in the Navy"
// }
//
// https://flightaware.com/about/careers/apply?name=brandon+gatlin&email=brandongatlin1981@me.com&position=Web Software Developer&urls%5B%5D=www.brandongatlin.work&urls%5B%5D=https://github.com/brandongatlin&comment=Im+no+pilot+but+I+have+experience+in+tracking+from+when+I+was+a+SONAR+technician+on+a+submarine

// var jsonQueryStringify = require( "json-query-string" )
//
// var queryString = jsonQueryStringify( {
//   name: "Brandon Gatlin",
//   email: "brandongatlin1981@me.com",
//   position: "Web Software Developer",
//   comment: "Im no pilot, but I have experience tracking objects using SONAR when I was in the Navy",
//   urls: [ "www.brandongatlin.work", "https://github.com/brandongatlin" ]
// } )
// var url = "https://flightaware.com/about/careers/apply?data=" + queryString;
//
// console.log( url );
let myParams = {
  name: "Brandon Gatlin",
  email: "brandongatlin1981@me.com",
  position: "Web Software Developer",
  comment: "Im no pilot, but I have experience tracking objects using SONAR when I was in the Navy",
  urls: [ "www.brandongatlin.work", "https://github.com/brandongatlin" ]
}

$.param( myParams )