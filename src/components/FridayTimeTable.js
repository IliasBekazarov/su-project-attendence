import React, { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';
import "../styles/MondayTimeTable.css";

const studentsPerGroup = 6;

const groupNamesFirstYear = [
  "CS-11-24", "CS-12-24", "CS-13-24", "CS-14-24", "CS-15-24", "CS-16-24"
];

const groupNamesSecondYear = [
  "CS-21-24", "CS-22-24", "CS-23-24", "CS-24-24", "CS-25-24", "CS-26-24"
];

const groupNamesThirdYear = [
  "CS-31-24", "CS-32-24", "CS-33-24", "CS-34-24", "CS-35-24", "CS-36-24"
];

const updatedStudents = [
  ["Айгеримбекова", "Сергеев", "Антонов", "Мариянова", "Оксанов", "Владимирбеков"],
  ["Алияева", "Максимов", "Дастанов", "Токтогулов", "Ийиев", "Александров"],
  ["Айсулуубаева", "Иванов", "Евгениев", "Натальева", "Романов", "Светланова"],
  ["Павлов", "Ксенияева", "Алексеев", "Софиева", "Георгиев", "Элинова"],
  ["Игорьев", "Дарьева", "Викторов", "Аленова", "Сергеев", "Маргаритова"],
  ["Антонов", "Лилияева", "Станиславов", "Эминеева", "Евгениев", "Александрова"]
];

const generateRandomStudents = () => {
  return Array.from({ length: 6 }, () =>
    Array.from({ length: studentsPerGroup }, () => `Student ${Math.floor(Math.random() * 100)}`)
  );
};

const courseData = [
  { 
    id: 1, 
    name: "1 курс", 
    groupNames: groupNamesFirstYear,
    students: updatedStudents, 
    periods: [
      {
        period: 1,
        time: "10:00 - 11:20",
        groups: [
          "Физика\nпреп. Кулубаева Б.У.\nБЛ3",
          "",
          
          "",
          "",
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201"
        ]
      },
      {
        period: 2,
        time: "11:30 - 12:50",
        groups: [
          "Введение в компьютерную\nнауку\nпреп. Бейшеналиева А.Ж.\nкаб.203",
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "",
          "Веб разработка\nасс.преп. А\nкаб.202",
          "",
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201"
        ]
      },
      {
        period: 3,
        time: "13:00 - 14:20",
        groups: [
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201",
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "English\nпреп. Моис Р.Т.\nкаб.307",
          "Веб разработка\nасс.преп. Мамакекирмова А\nкаб.202",
          "English\nпреп. Сейітбекова Б.\nкаб.104",
          ""
        ]
      },
      {
        period: 4,
        time: "14:30 - 15:50",
        groups: [
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "Веб разработка\nасс.преп. Мамакекирмова А\nкаб.202",
          "Введение в компьютерную\nнауку\nпреп. Бейшеналиева А.Ж.\nкаб.203",
          "",
          "",
          ""
        ]
      },
      {
        period: 5,
        time: "16:00 - 17:20",
        groups: [
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "English\nпреп. Моис Р.Т.\nкаб.307",
          "Веб разработка\nасс.преп. Мамакекирмова А\nкаб.202",
          "Введение в компьютерную\nнауку\nпреп. Бейшеналиева А.Ж.\nкаб.203",
          "English\nпреп. Моис Р.Т.\nкаб.307",
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201"
        ]
      }
    ]
  },
  { 
    id: 2, 
    name: "2 курс", 
    groupNames: groupNamesSecondYear, 
    students: generateRandomStudents(), 
    periods: [
      {
        period: 1,
        time: "10:00 - 11:20",
        groups: [
          "Физика\nпреп. Кулубаева Б.У.\nБЛ3",
          "",
          "",
          "",
          "",
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201"
        ]
      },
      {
        period: 2,
        time: "11:30 - 12:50",
        groups: [
          "Введение в компьютерную\nнауку\nпреп. Бейшеналиева А.Ж.\nкаб.203",
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "",
          "Веб разработка\nасс.преп. А\nкаб.202",
          "",
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201"
        ]
      },
      {
        period: 3,
        time: "13:00 - 14:20",
        groups: [
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201",
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "English\nпреп. Моис Р.Т.\nкаб.307",
          "Веб разработка\nасс.преп. Мамакекирмова А\nкаб.202",
          "English\nпреп. Сейітбекова Б.\nкаб.104",
          ""
        ]
      },
      {
        period: 4,
        time: "14:30 - 15:50",
        groups: [
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "Веб разработка\nасс.преп. Мамакекирмова А\nкаб.202",
          "Введение в компьютерную\nнауку\nпреп. Бейшеналиева А.Ж.\nкаб.203",
          "",
          "",
          ""
        ]
      },
      {
        period: 5,
        time: "16:00 - 17:20",
        groups: [
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "English\nпреп. Моис Р.Т.\nкаб.307",
          "Веб разработка\nасс.преп. Мамакекирмова А\nкаб.202",
          "Введение в компьютерную\nнауку\nпреп. Бейшеналиева А.Ж.\nкаб.203",
          "English\nпреп. Моис Р.Т.\nкаб.307",
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201"
        ]
      }
    ] 
  },
  { 
    id: 3, 
    name: "3 курс", 
    groupNames: groupNamesThirdYear, 
    students: generateRandomStudents(), 
    periods: [
      {
        period: 1,
        time: "10:00 - 11:20",
        groups: [
          "Физика\nпреп. Кулубаева Б.У.\nБЛ3",
          "",
          "",
          "",
          "",
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201"
        ]
      },
      {
        period: 2,
        time: "11:30 - 12:50",
        groups: [
          "Введение в компьютерную\nнауку\nпреп. Бейшеналиева А.Ж.\nкаб.203",
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "",
          "Веб разработка\nасс.преп. А\nкаб.202",
          "",
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201"
        ]
      },
      {
        period: 3,
        time: "13:00 - 14:20",
        groups: [
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201",
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "English\nпреп. Моис Р.Т.\nкаб.307",
          "Веб разработка\nасс.преп. Мамакекирмова А\nкаб.202",
          "English\nпреп. Сейітбекова Б.\nкаб.104",
          ""
        ]
      },
      {
        period: 4,
        time: "14:30 - 15:50",
        groups: [
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "Веб разработка\nасс.преп. Мамакекирмова А\nкаб.202",
          "Введение в компьютерную\nнауку\nпреп. Бейшеналиева А.Ж.\nкаб.203",
          "",
          "",
          ""
        ]
      },
      {
        period: 5,
        time: "16:00 - 17:20",
        groups: [
          "Алгебра\nст.преп. Колодрова Е.А.\nкаб.0-2",
          "English\nпреп. Моис Р.Т.\nкаб.307",
          "Веб разработка\nасс.преп. Мамакекирмова А\nкаб.202",
          "Введение в компьютерную\nнауку\nпреп. Бейшеналиева А.Ж.\nкаб.203",
          "English\nпреп. Моис Р.Т.\nкаб.307",
          "Веб разработка\nасс.преп. Завирбекова М.\nкаб.201"
        ]
      }
    ]
  }
];

const FridayTimeTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [activeCourse, setActiveCourse] = useState(courseData[0]);

  const openModal = (periodIndex, groupIndex) => {
    setSelectedGroupIndex(groupIndex);
    setSelectedPeriodIndex(periodIndex);

    const key = `${periodIndex}-${groupIndex}`;
    if (!attendance[key]) {
      const initial = Array(studentsPerGroup).fill(0);
      setAttendance((prev) => ({ ...prev, [key]: initial }));
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGroupIndex(null);
    setSelectedPeriodIndex(null);
  };

  const handleCheckboxChange = (i) => {
    if (selectedPeriodIndex === null || selectedGroupIndex === null) return;
    const key = `${selectedPeriodIndex}-${selectedGroupIndex}`;
    const current = attendance[key] || Array(studentsPerGroup).fill(0);
    const updated = [...current];
    updated[i] = updated[i] === 0 ? 1 : 0;
    setAttendance((prev) => ({ ...prev, [key]: updated }));
  };

  const handleSubmit = async () => {
    if (selectedPeriodIndex === null || selectedGroupIndex === null) return;
    const key = `${selectedPeriodIndex}-${selectedGroupIndex}`;
    const attendanceToSave = attendance[key] || Array(studentsPerGroup).fill(0);
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5001/attendance/record',
        {
          periodIndex: selectedPeriodIndex,
          groupIndex: selectedGroupIndex,
          attendance: attendanceToSave
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('Attendance submitted:', attendanceToSave);
      closeModal();
    } catch (err) {
      console.error('Failed to submit attendance:', err);
    }
  };

  const currentKey =
    selectedPeriodIndex !== null && selectedGroupIndex !== null
      ? `${selectedPeriodIndex}-${selectedGroupIndex}`
      : null;
  const currentAttendance =
    currentKey && attendance[currentKey]
      ? attendance[currentKey]
      : Array(studentsPerGroup).fill(0);

  return (
    <div className="timetable-container">
      <h2 className="timetable-title">Расписание на Пяткица</h2>
      <div className="course-selector">
        {courseData.map((course) => (
          <button
            key={course.id}
            onClick={() => setActiveCourse(course)}
            className={
              course.id === activeCourse.id ? 'active-course-btn' : 'course-btn'
            }
          >
            {course.name}
          </button>
        ))}
      </div>
      <h2 className="timetable-title">{activeCourse.name}</h2>
      <table className="timetable">
        <thead>
          <tr>
            <th>Пара</th>
            <th>Время</th>
            {activeCourse.groupNames.map((g, i) => (
              <th key={i}>{g}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activeCourse.periods.map((p, periodIndex) => (
            <tr key={p.period}>
              <td>{p.period}</td>
              <td>{p.time}</td>
              {p.groups.map((subject, groupIndex) => (
                <td
                  key={groupIndex}
                  className={subject.trim() !== '' ? 'clickable-cell' : ''}
                  onClick={() =>
                    subject.trim() !== '' && openModal(periodIndex, groupIndex)
                  }
                >
                  {subject.split('\n').map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        {selectedGroupIndex !== null && selectedPeriodIndex !== null && (
          <>
            <h3>
              Список студентов ({
                activeCourse.groupNames[selectedGroupIndex]
              }, Пара {activeCourse.periods[selectedPeriodIndex].period})
            </h3>
            <ul className="student-list">
              {currentAttendance.map((val, i) => (
                <li key={i} className="student-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={val === 1}
                      onChange={() => handleCheckboxChange(i)}
                    />{' '}
                    {activeCourse.students[selectedGroupIndex][i] ||
                      `Student ${i + 1}`}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={handleSubmit} className="submit-btn">
              Submit
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default FridayTimeTable;

