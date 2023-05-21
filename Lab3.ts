async function runSequent<T, U>(
  array: T[], 
  callback: (item: T, index: number) => Promise<U>
): Promise<U[]> {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(await callback(array[i], i));
  }
  return result;
}

(async () => {
  const array: Array<string> = ["one", "two", "three"];
  const results = await runSequent(array, (item, index) =>
    Promise.resolve({
        item,
        index,
    })
  );
  console.log(results); //{ item: 'one', index: 0 },{ item: 'two', index: 1 },{ item: 'three', index: 2 }
})();

function arrayChangeDelete<T>(array: T[], deleteRule: (item: T) => boolean): T[] {
  const deletedElements: T[] = [];
  
  for (let i = array.length - 1; i >= 0; i--) {
    if (deleteRule(array[i])) {
      deletedElements.push(array[i]);
      array.splice(i, 1);
    }
  }
  
  return deletedElements;
}

const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);
console.log(array); // [1, 3, 7, 9]
console.log(deletedElements); // [6, 2]


const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function fetchAndSaveHTMLContent(url: string, outputFilePath: string) {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log(`Saved HTML content for ${url} to ${outputFilePath}`);
  } catch (error) {
    console.error(`Failed to fetch or save HTML content for ${url}:`, error);
  }
}

async function processJSONFile(jsonFilePath: string) {
  try {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    const links = JSON.parse(jsonData);
    const jsonFileName = path.basename(jsonFilePath, '.json');
    const outputDir = `${jsonFileName}_pages`;
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const outputFilePath = path.join(outputDir, `page_${i + 1}.html`);
      await fetchAndSaveHTMLContent(link, outputFilePath);
    }
    
    console.log('Processing completed successfully.');
  } catch (error) {
    console.error('An error occurred while processing the JSON file:', error);
  }
}

const jsonFilePath = path.join(__dirname, 'list.json');

processJSONFile(jsonFilePath);


import * as si from 'systeminformation';
import * as os from 'os';

async function printSystemInfo(frequencyInSeconds: number) {
  setInterval(async () => {
    try {
      const osInfo = await si.osInfo();
      const cpuTemperature = await si.cpuTemperature();
      const cpuInfo = await si.cpu();
      const graphicsInfo = await si.graphics();
      const memoryInfo = await si.mem();
      const batteryInfo = await si.battery();

      const currentUsername = os.userInfo().username;

      console.log('Operating System:', osInfo.distro);
      console.log('Architecture:', osInfo.arch);
      console.log('Current User Name:', currentUsername);
      console.log('Total CPU Cores:', cpuInfo.cores);
      console.log('CPU Temperature:', cpuTemperature.main);

      console.log('Graphics Controllers:');
      graphicsInfo.controllers.forEach((controller) => {
        console.log('Vendor:', controller.vendor);
        console.log('Model:', controller.model);
      });

      console.log('Memory:');
      console.log('Total Memory (GB):', Math.floor(memoryInfo.total / 1024 / 1024 / 1024));
      console.log('Used Memory (GB):', Math.floor(memoryInfo.used / 1024 / 1024 / 1024));
      console.log('Free Memory (GB):', Math.floor(memoryInfo.free / 1024 / 1024 / 1024));

      console.log('Battery:');
      console.log('Charging:', batteryInfo.isCharging);
      console.log('Percent:', batteryInfo.percent);
      console.log('Remaining Time:', batteryInfo.timeRemaining);

      console.log('----------------------------------------');
    } catch (error) {
      console.error('An error occurred while fetching system information:', error);
    }
  }, frequencyInSeconds * 1000);
}

const frequencyInSeconds = +process.argv[2];

if (!frequencyInSeconds || isNaN(frequencyInSeconds)) {
  console.error('Please provide a valid frequency in seconds as a command-line argument.');
  process.exit(1);
}

printSystemInfo(frequencyInSeconds);


type Handler = () => void;

class MyEventEmitter {
  private eventHandlers: Record<string, Handler[]> = {};

  registerHandler(eventName: string, handler: Handler): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(handler);
  }

  emitEvent(eventName: string): void {
    const handlers = this.eventHandlers[eventName];
    if (handlers) {
      handlers.forEach((handler) => handler());
    }
  }
}


const emitter = new MyEventEmitter();

emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));

emitter.emitEvent('userUpdated'); //Обліковий запис користувача оновлено
