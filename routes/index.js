var express = require("express");
var router = express.Router();

const users_profiles = require("../services/UserInteraction");
const events = require("../services/HallsData");

/* GET home page. */
router.get("/", checkUserSession, function (req, res, next) {
  res.render("index", {
    name: req.session.userData["userName"],
  });
});

router.post("/", checkUserSession, function (req, res, next) {
  res.redirect("/EventRegistration");
});

router.get("/Login", function (req, res, next) {
  req.session.destroy();
  res.render("Login", { title: "GradEvetn" });
});

/* POSTS the information fromm the sing in page */
router.post("/Login", async (req, res, next) => {
  const userEmail = req.body.usrEMail;
  const userPassword = req.body.userPassword;
  const json = await users_profiles.getData(1, userEmail);

  /* It is looking up for the email and password to match with an user in the data base */
  if (json != []) {
    if (
      (json.data[0]["u_gmail"] == userEmail) &
      (json.data[0]["u_password"] == userPassword)
    ) {
      req.session.userData = {
        userEmail: userEmail,
        userName: json.data[0]["u_name"],
        userLName: json.data[0]["u_lname"],
        userGender: json.data[0]["gender"]
      };
      res.redirect("/");
    } else {
      res.redirect("/Login");
    }
  } else {
    res.redirect("/Login");
  }
});

router.get("/Signup", function (req, res, next) {
  req.session.destroy();
  res.render("signUp", { title: "Signup" });
});

router.post("/Signup", async function (req, res, next) {
  const userEmail = req.body.usrEMail;
  var json = await users_profiles.getData(1, userEmail);

  if (json.data.length == 0) {
    const u_name = req.body.name;
    const u_Lname = req.body.lName;
    const birthday = req.body.BDay;
    const radioG = req.body.RadioGender;
    const u_password = req.body.userPassword;
    users_profiles.insertNewUser(
      u_name,
      u_Lname,
      userEmail,
      u_password,
      radioG,
      birthday
    );

    req.session.userData = {
      userEmail: userEmail,
      userName: u_name,
      userLName: u_Lname,
      userGender: radioG
    };
    
    res.redirect("/");
  } else {
    res.redirect("/Signup");
  }
});

router.get(
  "/EventRegistration",
  checkUserSession,
  async function (req, res, next) {
    const user_email = req.session.userData["userEmail"];

    var attendance = await users_profiles.asGuest(1, user_email);

    if (attendance.data.length != 0) {
      var validation = attendance.data[0]["user_id"];

      res.render("EventRegistration", {
        name: req.session.userData["userName"],
        attendance: validation,
      });
    } else {
      res.render("EventRegistration", {
        name: req.session.userData["userName"],
        attendance: null,
      });
    }
  }
);

router.post("/EventRegistration", async function (req, res, next) {
  var Hallsdata = await events.getData(1);
  const user_email = req.session.userData["userEmail"];
  const user_id = await users_profiles.getUserID(1, user_email);
  const EventPassword = req.body.EventPassword;

  if (Hallsdata.data[0]["Password"] == EventPassword) {
    var gest = await events.eventGuests(1, user_id, 1);

    if (gest.data.length == 0) {
      const user_idQuery = await users_profiles.getUserID(1, user_email);
      const user_id = user_idQuery.data[0]["u_id"];
      users_profiles.newGuest(
        req.session.userData["userName"],
        req.session.userData["userLName"],
        user_email,
        req.session.userData["userGender"],
        user_id,
        1
      );
    }
    res.redirect("/HallReview");
  }else{
    res.redirect("/EventRegistration");
  }

});

router.get("/HallReview", checkUserSession, async function (req, res, next) {
  const user_email = req.session.userData["userEmail"];

  var hallData = await events.getData(1);
  var asGest = await users_profiles.asGuest(1, user_email)
  var priorityValidation = validatePriority(asGest.data[0]["priority"]);
  var location = hallData.data[0]["Location"];
  var description = hallData.data[0]["Description"];

  var startDate = hallData.data[0]["StartDate"];
  var liveMusic = stages("LiveMusic", hallData.data);
  var pool = stages("Pool", hallData.data);
  var gamesArea = stages("GamesArea", hallData.data);
  var onlyAdults = stages("OnlyAdults", hallData.data);


  res.render("HallReview", {
    name: req.session.userData["userName"],
    lName: req.session.userData["userLName"],
    email: req.session.userData["userEmail"],
    priority: asGest.data[0]["priority"],
    startDate: startDate,
    location: location,
    description: description,
    liveMusic: liveMusic,
    pool: pool,
    gamesArea: gamesArea,
    onlyAdults: onlyAdults,
    priorityValidation: priorityValidation
  });
});

router.post('/HallReview', async function(req, res, next) {
  const user_email = req.session.userData["userEmail"];
  const user_IDQ = await users_profiles.getUserID(1, user_email);
  const user_id = user_IDQ.data[0]["u_id"];
  const guestIDQ = await users_profiles.getGuestID(1, user_id);
  var guestID = guestIDQ.data[0]["id"];
  users_profiles.updatePriority(guestID, user_id);

  res.redirect('/HallReview');

});

router.get("/Gallery", checkUserSession, function (req, res, next) {
  res.render('Gallery', {
    name: req.session.userData["userName"]
  });
});

function checkUserSession(req, res, next) {
  if (req.session.userData) {
    next();
  } else {
    res.redirect("/Login");
  }
}

function stages(field, object) {
  if (object[0][field] == 1) {
    return "Yes";
  }
  return "No";
}

function validatePriority(priority){
  if (priority == "vip") {
    return null;
  }
  return "yes";
}

module.exports = router;
