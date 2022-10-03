import fs from 'fs'
import { resolve } from 'path';
export function readWordsFromFile(path: string): Promise<string[]>{
    return new Promise(async resolve => {
        var words: string[] = [];
        fs.readFile(path, (file, data) => {
            let dataString = data.toString();

            //replace lines with spaces
            dataString = dataString.replace(/\r?\n|\r/g, " ");

            //Remove uneceesary spaces
            dataString = dataString.replace(/\s\s+/g, ' ');

            words = dataString.split(" ");

            resolve(words);
        });

    })
}
