const connection = require('../connection')

exports.saveTraineeProfile = (req, res, next) => {

    const trainee = req.body;
    const uid = 'u' + Math.round(Math.random() * 999999);

    // const values = [uid,trainee.email_ID,trainee.name_of_the_trainee,trainee.lms_id,trainee.college_name,trainee.batch_name,
    // trainee.type_of_Unique_id,trainee.unique_id_number,trainee.first_name,trainee.last_name,
    // trainee.date_of_birth,trainee.nationality,trainee.gender,trainee.address,trainee.state,
    // trainee.PIN_code,trainee.contact_no_of_trainee,trainee.state_of_domicile,
    // trainee.category,trainee.category,trainee.religion,trainee.attendance_percentage,
    // trainee.attendence_in_days,trainee.college_stream];

    const dummyValues = [uid, "123@.com", "balu2", "mylmsid2", null, null, null, null, null, null,
        null, null, null, null,
        null, null, null, null, null, null, null, null, null];

    const sql = `INSERT INTO ncsr_trainee_profile(trainee_profile_id,email_ID,name_of_the_trainee,lms_id,college_name,batch_name,type_of_Unique_id, unique_id_number,first_name,last_name,date_of_birth,nationality,gender,address,state,PIN_code,contact_no_of_trainee,state_of_domicile,category,religion,attendance_percentage,attendence_in_days,college_stream) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    connection.beginTransaction(function (err) {
        if (err) { throw err; }
        connection.query(sql, dummyValues, function (err, result) {
            if (err) {
                connection.rollback(function () {
                    throw err;
                });
            }

            const sql2 = `INSERT INTO ncsr_trainee_family(trainee_profile_id,first_Name_of_father_guardian,last_name_of_Father_guardian,annual_family_income,no_of_family_members,profession_of_chief_wage_owner,highest_education_qualification_in_family,who_is_highest_educated_in_family,Fk_trainee_profile_id)VALUES(?,?,?,?,?,?,?,?,?)`;
            const dummyData2 = [uid, "sspp", "salla3", null, null, null, null, null, uid]

            connection.query(sql2, dummyData2, function (err, result) {
                if (err) {
                    connection.rollback(function () {
                        throw err;
                    });
                }
                console.log(uid, "uid")
                const sql3 = `INSERT INTO ncsr_trainee_assmnt_and_plcmnt(trainee_profile_id,program_course,assessment_result,assessment_score,proof_of_placement,placement_status,name_of_the_company,certification_status,role_offered,CTC,industry,Fk_trainee_profile_id)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
               const dummyData3 = [uid, "java", "salla2", null, null, null, null, null,null,null,null, uid]
                   
                connection.query(sql3, dummyData3, function (err, result) {
                    if (err) {
                        connection.rollback(function () {
                            throw err;
                        });
                    }
                    console.log(uid, "uid")
                    connection.commit(function (err) {
                        if (err) {
                            connection.rollback(function () {
                                throw err;
                            });
                        }                   
                        res.send({"status":"success"})
                        console.log('Transaction Completed Successfully.');
                        connection.end();
                    });                   
                });               
            });
        });
    });

}





