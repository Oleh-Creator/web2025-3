const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
    .option('-i, --input <path>', 'шлях до файлу для читання')
    .option('-o, --output <path>', 'шлях до файлу для запису')
    .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);
const options = program.opts();

if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(options.input, 'utf-8'));
const result = data
    .filter(item => item.ku === 13 && item.value > 5)
    .map(item => item.value)
    .join('\n');

if (options.display) console.log(result);
if (options.output) fs.writeFileSync(options.output, result);

if (!options.output && !options.display) process.exit(0);