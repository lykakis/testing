const input = document.querySelector('#input');
const output = document.querySelector('#output');
const convertButton = document.querySelector('#convert');
const clearButton = document.querySelector('#clear');

function toCamelCase(value) {
  return value.replace(/[-_]+([a-z0-9])/gi, (_, character) => character.toUpperCase());
}

function parseKannelConfig(text) {
  const result = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = toCamelCase(line.slice(0, separatorIndex).trim());
    const value = line.slice(separatorIndex + 1).trim();
    result[key] = /^\d+$/.test(value) ? Number(value) : value;
  }

  return result;
}

function convert() {
  output.textContent = JSON.stringify(parseKannelConfig(input.value), null, 2);
}

convertButton.addEventListener('click', convert);
clearButton.addEventListener('click', () => {
  input.value = '';
  output.textContent = '';
  input.focus();
});

convert();
