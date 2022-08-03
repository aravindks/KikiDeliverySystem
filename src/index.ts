const readline = require('readline');
import { Package } from "./class/Package";
import { getErrorMessage, reportError } from "./error/general";

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
    init(lines);
    lineReader.close();
}
}).on('close', function() {
    lineReader.removeAllListeners();
    process.exit();
})

export function init(lines: string[]){
    try {
        const { baseCost, noOfPkgs } = parseDeliveryParams(lines[0]);
        let pkgList: Package[] = [];
        for(let i =1 ; i < noOfPkgs+1; i++) {
            const {pkgId, pkgWeight, pkgDistance, pkgCoupon} = parsePackageParams(lines[i]);
            const pkg = new Package(pkgId, pkgWeight, pkgDistance, pkgCoupon, baseCost);
            pkgList.push(pkg);
        }
        pkgList.forEach(function(pkg){
            console.log(pkg.id, pkg.discount, pkg.totalCost);
        })
    } catch(e){
        reportError({message: getErrorMessage(e)})
    }
}

function parseDeliveryParams(param: string): {baseCost:number, noOfPkgs:number} {
    const deliveryInfo = param.split(" ");
    const baseCost = parseInt(deliveryInfo[0]);
    const noOfPkgs = parseInt(deliveryInfo[1]);
    if(isNaN(baseCost)|| isNaN(noOfPkgs)){
        throw new Error("Please Enter Valid Parameters");
    }
    return { baseCost, noOfPkgs}
}

function parsePackageParams(param: string): { pkgId: string, pkgWeight: number, pkgDistance: number, pkgCoupon: string}{
    const packageInfo = param.split(" ");
    const pkgId = packageInfo[0];
    const pkgWeight = parseInt(packageInfo[1]);
    const pkgDistance = parseInt(packageInfo[2]);
    const pkgCoupon = packageInfo[3];
    if(isNaN(pkgWeight)|| isNaN(pkgDistance)){
        throw new Error("Please Enter Valid Parameters");
    }
    return {pkgId, pkgWeight, pkgDistance, pkgCoupon}
}



