const createCanvas = (id) => {
  return new fabric.Canvas(id)
}

const addRect = (canvas) => {
  let rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "red",
    width: 20,
    height: 20,
  })
  canvas.add(rect)
}
const addCircle = (canvas) => {
  let circle = new fabric.Circle({
    radius: 20,
    fill: "green",
    left: 100,
    top: 100,
  })
  canvas.add(circle)
}

const createEllipse = () => {
  return new fabric.Ellipse()
}

const createLine = () => {
  return new fabric.Line()
}

const createPolygon = () => {
  return new fabric.Polygon()
}

const addTriangle = (canvas) => {
  let triangle = new fabric.Triangle()
  canvas.add(triangle)
}
const isDrawing = (canvas) => {
  console.log(canvas.isDrawingMode)
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
  canvas.isDrawingMode
    ? (canvas.isDrawingMode = false)
    : (canvas.isDrawingMode = true)
  canvas.renderAll()
}
const isErasing = (canvas) => {
  console.log(canvas.isDrawingMode)
  canvas.isDrawingMode = !canvas.isDrawingMode
  canvas.freeDrawingBrush = new fabric.EraserBrush(canvas)
  //  optional
  canvas.freeDrawingBrush.width = 10
}

let drawButton = document.getElementById("draw-button")
let circleButton = document.getElementById("circle-button")
let rectButton = document.getElementById("rect-button")
let triangleButton = document.getElementById("triangle-button")
let eraseButton = document.getElementById("erase-button")

let canvas = createCanvas("canvas")
canvas.setDimensions(
  { width: "95%", height: "100%", margin: "0 2%" },
  { cssOnly: true }
)

rectButton.addEventListener("click", () => addRect(canvas))
circleButton.addEventListener("click", () => addCircle(canvas))
triangleButton.addEventListener("click", () => addTriangle(canvas))
drawButton.addEventListener("click", () => isDrawing(canvas))
eraseButton.addEventListener("click", () => isErasing(canvas))

// canvas.isDrawingMode = true
// canvas.freeDrawingBrush = new fabric.EraserBrush(canvas)
// //  optional
// canvas.freeDrawingBrush.width = 10
// canvas.isDrawingMode = true

// let imgElement = document.getElementById("image-0")
// fabric.Image.fromURL("naruto.jpg", function (oImg) {
//   oImg.scale(0.5).set("flipX", true)
//   canvas.add(oImg)
// })
// canvas.add(imgInstance)

// circle.set("selectable", false) makes object selectable scaling rotating dragging
// canvas.remove(canvas.item(0)) first object added
