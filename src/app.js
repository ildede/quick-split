const pattern = document.getElementById('pattern');
const limit = document.getElementById('limit');
const source = document.getElementById('source');
const result = document.getElementById('result');
const addCustomRule = document.getElementById('add-custom-rule');
const customRules = document.getElementById('custom-rules');
const rulePatterns = customRules.getElementsByClassName('rule-pattern');

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

        for (let { value, id } of rulePatterns) {
          const count = document.getElementById(`count-${id}`);
          const isRegex = document.getElementById(`is-regex-${id}`);
          if (isRegex?.checked) {
            e = e.replaceAll(new RegExp(value, 'g'), 'x'.repeat(count?.value || 0));
          } else {
            e = e.replaceAll(value, 'x'.repeat(count?.value || 0));
          }
        }

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

addCustomRule.onclick = () => {
  const customPatternCount = document.getElementsByClassName('rule-pattern').length;
  const template = document.getElementById('custom-rule');
  const clonedNode = template.content.cloneNode(true);
  clonedNode.querySelectorAll('input').forEach((i) => {
    i.id = `${i.className}-${customPatternCount}`;
    i.addEventListener('input', checkAndPrint);
  })
  customRules.appendChild(clonedNode);
}
