function getRandomTime() {
  return Math.floor(Math.random() * 3000) + 1000; 
}

function createPromise() {
  return new Promise((resolve) => {
    const time = getRandomTime();
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

const loadingRow = document.createElement('tr');
const loadingCell = document.createElement('td');
loadingCell.setAttribute('colspan', '2');
loadingCell.textContent = 'Loading...';

const table = document.getElementById('myTable');
const loading = document.getElementById('loading');
table.appendChild(loadingRow);

const promises = [createPromise(), createPromise(), createPromise()];

Promise.all(promises)
  .then((results) => {
    loading.remove();
    results.forEach((time, index) => {
      const row = document.createElement('tr');

      const promiseCell = document.createElement('td');
      promiseCell.textContent = `Promise ${index + 1}`;
      row.appendChild(promiseCell);

      const timeCell = document.createElement('td');
      const seconds = (time / 1000).toFixed(3);
      timeCell.textContent = seconds;
      row.appendChild(timeCell);

      table.appendChild(row);
    });

    const totalRow = document.createElement('tr');

    const totalCell = document.createElement('td');
    totalCell.textContent = 'Total';
    totalRow.appendChild(totalCell);

    const totalTimeCell = document.createElement('td');
    const totalTime = results.reduce((total, time) => total + time, 0);
    const totalSeconds = (totalTime / 1000).toFixed(3);
    totalTimeCell.textContent = totalSeconds;
    totalRow.appendChild(totalTimeCell);

    table.appendChild(totalRow);
  });
