// date: 28:04:2021
// ShashiKumar........
// invincible

function eror(e) {
  if (this.value) {
    this.classList.add("clear");
  } else {
    this.classList.remove("clear");
  }
}

function errorcheck(e) {
  const allin = document.querySelectorAll('.inputbox');
  let flag = 0;
  allin.forEach((item, i) => {
    let inter = parseInt(item.value);
    if (inter <= 100 && inter >= 0 && inter) {
      flag++;
    }
  });
  if (flag == allin.length) {
    return 1;
  } else {
    let esr = document.getElementById('errorshow');
    esr.style.display = "block";
    setTimeout(function() {
      esr.style.display = "none";
    }, 2000);
    return 0;
  }
}

function newobj(subcode, res) {
  let obj = {};
  obj.subcode = subcode;
  obj.result = parseInt(res);
  return obj;
}

function funfiller(creditbase) {
  let filler = document.getElementById('filler');
  let dout = document.createElement('div');
  Object.keys(creditbase).forEach(function(key) {
    let subcode = key.slice(2);
    if (subcode.includes("_")) {
      subcode = subcode.replace("_", " / ");
    }
    let temp = `<label for="${key}" class="labelname">${subcode}</label>
    <input type="number" class="inputbox" id="${key}"placeholder="enter marks" max="100" min="0">`
    let d = document.createElement('div');
    d.className = "inputkeep";
    d.innerHTML = temp;
    dout.append(d)
  });
  document.getElementById('resultbar').style.display = "none";
  document.getElementById('resultspan').textContent = "0.00"
  let er = document.getElementById('loaderbox');
  let loadwords = document.getElementById('loadwords');
  er.style.display = "flex";
  setTimeout(function() {
    er.style.display = "none";
  }, 1500);
  loadwords.textContent = "Loading..."
  filler.innerHTML = "";
  filler.append(dout);
  const allin = document.querySelectorAll('.inputbox');
  allin.forEach((item, i) => {
    item.addEventListener('blur', eror);
  });
}

function marks(res) {
  if (res >= 90) {
    return 10;
  } else if (res < 90 && res >= 80) {
    return 9;
  } else if (res < 80 && res >= 70) {
    return 8;
  } else if (res < 70 && res >= 60) {
    return 7;
  } else if (res < 60 && res >= 45) {
    return 6;
  } else if (res < 45 && res >= 40) {
    return 4;
  } else if (res < 40) {
    return 0;
  }
}

function cals(arr, creditbase) {
  let resadd = 0;
  let creditsum = 0;
  arr.forEach((item, i) => {
    resadd = resadd + (marks(item.result) * creditbase[item.subcode]);
  });
  Object.values(creditbase).forEach(function(value) {
    creditsum = creditsum + value;
  });
  let total = resadd / creditsum;
  total = total.toFixed(2);
  return total;
}

document.getElementById('brancherse').addEventListener("change", brancher);

function brancher(e) {
  full(this.value);
}

function full(branchcode) {
  let allcredit = {
    CS: {
      CS18CS31: 3,
      CS18CS32: 4,
      CS18CS33: 3,
      CS18CS34: 3,
      CS18CS35: 3,
      CS18CS36: 3,
      CS18CSL37: 2,
      CS18CSL38: 2,
      CS18CPC39_18KAN39: 1,
    },

    CV: {
      CV18CV31: 3,
      CV18CV32: 4,
      CV18CV33: 3,
      CV18CV34: 3,
      CV18CV35: 3,
      CV18CS36: 3,
      CV18CVL37: 2,
      CV18CVL38: 2,
      CV18CPC39_18KAN39: 1,
    },

    ME: {
      ME18ME31: 3,
      ME18ME32: 4,
      ME18ME33: 3,
      ME18ME34: 3,
      ME18ME35A: 3,
      ME18ME36A: 3,
      ME18MEL37: 2,
      ME18MEL38: 2,
      ME18CPC39_18KAN39: 1,
    },
    EC: {
      EC18EC31: 3,
      EC18EC32: 4,
      EC18EC33: 3,
      EC18EC34: 3,
      EC18EC35: 3,
      EC18EC36: 3,
      EC18ECL37: 2,
      EC18ECL38: 2,
      EC18CPC39_18KAN39: 1,
    },
  }

  let arr = [];
  let creditbase = allcredit[branchcode];

  let resspan = document.getElementById('resultspan');
  let subbtn = document.getElementById('subbtn');
  subbtn.addEventListener("click", cad);

  function cad() {
    if (!errorcheck()) {
      return;
    }
    arr = [];
    const allin = document.querySelectorAll('.inputbox');
    allin.forEach((item, i) => {
      let res = 0;
      if (item.value == "") {
        res = 0;
      } else {
        res = parseInt(item.value);
      }
      let o = newobj(item.id, res);
      arr.push(o)
    });
    let getse = cals(arr, creditbase);
    let er = document.getElementById('loaderbox');
    let rbar = document.getElementById('resultbar');
    let loadwords = document.getElementById('loadwords');
    er.style.display = "flex";
    setTimeout(function() {
      er.style.display = "none";
    }, 2000);
    loadwords.textContent = "Calculating..."
    rbar.style.display = "block";
    resspan.textContent = getse;
  }
  funfiller(creditbase);
};
full("CS");
