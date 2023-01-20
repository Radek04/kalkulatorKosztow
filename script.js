const distance = document.querySelector(".distance");
const pickedDistance = document.querySelector(".pickedDistance");
const dataReceived = document.querySelector(".dataReceived");
const dataReceipt = document.querySelector(".dataReceipt");
const dataReturn = document.querySelector(".dataReturn");
const pickCar = document.querySelector(".pickCar");
const btn = document.querySelector(".button");
const error = document.querySelector(".error");
const result = document.querySelector(".result");
const time = new Date();
const fuel = 6.47;
const priceForDay = 120;
const driv5 = 1.2;
const model3 = 1.15;
const tax = 1.23;
const mili = 86400000;
let i = 0;

const priceCategory = {
  basic: 1,
  standard: 1.3,
  medium: 1.6,
  premium: 2,
};
const cars = {
  Audi: {
    id: 0,
    priceCategories: "medium",
    number: 5,
    combustion: 12,
  },
  Mercedes: {
    id: 1,
    priceCategories: "medium",
    number: 4,
    combustion: 15,
  },
  BMW: {
    id: 2,
    priceCategories: "medium",
    number: 4,
    combustion: 15,
  },
  Toyota: {
    id: 3,
    priceCategories: "standard",
    number: 7,
    combustion: 9,
  },
  Hyundai: {
    id: 4,
    priceCategories: "basic",
    number: 10,
    combustion: 7,
  },
  Porsche: {
    id: 5,
    priceCategories: "premium",
    number: 2,
    combustion: 20,
  },
};

const main = () => {
  console.log(i);
  error.textContent = "";
  dateError();
  licence();
  distanceZero();
  if (error.textContent != "") {
  } else {
    const { netto, brutto, costFuel, diffrentTime } = calculate();
    const arr = Array.from(document.getElementsByClassName("addList"));
    document.getElementsByClassName(
      "brutto"
    )[0].textContent = `Cena brutto to: ${brutto}zł`;
    document.getElementsByClassName(
      "netto"
    )[0].textContent = `Cena netto to: ${netto}zł`;
    document.getElementsByClassName(
      "addition"
    )[0].textContent = `Dodatkowe informacje:`;
    arr[0].children[0].textContent = `Koszt paliwa to: ${costFuel}`;
    arr[0].children[1].textContent = `Ilość dni wynosi: ${diffrentTime}`;
    arr[0].children[2].textContent = `Cena samego wypożecznia: ${Math.round(
      priceForDay * diffrentTime
    )}`;
  }
};
function calculate() {
  const dis = distance.value;
  const lic = dataReceived.value;

  let rec = dataReceipt.value;
  let ret = dataReturn.value;

  rec = new Date(rec);
  ret = new Date(ret);
  const diffrentTime = (ret.getTime() - rec.getTime()) / mili + 1;

  const car = pickCar.value;

  let results = Math.round(priceForDay * diffrentTime);
  results *= priceCategory[cars[car].priceCategories];

  if (time.getFullYear() - lic < 3 && cars[car].priceCategories === "premium") {
    result.textContent = "Nie możesz wypożyczyć tego samochodu";
  } else if (time.getFullYear() - lic < 5) {
    results *= driv5;
  }
  if (cars[car].number < 3) {
    results *= model3;
  }
  const costFuel = Math.round((dis / 100) * cars[car].combustion * fuel);
  results += costFuel;
  const netto = Math.round(results);
  const brutto = Math.round(results * tax);

  return { netto, brutto, costFuel, diffrentTime };
}
const distanceZero = () => {
  if (distance.value == 0) {
    error.textContent = "Wartość przejechanych kilometrów nie może być zerem!";
  }
};
const distanceValue = () => {
  pickedDistance.textContent = "(" + distance.value + ")";
};
const licence = () => {
  const lic = dataReceived.value;
  if (lic > time.getFullYear() || lic == "") {
    error.textContent = "Wpisz poprawny rok otrzymania prawa jazdy!";
  }
};
const date = () => {
  const rec = dataReceipt.value;
  const ret = dataReturn.value;

  dataReturn.setAttribute("min", rec);
  dataReceipt.setAttribute("max", ret);
};
const dateError = () => {
  if (dataReceipt.value == "" || dataReturn.value == "") {
    error.textContent = "Musisz podać datę!";
  }
};

btn.addEventListener("click", main);
distance.addEventListener("change", distanceValue);
dataReceipt.addEventListener("change", date);
dataReturn.addEventListener("change", date);
