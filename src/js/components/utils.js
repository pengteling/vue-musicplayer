export const formatTime = (num) => {
  let mm = parseInt(num / 60)
  let ss = parseInt(num - mm *60)
  ss = ss <10 ? `0${ss}`:ss
  //let ms = (num - mm*60 -s ).toFixed(2)
  return `${mm}:${ss}`
}