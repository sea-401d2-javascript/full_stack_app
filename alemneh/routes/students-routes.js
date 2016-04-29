'use strict';
let jwtAuth = require('../lib/auth.js');

module.exports = (studentsRouter, db) => {
  let Student = db.Student;
  let Idea = db.Idea;

  studentsRouter.route('/signup')
    .post((req, res) => {
      Student.findOne({name: req.body.name}, (err, student) => {
        if(err) throw err;
        if(!student) {
          var newStudent = new Student(req.body);
          newStudent.save((err, student) => {
            res.json({
              success: true,
              token:student.generateToken()
            });
          });
        }else {
          res.status(401).json({error: 'Username taken!'});
        }
      });

    });

  studentsRouter.route('/students')
    .get( jwtAuth, (req, res) => {
      Student.find({}, (err, student) =>{
        res.json({data: student});
      });
    });


  studentsRouter.route('/students/:student')
    .get(jwtAuth, (req, res) => {
      Student.findById(req.params.student, (err, student) =>{
        res.json({data: student});
      });
    }).put(jwtAuth,(req, res) => {
      console.log(req.body);
      Student.findByIdAndUpdate(req.params.student, req.body, (err, student) =>{
        if(err) return res.send(err);
        res.json(student);
      });
    }).delete(jwtAuth, (req, res) => {
      Student.findById(req.params.student, (err, student) =>{
        student.ideas.forEach((idea) => {
          Idea.findById(idea, (err, data) => {
            if(err) throw err;
            data.remove();
          });
        });
        student.remove(jwtAuth,(err, student) => {
          if(err) throw err;
          res.json({message: 'Student removed'});
        });
      });
    });



};
