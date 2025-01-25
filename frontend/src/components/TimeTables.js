import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/TimeTables.css";


const GROUPS = [
  { name: "CS-11-24", students: ["1", "2", "3", "4", "5", "6"] },
  { name: "CS-12-24", students: ["Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris"] },
  { name: "CS-13-24", students: ["Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark"] },
  { name: "CS-14-24", students: ["Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen"] },
  { name: "CS-15-24", students: ["Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen"] },
  { name: "CS-16-24", students: ["Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen"] },

];
const PERIOD_NUMBERS = [1, 2, 3, 4, 5];
const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimeTables = () => {
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/attendance/record", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAttendanceData(response.data.attendanceData || {});
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const generateRows = () => {
    return Object.keys(attendanceData).flatMap((key) => {
      const [periodIndexStr, groupIndexStr, dataDayStr] = key.split("-");
      const periodIndex = parseInt(periodIndexStr, 10);
      const groupIndex = parseInt(groupIndexStr, 30);
      const attendanceString = attendanceData[key];

      if (!GROUPS[groupIndex] || attendanceString.length !== GROUPS[groupIndex].students.length) return [];

      const day = DAYS_OF_WEEK[parseInt(dataDayStr, )] || "Unknown Day";
      const group = GROUPS[groupIndex];

      return attendanceString.split("").map((status, studentIndex) => ({
        day: day,
        period: PERIOD_NUMBERS[periodIndex],
        group: group.name,
        studentName: group.students[studentIndex],
        status: status === "1" ? "Present" : "Absent",
      }));
    });
  };

  const rows = generateRows();

  return (
    <div className="timetables-container">
      <h2 className="timetables-title">Attendance Overview</h2>
      {loading ? (
        <p className="loading-message">Loading attendance data...</p>
      ) : rows.length === 0 ? (
        <p className="no-data-message">No attendance records found.</p>
      ) : (
        <table className="timetables-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Period</th>
              <th>Group</th>
              <th>Student Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`student-row ${row.status.toLowerCase()}`}
              >
                <td>{row.day}</td>
                <td>{row.period}</td>
                <td>{row.group}</td>
                <td>{row.studentName}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
};

export default TimeTables;