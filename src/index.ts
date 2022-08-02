// 100 4
// PKG1 5 5 OFR001
// PKG2 15 5 OFR002
// PKG3 10 100 OFR003
// PKG4 13 9
const readline = require('readline');
import { Package } from "./class/Package";
const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  let lines:string[] = [];

  lineReader.on('line', function(line:any) {
    let lineStr = line.toString().trim();
    if (lineStr.length) {
        lines.push(lineStr);
    } else {
        lineReader.close();
    }
  }).on('close', function() {
    init(lines);
  })

function init(lines: string[]){
    let temp = lines[0].split(" ");
    let baseCost = parseInt(temp[0]);
    let noOfPkgs = parseInt(temp[1]);
    let pkgList: Package[] = [];
    for(let i =1 ; i < noOfPkgs+1; i++) {
        const temp = lines[i].split(" ")
        const pkg = new Package(temp[0], parseInt(temp[2]), parseInt(temp[1]), temp[4], baseCost);
        pkgList.push(pkg);
    }
    pkgList.forEach(function(pkg){
        console.log("pkg", pkg.cost, pkg.id);
    })
}

// get all pkgs and base cost
// get cost of all pkgs
// display all pkgs
    
//package class
    //id
    //weight
    //distance
    //offer
    //getCost

// Offer class
    //value
    //calculateCost

// Vehicle class

// Configure Jest

