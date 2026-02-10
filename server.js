const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(express.static("./"));

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve index.html explicitly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// JSON records
let students = [];
let courses = [];

/* ---------- STUDENT REGISTRATION ---------- */
app.post("/registerStudent", (req, res) => {
  const student = {
    name: req.body.name,
    id: req.body.id,
    password: req.body.password,
    studentClass: req.body.class, // DO NOT store as `class`
    address: req.body.address,
    gender: req.body.gender,
    mailid: req.body.mailid,
    marks: {}
  };

  students.push(student);
  res.send("Student Registered Successfully");
});

/* ---------- ADD COURSE ---------- */
app.post("/addCourse", (req, res) => {
  courses.push({
    courseId: req.body.courseId,
    courseName: req.body.courseName
  });
  res.send("Course Added Successfully");
});

/* ---------- ADD MARKS + TOTAL ---------- */
app.post("/addMarks", (req, res) => {
  const student = students.find(s => s.id === req.body.studentId);

  if (!student) {
    return res.send("Student Not Found");
  }

  let total = 0;
  courses.forEach(course => {
    const mark = parseInt(req.body[course.courseId]) || 0;
    student.marks[course.courseId] = mark;
    total += mark;
  });

  res.send("Total Marks = " + total);
});

// start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/courses", (req, res) => {
    res.json(courses);
});
