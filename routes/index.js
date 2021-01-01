const express = require('express');
const db = require('../db');
const router = express.Router();

// POST REQUESTS TO INSERT DATA INTO TABLES

 router.post('/accounts/insert',  async(req, res, next) => {
    try {
       let account = db.getAccountReq(req);
       account =  await db.createAccount(account);
     } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send("Account Creation Successful");
    res.end();
});

router.post('/exercises/insert',  async(req, res, next) => {
    try {
       let exercise = db.getExerciseReq(req);
       exercise = await db.createExercise(exercise);
    
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    
    res.send("Exercise Creation Successful")
    res.end();
});

router.post('/bio/insert',  async(req, res, next) => {
    try {
       let bio = db.getBioReq(req);
       bio = await db.createBio(bio);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send("Bio Creation Successful");
    res.end();
});

router.post('/dailyWorkouts/insert',  async(req, res, next) => {
    try {
       let dailyWorkout = db.getDailyWorkoutReq(req);
       dailyWorkout = await db.createDailyWorkout(dailyWorkout);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send("Daily Workout Creation Successful");
    res.end();
});

router.post('/dailyWorkouts/datainsert',  async(req, res, next) => {
    try {
       let dailyWorkout = db.getDailyWorkoutWithDateReq(req);
       dailyWorkout = await db.createDailyWorkoutWithDate(dailyWorkout);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send("Daily Workout Creation Successful");
    res.end();
});


router.post('/surveys/insert',  async(req, res, next) => {
    try {
       let survey = db.getSurveyReq(req);
       results =  await db.createSurvey(survey);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send("Survey Creation Successful");
    res.end();
});

router.post('/progress/insert',  async(req, res, next) => {
    try {
        let info = db.getWeightAndUserIdReq(req);
        let results  = await db.createProgress(info);
       
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send("Progress Creation Successful");
    res.end();
});

// POST REQUESTS TO RETRIEVE DATA FROM TABLES

router.post('/accounts/verifyEmail',  async(req, res, next) => {
    try {
        let email = db.getEmailReq(req);
        let results  = await db.getAccountByEmail(email);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
});

router.post('/accounts/fitbitSignIn',  async(req, res, next) => {
    try {
        let idPin = db.getIdAndPinReq(req);
        let results  = await db.getAccountByIdAndPin(idPin);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
});

router.post('/exercises/byGroupId',  async(req, res, next) => {
    try {
        let exercise = db.getGroupIdReq(req);
        let results  = await db.getExerciseByGroupId(exercise);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
});

router.post('/surveys/byUserId',  async(req, res, next) => {
    try {
        let exercise = db.getUserIdReq(req);
        let results  = await db.getSurveyByUserId(exercise);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
});

router.post('/accounts/getUserProgressById',  async(req, res, next) => {
    try {
        let id = db.getUserIdReq(req);
        let results  = await db.getProgressById(id);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
});

router.post('/bio/getBioById',  async(req, res, next) => {
    try {
        let id = db.getUserIdReq(req);
        let results  = await db.getBioById(id);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
});

router.post('/dailyWorkouts/getUserWorkout',  async(req, res, next) => {
    try {
        let info = db.getUserIdExerciseIdReq(req);
        let results  = await db.getUserWorkoutInfo(info);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
});

router.post('/dailyWorkouts/getAllUserWorkout',  async(req, res, next) => {
    try {
        let info = db.getUserIdReq(req);
        let results  = await db.getAllUserWorkoutInfo(info);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
});

// POST REQUESTS TO UPDATE/MODIFY/DELETE DATA FROM TABLES

router.post('/accounts/updateAccount',  async(req, res, next) => {
    try {
        let newAccountInfo = db.getAccountwithIdReq(req);
        let results  = await db.updateAccount(newAccountInfo);
       
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send("Updated Account Successfully");
    res.end();
 });

 router.post('/accounts/getPin',  async(req, res, next) => {
    try {
        let id = db.getIdReq(req);
        let pin = await db.updatePin(id);
        let results = await db.getPin(id);
        res.json(results);
       
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    
    res.end();
 });

router.post('/accounts/deleteAccount',  async(req, res, next) => {
    try {
        let id= db.getUserIdReq(req);
        let results  = await db.deleteAccount(id);
      
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send("Deleted Account Successfully");
    res.end();
 });


 router.post('/exercises/deleteExercise',  async(req, res, next) => {
    try {
        let id= db.getIdReq(req);
        let results  = await db.deleteExercise(id);
      
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send("Deleted Exercise Successfully");
    res.end();
 });

 
 router.post('/exercises/active',  async(req, res, next) => {
    try {
        let id= db.getIdAndActiveReq(req);
        let results  = await db.updateExerciseActive(id);
      
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.send("Updated Exercise Successfully");
    res.end();
 });



module.exports = router;