import { useState, useEffect } from 'react';

function getTodayString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function App() {
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem('saved');
      if(saved) return JSON.parse(saved);
      return [];
    } catch {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(habits));
  }, [habits]);

  const today = getTodayString();

  function addHabit(e) {
    e.preventDefault();

    if(!inputValue.trim()) return;

    const addedHabit = {
      id: Date.now(),
      name: inputValue.trim(),
      completedDates: []
    };

    const newHabits = [...habits, addedHabit];
    setHabits(newHabits);
    setInputValue('');
  }

  function deleteHabit(id) {
    const newHabits = habits.filter((h) => h.id !== id);
    setHabits(newHabits);
  }

  function toggleToday(habitId) {

    const newHabits = habits.map((h) => {
      if(h.id !== habitId) {
        return h;
      }

      if(h.completedDates.includes(today)) {
        return {...h, completedDates: h.completedDates
          .filter((date) => date !== today)}
      } else {
        return {...h, completedDates: [...h.completedDates, today]};
      }
    });

    setHabits(newHabits);
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 
      to-orange-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-6'>
        <h1 className='text-3xl font-bold text-center
          text-purple-700 mb-6'>Habit Tracker</h1>

        <form onSubmit={addHabit} className='flex gap-2 mb-6'>
          <input type='text' placeholder='New habit...' value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='flex-1 border border-gray-300 rounded-lg
              px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400' />
          <button type='submit' disabled={!inputValue.trim()}
            className='bg-purple-600 text-white px-4 py-2 rounded-lg
              hover:bg-purple-700 disabled:opacity-50 transition'>Add</button>
        </form>

        {habits.length === 0 ? (
          <p className='text-center text-gray-400 py-6'>
            No habits yet. Add one above!
          </p>
        ) : (
          <ul className='space-y-3'>
            {habits.map((h) => (
              <li key={h.id}
                className={`flex items-center gap-3 rounded-lg p-3 transition
                  ${h.completedDates.includes(today)
                    ? 'bg-green-100' : 'bg-purple-100'
                  }`} >
                <input type='checkbox' 
                  checked={h.completedDates.includes(today)}
                  onChange={() => toggleToday(h.id)}
                  className='w-5 h-5 accent-green-600' />
                <span className={`flex-1
                  ${h.completedDates.includes(today)
                    ? 'text-gray-400 line-through' : 'text-gray-800'
                  }`}>{h.name}</span>
                <button type='button' onClick={() => deleteHabit(h.id)}
                  className='text-red-400 hover:text-red-600 transition'>X</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;