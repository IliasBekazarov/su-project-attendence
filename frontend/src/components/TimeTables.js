import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/TimeTables.css";

// Constants for data mapping and readability
const GROUP_NAMES = [
  "CS-11-24", "CS-12-24", "CS-13-24", "CS-14-24", "CS-15-24", "CS-16-24",
  "CS-21-24", "CS-22-24", "CS-23-24", "CS-24-24", "CS-25-24", "CS-26-24",
];
const PERIOD_NUMBERS = [1, 2, 3, 4, 5];
const STUDENTS_PER_GROUP = 6;
const STUDENT_LAST_NAMES = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis"];

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
      const groupIndex = parseInt(groupIndexStr, 10);
      const attendanceString = attendanceData[key];

      if (attendanceString.length !== STUDENTS_PER_GROUP) return [];

      return attendanceString.split("").map((status, studentIndex) => ({
        day: "Monday", // Placeholder for day mapping if needed
        period: PERIOD_NUMBERS[periodIndex],
        group: GROUP_NAMES[groupIndex],
        studentName: STUDENT_LAST_NAMES[studentIndex],
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
