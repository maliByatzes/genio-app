import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDirectory = resolve(__dirname, '../..');
console.log(rootDirectory);

export { rootDirectory };
