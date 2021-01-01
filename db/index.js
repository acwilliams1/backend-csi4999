const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10, 
    password: process.env.DB_PASS, 
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    socketPath: process.env.DB_SOCKET_PATH
});

let fitbitdb = {};

// FUNCTIONS THAT GATHER JSON/REQUEST DATA BELOW (PREFIXED WITH "Get" and SUFFIXED WITH "Req")

fitbitdb.getAccountReq = (req) => {

    const account = {
        username: req.body.username,
        email: req.body.email,
        fName: req.body.fName,
        lName: req.body.lName,
        groupId: req.body.groupId,
        height: req.body.height,
        weight: req.body.weight,
        age: req.body.age,
        is_admin: req.body.is_admin
    }
    return account;
};

fitbitdb.getEmailReq = (req) => {

    const email = {
        email: req.body.email
    }
    return email;
};

fitbitdb.getIdAndPinReq = (req) => {

    const email = {
        id: req.body.id,
        pin: req.body.pin
    }
    return email;
};
fitbitdb.getAccountwithIdReq = (req) => {

    const account = {
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        fName: req.body.fName,
        lName: req.body.lName,
        groupId: req.body.groupId,
        height: req.body.height,
        weight: req.body.weight,
        age: req.body.age,
        is_admin: req.body.is_admin
    }
    return account;
};

fitbitdb.getUserIdReq = (req) => {

    const userId = {
        userId: req.body.userId
    }
    return userId;
};

fitbitdb.getIdReq = (req) => {

    const id = {
        id: req.body.id
    }
    return id;
};

fitbitdb.getIdAndActiveReq = (req) => {

    const id = {
        id: req.body.id,
        isActive: req.body.isActive
    }
    return id;
};

fitbitdb.getWeightAndUserIdReq = (req) => {

    const account = {
        weight: req.body.weight,
        userId: req.body.userId
    }
    return account;
};

fitbitdb.getGroupIdReq= (req) => {
    const groupId = {
        groupId: req.body.groupId
    }
    return groupId;
};

fitbitdb.getExerciseReq = (req) => {

    const exercise = {
        name: req.body.name, 
        description: req.body.description,
        youtubeLink: req.body.youtubeLink,
        groupId: req.body.groupId,
        date: req.body.date,
        label: req.body.label
    }
    return exercise;
};

fitbitdb.getBioReq = (req) => {
    const bio = {
        userId: req.body.userId,
        sleep: req.body.sleep,
        avg_heart_rate: req.body.avg_heart_rate
    }
    return bio;
};

fitbitdb.getSurveyReq = (req) => {
    const survey = {
        userId: req.body.userId,
        typeId: req.body.typeId,
        answers: req.body.answers
    }
    return survey;
};

fitbitdb.getUserIdExerciseIdReq = (req) => {

    const info = {
        exercise: req.body.exercise,
        userId: req.body.userId
    }
    return info;
};

fitbitdb.getDailyWorkoutReq = (req) => {

    const dailyWorkout = {
        userId: req.body.userId,
        exercise: req.body.exercise,
        heart_rate: req.body.heart_rate,
        reps: req.body.reps,
        weight: req.body.weight,
        time_exercised: req.body.time_exercised
    }
    return dailyWorkout;
};

fitbitdb.getDailyWorkoutWithDateReq = (req) => {

    const dailyWorkout = {
        userId: req.body.userId,
        exercise: req.body.exercise,
        heart_rate: req.body.heart_rate,
        reps: req.body.reps,
        weight: req.body.weight,
        time_exercised: req.body.time_exercised,
        created_at: req.body.created_at
    }
    return dailyWorkout;
};


//DATABASE INSERT FUNCTIONS

fitbitdb.createAccount =  (req) => {
    return new Promise((resolve, reject) => {
    pool.query("INSERT INTO accounts ( username, email , fName , lName , groupId , height , weight , age, is_admin, created_at  ) VALUES (  ?,  ?,  ?,  ?,  ?, ?,  ?,  ?, ?, NOW())", 
    [req.username, req.email, req.fName, req.lName, req.groupId, req.height, req.weight, req.age, req.is_admin ], (err, results) => {
        if(err) {
            return reject(err);
        }
        return resolve(results);
     })
    })
};

fitbitdb.createDailyWorkout = (req) => {
    return new Promise((resolve, reject) => {
    pool.query("INSERT INTO dailyworkouts ( userId, exercise, heart_rate, reps, weight, time_exercised, created_at) VALUES ( ?, ?, ?, ?,  ?,  ?,  NOW())", 
    [req.userId, req.exercise, req.heart_rate, req.reps, req.weight, req.time_exercised], (err, results) => {
        if(err) {
            return reject(err);
        }
        return resolve(results);
     })
     })
};

