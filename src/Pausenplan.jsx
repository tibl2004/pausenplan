import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pausenplan.scss';

const Pausenplan = () => {
  const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  const initialSchedule = Array.from({ length: 6 }, () => []);

  const [selectedDay, setSelectedDay] = useState(0);
  const [schedules, setSchedules] = useState(initialSchedule);
  const [isEditable, setIsEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    morning: '',
    middayOption: '',
    midday: '',
    afternoon: '',
    termineFrom: '',
    termineTo: '',
    termineDescription: ''
  });

  useEffect(() => {
    axios.get('https://backendpausenplan.onrender.com/mitarbeiterpausen')
      .then(response => {
        if (response.data.data && response.data.data.length > 0) {
          setSchedules(response.data.data);
        } else {
          setSchedules(initialSchedule);
        }
      })
      .catch(error => {
        console.error('Fehler beim Laden der Pausendaten:', error);
      });
  }, []);

  const handleNameChange = (dayIndex, index, event) => {
    const newSchedules = [...schedules];
    newSchedules[dayIndex][index].name = event.target.value;
    setSchedules(newSchedules);
  };

  const handleAddEmployee = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setNewEmployee({
      name: '',
      morning: '',
      middayOption: '',
      midday: '',
      afternoon: '',
      termineFrom: '',
      termineTo: '',
      termineDescription: ''
    });
  };

  const handlePopupSave = () => {
    axios.post('https://backendpausenplan.onrender.com/mitarbeiterpausen', newEmployee)
      .then(response => {
        console.log('Mitarbeiter erfolgreich hinzugefügt:', response);
        setShowPopup(false);
        setNewEmployee({
          name: '',
          morning: '',
          middayOption: '',
          midday: '',
          afternoon: '',
          termineFrom: '',
          termineTo: '',
          termineDescription: ''
        });
      })
      .catch(error => {
        console.error('Fehler beim Hinzufügen des Mitarbeiters:', error);
      });
  };

  return (
    <div>
      <div className="tab-bar">
        {daysOfWeek.map((day, index) => (
          <div key={index} className={`tab ${selectedDay === index ? 'active' : ''}`} onClick={() => setSelectedDay(index)}>
            {day}
          </div>
        ))}
      </div>
      <div>
        <h2>{daysOfWeek[selectedDay]}</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Vormittag</th>
              <th>Mittag</th>
              <th>Nachmittag</th>
              <th>Termine</th>
            </tr>
          </thead>
          <tbody>
            {/* Tabelle mit Zeitplan-Daten hier einfügen */}
            {schedules[selectedDay] ? (
              schedules[selectedDay].map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.morning}</td>
                  <td>{entry.midday}</td>
                  <td>{entry.afternoon}</td>
                  <td>{entry.termineFrom} - {entry.termineTo}: {entry.termineDescription}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Keine Daten vorhanden</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button className="add-button" onClick={handleAddEmployee}>+</button>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handlePopupClose}>&times;</span>
            <h2>Mitarbeiter hinzufügen</h2>
            <input type="text" placeholder="Name" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
            <input type="time" placeholder="Vormittag" value={newEmployee.morning} onChange={(e) => setNewEmployee({ ...newEmployee, morning: e.target.value })} />
            <input type="time" placeholder="Mittag" value={newEmployee.midday} onChange={(e) => setNewEmployee({ ...newEmployee, midday: e.target.value })} />
            <input type="time" placeholder="Nachmittag" value={newEmployee.afternoon} onChange={(e) => setNewEmployee({ ...newEmployee, afternoon: e.target.value })} />
            <input type="time" placeholder="Termin von" value={newEmployee.termineFrom} onChange={(e) => setNewEmployee({ ...newEmployee, termineFrom: e.target.value })} />
            <input type="time" placeholder="Termin bis" value={newEmployee.termineTo} onChange={(e) => setNewEmployee({ ...newEmployee, termineTo: e.target.value })} />
            <input type="text" placeholder="Beschreibung" value={newEmployee.termineDescription} onChange={(e) => setNewEmployee({ ...newEmployee, termineDescription: e.target.value })} />
            <button className="save-button" onClick={handlePopupSave}>Speichern</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pausenplan;
