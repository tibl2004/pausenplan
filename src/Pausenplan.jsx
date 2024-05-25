import React, { useState } from 'react';
import './Pausenplan.scss';

const Pausenplan = () => {
  const [schedule, setSchedule] = useState(Array.from({ length: 14 }, () => ({
    name: '',
    morning: '',
    middayOption: '',
    midday: '',
    middayFrom: '',
    middayTo: '',
    afternoon: '',
    termineFrom: '',
    termineTo: '',
    termineDescription: '',
  })));
  const [isEditable, setIsEditable] = useState(true);

  const handleNameChange = (index, event) => {
    const newSchedule = [...schedule];
    newSchedule[index].name = event.target.value;
    setSchedule(newSchedule);
  };

  const handleTimeChange = (index, period, event) => {
    const newSchedule = [...schedule];
    newSchedule[index][period] = event.target.value;
    setSchedule(newSchedule);
  };

  const handleMiddayOptionChange = (index, event) => {
    const newSchedule = [...schedule];
    newSchedule[index].middayOption = event.target.value;
    if (event.target.value === '') {
      newSchedule[index].midday = '';
    } else {
      newSchedule[index].middayFrom = '';
      newSchedule[index].middayTo = '';
    }
    setSchedule(newSchedule);
  };

  const handleTermineFromChange = (index, event) => {
    const newSchedule = [...schedule];
    newSchedule[index].termineFrom = event.target.value;
    setSchedule(newSchedule);
  };

  const handleTermineToChange = (index, event) => {
    const newSchedule = [...schedule];
    newSchedule[index].termineTo = event.target.value;
    setSchedule(newSchedule);
  };

  const handleTermineDescriptionChange = (index, event) => {
    const newSchedule = [...schedule];
    newSchedule[index].termineDescription = event.target.value;
    setSchedule(newSchedule);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsEditable(false);
  };

  const getRowClass = (entry) => {
    if (entry.middayOption === 'ab') {
      return 'in-break-ab';
    } else if (entry.middayOption === 'bis') {
      return 'in-break-bis';
    }
    return '';
  };

  return (
    <div>
      <h2>Pausenplan</h2>
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
          {schedule.map((entry, index) => (
            <tr key={index} className={getRowClass(entry)}>
              <td>{isEditable ? <input type="text" value={entry.name} onChange={(e) => handleNameChange(index, e)} /> : entry.name}</td>
              <td className={entry.middayOption === 'ab' ? 'in-break' : ''}>
                {isEditable && entry.middayOption !== 'ab' ? (
                  <input type="time" value={entry.morning} onChange={(e) => handleTimeChange(index, 'morning', e)} />
                ) : (
                  entry.middayOption === 'ab' ? '---' : entry.morning
                )}
              </td>
              <td>
                {isEditable ? (
                  <>
                    <select value={entry.middayOption} onChange={(e) => handleMiddayOptionChange(index, e)}>
                      <option value="">Von-Bis</option>
                      <option value="ab">ab</option>
                      <option value="bis">bis</option>
                    </select>
                    {entry.middayOption ? (
                      <input type="time" value={entry.midday} onChange={(e) => handleTimeChange(index, 'midday', e)} />
                    ) : (
                      <>
                        Von: <input type="time" value={entry.middayFrom} onChange={(e) => handleTimeChange(index, 'middayFrom', e)} />
                        Bis: <input type="time" value={entry.middayTo} onChange={(e) => handleTimeChange(index, 'middayTo', e)} />
                      </>
                    )}
                  </>
                ) : (
                  entry.middayOption ? `${entry.middayOption} ${entry.midday}` : `${entry.middayFrom} - ${entry.middayTo}`
                )}
              </td>
              <td className={entry.middayOption === 'bis' ? 'in-break' : ''}>
                {isEditable && entry.middayOption !== 'bis' ? (
                  <input type="time" value={entry.afternoon} onChange={(e) => handleTimeChange(index, 'afternoon', e)} />
                ) : (
                  entry.middayOption === 'bis' ? '---' : entry.afternoon
                )}
              </td>
              <td>
                {isEditable ? (
                  <>
                    Von: <input type="time" value={entry.termineFrom} onChange={(e) => handleTermineFromChange(index, e)} />
                    Bis: <input type="time" value={entry.termineTo} onChange={(e) => handleTermineToChange(index, e)} />
                    Beschreibung: <input type="text" value={entry.termineDescription} onChange={(e) => handleTermineDescriptionChange(index, e)} />
                  </>
                ) : (
                  `${entry.termineFrom} - ${entry.termineTo}: ${entry.termineDescription}`
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditable ? (
        <button onClick={handleSave}>Speichern</button>
      ) : (
        <button onClick={handleEdit}>Bearbeiten</button>
      )}
    </div>
  );
};

export default Pausenplan;