fitbitdb.createDailyWorkoutWithDate = (req) => {
    return new Promise((resolve, reject) => {
    pool.query("INSERT INTO dailyworkouts ( userId, exercise, heart_rate, reps, weight, time_exercised, created_at) VALUES ( ?, ?, ?, ?,  ?,  ?,  ? )", 
    [req.userId, req.exercise, req.heart_rate, req.reps, req.weight, req.time_exercised, req.created_at], (err, results) => {
        if(err) {
            return reject(err);
        }
        return resolve(results);
     })
     })
};

fitbitdb.createProgress = (req) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO progress (weight, stored_at, userId) VALUES (?, NOW(), ?)", [req.weight, req.userId], (err, results)  => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
        });
};

fitbitdb.createSurvey = (req) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO surveys ( userId, typeId, answers, created_at ) VALUES (  ?,  ?,  ?,  NOW())", 
        [req.userId, req.typeId, req.answers], (err, results) => {
        if(err) {
            return reject(err);
        }
        return resolve(results);
     });
     });
};

fitbitdb.createExercise = (req) => {
    return new Promise((resolve, reject) => {
    pool.query("INSERT INTO exercises ( name, description, youtubeLink, groupId, date, label  ) VALUES (  ?,  ?,  ?, ?, ?, ?)", 
    [req.name, req.description, req.youtubeLink, req.groupId , req.date, req.label], (err, results) => {
        if(err) {
            return reject(err);
        }
        return resolve(results);
     })
    })
};

fitbitdb.createBio = (req) => {
    return new Promise((resolve, reject) => {
    pool.query("INSERT INTO bio ( userId, sleep, avg_heart_rate, created_at ) VALUES (  ?,  ?,  ?,  NOW())", 
    [req.userId, req.sleep, req.avg_heart_rate], (err, results) => {
        if(err) {
            return reject(err);
        }
        return resolve(results);
     })
    })
};

//DATABASE MODIFY/UPDATE/DELETE FUNCTIONS

fitbitdb.updateAccount = (req) => {
    return new Promise((resolve, reject) => {
            pool.query("  UPDATE accounts SET username = ?, fName = ?, lName = ?, groupId = ?, height = ?, weight = ?, age = ? WHERE email = ? ", 
            [ req.username, req.fName, req.lName, req.groupId, req.height, req.weight, req.age, req.email], (err, results) => {
                if(err) {
                    return reject(err);
                }
                return resolve(results);
            })
        });
};

fitbitdb.deleteAccount = (req) => {
    return new Promise((resolve, reject) => {
            pool.query("DELETE from accounts where id = ?", 
            [req.userId], (err, results) => {
                if(err) {
                    return reject(err);
                }
                return resolve(results);
            })
        });
};

fitbitdb.deleteExercise = (req) => {
    return new Promise((resolve, reject) => {
            pool.query("DELETE from exercises where id = ?", 
            [req.id], (err, results) => {
                if(err) {
                    return reject(err);
                }
                return resolve(results);
            })
        });
};

fitbitdb.updateExerciseActive = (req) => {
    return new Promise((resolve, reject) => {
            pool.query("UPDATE exercises set isActive = ? where id = ?", 
            [req.isActive, req.id], (err, results) => {
                if(err) {
                    return reject(err);
                }
                return resolve(results);
            })
        });
};


//DATABASE RETRIEVE FUNCTIONS (PREFIXED BY "GET")

fitbitdb.getAccountByEmail = (req) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM accounts where email = ?', [req.email], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    });
};

fitbitdb.getAccountByIdAndPin = (req) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM accounts where id = ? AND pin = ?', [req.id, req.pin], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    });
};

fitbitdb.updatePin = (req) => {
    return new Promise((resolve, reject) => {
        pool.query('update accounts set pin = floor(100 + rand() * 899) where id = ?', [req.id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    });
};

fitbitdb.getPin = (req) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT id, pin FROM accounts where id = ?', [req.id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    });
};



fitbitdb.getUserWorkoutInfo = (req) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT d.*, e.name FROM dailyworkouts d LEFT JOIN exercises e ON e.id = ? WHERE d.userId = ? AND d.exercise = ?", 
        [req.exercise, req.userId, req.exercise], (err, results)  => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
        });
};

fitbitdb.getAllUserWorkoutInfo = (req) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM dailyworkouts where userId = ? order by created_at asc", 
        [req.userId], (err, results)  => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
        });
};

fitbitdb.getExerciseByGroupId = (req) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM exercises where groupId = ?', [req.groupId], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        })
    });
};

fitbitdb.getProgressById = (req) => {
    return new Promise((resolve, reject) => {
        pool.query("select weight, stored_at from progress where userId = ? order by stored_at asc", [req.userId], (err, results)  => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
        });
};

fitbitdb.getBioById = (req) => {
    return new Promise((resolve, reject) => {
        pool.query("select * from bio where userId = ?", [req.userId], (err, results)  => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
        });
};

 
module.exports = fitbitdb;
