const delay = (time = 1000) => new Promise(
  res => {
    setTimeout(res, time)
  }
)

export default delay