// 设置 rem 函数
function setRem() {
  if (document.documentElement.clientWidth > 1400) {
    const rem = document.documentElement.clientWidth * 100 / 1920
    document.documentElement.style.fontSize = rem + 'px'
    document.body.style.fontSize = 0.16 + 'rem'
  } else {
    document.documentElement.style.fontSize = 75 + 'px'
    document.body.style.fontSize = 0.16 + 'rem'
  }
}

// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}
