import winedata from "./winedata.json";
interface alcoholclass {        //Creating alcohol class types for retrieving alcohol data
  [key: string]: any;
}
interface meaninterface {       //Creating meaninterface class types for storing processed data
  [key: string]: any;
}
let alcohol: any = {};     //initialization
let winedatajson: Array<any> = winedata;
let i:number = 0;
export function classifyData() {                                        //classifying data into classes to process the data
  while (i < winedata.length){
    if (winedatajson[i]["Alcohol"] in alcohol) {
      alcohol[winedatajson[i]["Alcohol"]].push(winedatajson[i]);
    } else {
      alcohol[winedatajson[i]["Alcohol"]] = [winedatajson[i]];
    }
    i += 1
  }
}
var mode = (a:any):any => {
  a = a.slice().sort((x:any, y:any) => x - y);

  var bestStreak = 1;
  var bestElem = a[0];
  var currentStreak = 1;
  var currentElem = a[0];

  for (let i = 1; i < a.length; i++) {
    if (a[i-1] !== a[i]) {
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
        bestElem = currentElem;
      }

      currentStreak = 0;
      currentElem = a[i];
    }

    currentStreak++;
  }

  return currentStreak > bestStreak ? currentElem : bestElem;
};
function median(values: number[]): number {

  if (values.length === 0) {
    throw new Error('Input array is empty');
  }

  // Sorting values, preventing original array
  // from being mutated.
  values = [...values].sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  return (values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2
  );

}

export function falvinoids() {                                          //Process the data for getting mean,mode and median value
  classifyData()
  let meanflav: any = {};
  let modeflav: any = {};
  let medianflav: any = {};
  for (var alcoholitem in alcohol) {
    for (var item in alcohol[alcoholitem]) {
      if (alcoholitem in meanflav) {
        meanflav[alcoholitem] +=  + parseFloat(alcohol[alcoholitem][item]["Flavanoids"]);
      }
      else{
        meanflav[alcoholitem] =  + parseFloat(alcohol[alcoholitem][item]["Flavanoids"]);
      }
    }
    meanflav[alcoholitem] = (meanflav[alcoholitem]/parseInt(alcohol[alcoholitem].length)).toFixed(3)
  }
  for (let alcoholitem in alcohol) {
    for (let item in alcohol[alcoholitem]) {
      if (alcoholitem in medianflav) {
        medianflav[alcoholitem].push( + parseFloat(alcohol[alcoholitem][item]["Flavanoids"]))
      }
      else{
        medianflav[alcoholitem] = [ + parseFloat(alcohol[alcoholitem][item]["Flavanoids"])]
      }
      if (alcoholitem in modeflav) {
        modeflav[alcoholitem].push( + parseFloat(alcohol[alcoholitem][item]["Flavanoids"]))
      }
      else{
        modeflav[alcoholitem] = [ + parseFloat(alcohol[alcoholitem][item]["Flavanoids"])]
      }
    }
    medianflav[alcoholitem].sort()
    let medianlength = medianflav[alcoholitem].length
    console.log(medianflav[alcoholitem],median(medianflav[alcoholitem]))
    medianflav[alcoholitem] = parseFloat(median(medianflav[alcoholitem]).toString()).toFixed(3)
    // if (medianlength % 2 !== 0){
    //   medianflav[alcoholitem] = parseFloat(medianflav[alcoholitem][Math.floor(medianlength / 2)]).toFixed(3)
    // }
    // else{
    //   medianflav[alcoholitem] = parseFloat(medianflav[alcoholitem][Math.floor(medianlength / 2)] + medianflav[alcoholitem][Math.floor(medianlength / 2) - 1] / 2).toFixed(3)
    // }
    modeflav[alcoholitem] = parseFloat(mode(modeflav[alcoholitem])).toFixed(3)
    console.log(meanflav)
    console.log(medianflav)
  }
return [meanflav,medianflav,modeflav]                         //Returning the desired results
}
export function gamma(){                                      //Processing the data to extract gamma value and mean,median and mode
  let meangamma:any = {}
  let modegamma: meaninterface = {};
  let gammamedian: meaninterface = {};
  for (let alcoholitem in alcohol) {
    for (let item in alcohol[alcoholitem]) {
      if (alcoholitem in meangamma) {
        meangamma[alcoholitem] += parseFloat(((alcohol[alcoholitem][item]["Ash"] * alcohol[alcoholitem][item]["Hue"])/alcohol[alcoholitem][item]["Magnesium"]).toString());       //Extracting the gamma value
      }
      else{
        meangamma[alcoholitem] = parseFloat(((alcohol[alcoholitem][item]["Ash"] * alcohol[alcoholitem][item]["Hue"])/alcohol[alcoholitem][item]["Magnesium"]).toString());
      }
    }
    meangamma[alcoholitem] = (meangamma[alcoholitem]/parseInt(alcohol[alcoholitem].length)).toFixed(3)
  }
  for (let alcoholitem in alcohol) {
    for (let item in alcohol[alcoholitem]) {
      if (alcoholitem in gammamedian) {
        gammamedian[alcoholitem].push( + parseFloat(((alcohol[alcoholitem][item]["Ash"] * alcohol[alcoholitem][item]["Hue"])/alcohol[alcoholitem][item]["Magnesium"]).toString()).toFixed(3))
      }
      else{
        gammamedian[alcoholitem] = [+ parseFloat(((alcohol[alcoholitem][item]["Ash"] * alcohol[alcoholitem][item]["Hue"])/alcohol[alcoholitem][item]["Magnesium"]).toString()).toFixed(3)]
      }
      if (alcoholitem in modegamma) {
        modegamma[alcoholitem].push( + parseFloat(((alcohol[alcoholitem][item]["Ash"] * alcohol[alcoholitem][item]["Hue"])/alcohol[alcoholitem][item]["Magnesium"]).toString()).toFixed(3))
      }
      else{
        modegamma[alcoholitem] = [ + parseFloat(((alcohol[alcoholitem][item]["Ash"] * alcohol[alcoholitem][item]["Hue"])/alcohol[alcoholitem][item]["Magnesium"]).toString()).toFixed(3)]
      }
    }
    gammamedian[alcoholitem].sort()
    let medianlength = modegamma[alcoholitem].length
    modegamma[alcoholitem] = parseFloat(mode(modegamma[alcoholitem])).toFixed(3)
    // console.log(medianflav)
    gammamedian[alcoholitem] = parseFloat(median(gammamedian[alcoholitem]).toString()).toFixed(3)
    // if (medianlength % 2 != 0){
    //   gammamedian[alcoholitem] = parseFloat(gammamedian[alcoholitem][Math.floor(medianlength / 2)]).toFixed(3)
    // }
    // else{
    //   gammamedian[alcoholitem] = parseFloat(gammamedian[alcoholitem][Math.floor(medianlength / 2)] + gammamedian[alcoholitem][Math.floor(medianlength / 2) - 1] / 2).toFixed(3)
    // }
  }
  console.log(meangamma,gammamedian,modegamma,"2")
  return [meangamma,gammamedian,modegamma]                    //Returning the desired results
}