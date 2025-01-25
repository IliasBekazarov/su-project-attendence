
const express = require('express');
const router = express.Router();

let attendanceData = {};

router.post('/record', (req, res) => {
  const { periodIndex, groupIndex, attendance, date } = req.body;
  if (periodIndex === undefined || groupIndex === undefined || !attendance || attendance.length !== 6) {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  console.log(`Дата: ${date}, Период: ${periodIndex}, Топ: ${groupIndex}, Катышуу: ${attendance}`);

  res.status(200).send('Attendance recorded successfully!');

  const attendanceString = attendance.join('');
  const key = `${periodIndex}-${groupIndex}`;
  attendanceData[key] = attendanceString;
  console.log(`Recorded attendance for ${key}: ${attendanceString}`);
  return res.json({ message: 'Attendance recorded', attendance: attendanceString });
});

router.get('/record', (req, res) => {
  res.json({ attendanceData });
});


module.exports = router;
