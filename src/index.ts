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
    lineReader.close();
    init(lines);
  })

export function init(lines: string[]){
    try {
        let firstParam = lines[0].split(" ");
        let baseCost = parseInt(firstParam[0]);
        let noOfPkgs = parseInt(firstParam[1]);
        let pkgList: Package[] = [];
        for(let i =1 ; i < noOfPkgs+1; i++) {
            const pkgParam = lines[i].split(" ");
            const pkgId = pkgParam[0];
            const pkgWeight = parseInt(pkgParam[1]);
            const pkgDistance = parseInt(pkgParam[2]);
            const pkgCoupon = pkgParam[3];
            const pkg = new Package(pkgId, pkgDistance, pkgWeight, pkgCoupon, baseCost);
            pkgList.push(pkg);
        }
        pkgList.forEach(function(pkg){
            console.log(pkg.id, pkg.discount, pkg.totalCost);
        })
    } catch(e){
        console.log(e);
    }
    
}


