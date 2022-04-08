const { body } = require('express-validator');
const connection = require('../connection')

exports.saveTraineeProfile = async (req, res, next) => {

  const trainee = req.body;
  const uid = 'u' + Math.round(Math.random() * 999999);


  connection.beginTransaction(function (err) {
    const result = {};
    if (err) {
      result.status = 'fail';
      result.data = err;
      res.json(result)
    } else {
      const sql1 = `INSERT INTO ncsr_trainee_profile(trainee_profile_id,email_ID,name_of_the_trainee,lms_id,college_name,batch_name,type_of_Unique_id, unique_id_number,first_name,last_name,date_of_birth,nationality,gender,address,state,PIN_code,contact_no_of_trainee,state_of_domicile,category,religion,attendance_percentage,attendence_in_days,college_stream) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      const values1 = [uid,
        trainee.email_ID,
        trainee.name_of_the_trainee,
        trainee.lms_id,
        trainee.college_name,
        trainee.batch_name,
        trainee.type_of_Unique_id,
        trainee.unique_id_number,
        trainee.first_name, trainee.last_name,
        trainee.date_of_birth,
        trainee.nationality,
        trainee.gender,
        trainee.address,
        trainee.state,
        trainee.PIN_code,
        trainee.contact_no_of_trainee,
        trainee.state_of_domicile,
        trainee.category,
        trainee.category,
        trainee.religion,
        trainee.attendance_percentage,
        trainee.attendence_in_days,
        trainee.college_stream];


      connection.query(sql1, values1, function (err, rows) {
        if (err) {
          connection.rollback(function () {
            result.status = 'fail';
            result.data = err;
            res.json(result)
          });
        } else{

          const sql2 = `INSERT INTO ncsr_trainee_family(trainee_profile_id,first_Name_of_father_guardian,last_name_of_Father_guardian,annual_family_income,no_of_family_members,profession_of_chief_wage_owner,highest_education_qualification_in_family,who_is_highest_educated_in_family,Fk_trainee_profile_id)VALUES(?,?,?,?,?,?,?,?,?)`;
          const values2 = [uid, trainee.first_Name_of_father_guardian,
            trainee.last_name_of_Father_guardian,
            trainee.annual_family_income,
            trainee.no_of_family_members,
            trainee.profession_of_chief_wage_owner,
            trainee.highest_education_qualification_in_family,
            trainee.who_is_highest_educated_in_family,
            uid]

          connection.query(sql2, values2, function (err, result) {
            if (err) {
              connection.rollback(function () {
                result.status = 'fail';
                result.data = err;
                res.json(result)

              });
            } else {
              console.log(uid, "uid")
              const sql3 = `INSERT INTO ncsr_trainee_assmnt_and_plcmnt(trainee_profile_id,program_course,assessment_result,assessment_score,proof_of_placement,placement_status,name_of_the_company,certification_status,role_offered,CTC,industry,Fk_trainee_profile_id)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
              const values3 = [uid,
                trainee.program_course,
                trainee.assessment_result,
                trainee.assessment_score,
                trainee.proof_of_placement,
                trainee.placement_status,
                trainee.name_of_the_company,
                trainee.certification_status,
                trainee.role_offered,
                trainee.CTC,
                trainee.industry,
                uid]

              connection.query(sql3, values3, function (err, rows) {
                if (err) {
                  connection.rollback(function () {
                    result.status = 'fail';
                    result.data = err;
                    res.json(result)
                  });
                } else {
                  console.log(uid, "uid")
                  connection.commit(function (err) {
                    if (err) {
                      connection.rollback(function () {
                        result.status = 'fail';
                        result.data = err;
                        res.json(result)
                      });
                    }
                    console.log('Transaction Completed Successfully.');
                    result.status = 'pass';
                    result.data = uid
                    res.json(result)

                  });
                }
              });
            }
          });
        }
      });
    }
  });

}


exports.getTraineeProfile = (req, res, next) => {

  const sql = `SELECT * from ncsr_trainee_profile`;

  connection.query(sql, (err, rows) => {
    const result = {};
    if (err) {
      result.status = 'fail';
      result.data = err;
    } else {
      result.status = 'pass';
      result.data = rows;
    }
    console.log("this is result", result.length)
    res.json(result)

  })
}

exports.findDuplicateEmail = (req,res,next)=>{
  
 sql = `SELECT email_ID FROM ncsr_trainee_profile where email_ID =?`
 connection.query(sql,[req.query.email], (err, rows) => {
  const result = {};
  if (err) {
    result.status = 'fail';
    result.data = err;    
  } else {
    result.status = 'pass';
    result.data = rows;
  }
  console.log("this is result", result.data.length)
  res.json(result)

})
}