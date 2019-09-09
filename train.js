var config = {
  apiKey: "AIzaSyAFwHLwNMa2Jo_KC9I0jcowZ_NGk_2MK84",
  authDomain: "traintime-85c0e.firebaseapp.com",
  databaseURL: "https://traintime-85c0e.firebaseio.com",
  projectId: "traintime-85c0e",
  storageBucket: "traintime-85c0e.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = $("#firstTrainTime").val().trim();
  var frequency = parseInt($("#frequency").val().trim());

  console.log(trainName)
  console.log(destination)
  console.log(firstTrainTime)
  console.log(frequency)

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
  })
});

database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().firstTrainTime);
  console.log(snapshot.val().frequency);

var timeConverted = moment(snapshot.val().firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(timeConverted);

var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(timeConverted), "minutes");

var timeRemainder = diffTime % snapshot.val().frequency

var minutesAway = snapshot.val().frequency - timeRemainder;

var nextArrivalTime = moment().add(minutesAway, "minutes");
console.log("ARRIVAL TIME: " + moment(nextArrivalTime).format("hh:mm"));


$("#trainList").append("<tr>" +
"<td>" + snapshot.val().trainName + "</td>" +
"<td>" + snapshot.val().destination + "</td>" +
"<td>" + snapshot.val().frequency + "</td>" +
"<td>" + nextArrivalTime + "</td>" +
"<td>" + minutesAway + "</td>" +
"</tr>"
)

});