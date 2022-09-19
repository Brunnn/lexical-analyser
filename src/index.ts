import path from "path";
import { TransitionTableState } from "./Models/TransitionTable";
import { readAutomatonFromCSV } from "./Utils/AutomatonReader";


var automaton: TransitionTableState[];
var alphabet: string[];

//read from the files folder one folder up
var filesFolderPath = path.join(__dirname, "..", "files/automaton.csv");
 



(async () => {
    var result = await readAutomatonFromCSV(filesFolderPath);
    automaton = result.automaton;
    alphabet = result.alphabet;
    console.log(automaton[165]);
    
    //process the automaton table
    
    
})()