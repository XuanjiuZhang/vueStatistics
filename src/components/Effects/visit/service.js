function randomData() {
  return Math.round(Math.random() * 255);
}

const getColorByIndex = (i) => {
  let randomR;
  let randomB;
  let randomG;
  switch (i) {
    case 0:
      randomR = 255;
      randomG = 196;
      randomB = 0;
      break;
    case 1:
      randomR = 41;
      randomG = 155;
      randomB = 255;
      break;
    case 2:
      randomR = 40;
      randomG = 201;
      randomB = 127;
      break;
    case 3:
      randomR = 114;
      randomG = 102;
      randomB = 186;
      break;
    default:
      randomR = randomData();
      randomB = randomData();
      randomG = randomData();
      break;
  }
  const colorStr = `rgb(${randomR}, ${randomG}, ${randomB})`;
  return {
    colorStr,
    randomR,
    randomG,
    randomB
  }
}

export { getColorByIndex } 