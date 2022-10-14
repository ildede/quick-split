const pattern = document.getElementById('pattern');
const limit = document.getElementById('limit');
const source = document.getElementById('source');
const result = document.getElementById('result');

const checkAndPrint = () => {
  while (result.firstChild) {
    result.removeChild(result.lastChild);
  }
  const resultList = document.createElement('ul');

  source.value
    .split(/\r|\r\n|\n/)
    .forEach(line => (pattern.value ? line.split(pattern.value) : [line])
      .forEach(e => {
        if (e === '') return;

        let li = document.createElement('li');
        if (limit.value) {
          if (e.length >= limit.value) {
            let mark = document.createElement('mark');
            mark.textContent = `${e.length}: ${e}`;
            li.append(mark);
          } else {
            li.textContent = `${e.length}: ${e}`;
          }
        } else {
          li.textContent = `${e.length}: ${e}`;
        }

        resultList.append(li);
      }));

  result.append(resultList);

};

pattern.addEventListener('input', checkAndPrint);
limit.addEventListener('input', (event) => {
  event.target.value = Math.abs(Number(event.target.value));
  checkAndPrint();
});
source.addEventListener('input', checkAndPrint);
