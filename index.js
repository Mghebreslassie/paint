window.addEventListener("load", drawing())
let drawButton = document.getElementById("draw-button")

function useCanvas() {
  let canvas = document.getElementById("canvas")
  let ctx = canvas.getContext("2d")

  //   ctx.fillStyle = "rgb(200,0,0)"
  //   ctx.fillRect(10, 10, 50, 50)

  //   ctx.fillStyle = "rgba(0,0,200,0.5)"
  //   ctx.fillRect(30, 30, 50, 50)

  //   ctx.lineWidth = 7.0
  //   ctx.strokeStyle = "green"
  //   ctx.strokeRect(50, 50, 50, 50)

  //   ctx.lineWidth = 1
  //   ctx.clearRect(20, 20, 50, 50)

  //resize dynamically

  let drawOn = false
  ctx.beginPath()

  function startDraw() {
    drawOn = true
  }
  function endDraw() {
    drawOn = false
  }
  function draw(e) {
    if (!drawOn) {
      return null
    }
    console.log(e.clientX)
    ctx.lineWidth = 10
    ctx.lineCap = "round"
    ctx.strokeStyle = "black"
    ctx.lineTo(e.clientX, e.clientY)
    ctx.stroke()
  }
  canvas.addEventListener("mousedown", startDraw)
  canvas.addEventListener("mouseup", endDraw)
  canvas.addEventListener("mousemove", draw)
}

function drawing() {
  var canvas = new fabric.Canvas("canvas")
  canvas.isDrawingMode = true
  canvas.freeDrawingBrush.width = 5
  canvas.freeDrawingBrush.color = "#ff0000"
}
