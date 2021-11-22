const createCanvas = (id) => {
  return new fabric.Canvas(id)
}

function cleanUpHandlers(canvas) {
  canvas.__eventListeners["mouse:down"] = []
  canvas.__eventListeners["mouse:move"] = []
  canvas.__eventListeners["mouse:up"] = []
}

const addRect = (canvas) => {
  let rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "red",
    width: 20,
    height: 20,
    objectCaching: false,
    stroke: "green",
    strokeWidth: 10,
  })
  canvas.add(rect)
  rect.set("selectable", true)
  cleanUpHandlers(canvas)
}
const addCircle = (canvas) => {
  let circle = new fabric.Circle({
    radius: 20,
    fill: "green",
    left: 100,
    top: 100,
    objectCaching: false,
  })
  canvas.add(circle)
  circle.set("selectable", true)
  cleanUpHandlers(canvas)
}

const addLine = (canvas) => {
  canvas.isDrawingMode = false
  canvas.on("mouse:down", function (o) {
    isDown = true
    var pointer = canvas.getPointer(o.e)
    var points = [pointer.x, pointer.y, pointer.x, pointer.y]
    line = new fabric.Line(points, {
      strokeWidth: 5,
      fill: "black",
      stroke: "black",
      originX: "center",
      originY: "center",
    })
    canvas.add(line)
  })
  canvas.on("mouse:move", function (o) {
    if (!isDown) return
    var pointer = canvas.getPointer(o.e)
    line.set({ x2: pointer.x, y2: pointer.y })
    canvas.renderAll()
  })
  canvas.on("mouse:up", function (o) {
    isDown = false
  })
}

const addTriangle = (canvas) => {
  let triangle = new fabric.Triangle({
    fill: "green",
    objectCaching: false,
    height: 60,
    width: 60,
    stroke: "blue",
    strokeWidth: 4,
    left: 50,
    top: 20,
    opacity: 0.4,
    skewX: 30,
    skewY: 30,
  })
  canvas.add(triangle)
  triangle.set("selectable", true)
  cleanUpHandlers(canvas)
}

const isDrawing = (canvas) => {
  drawOn = !drawOn
  console.log(drawOn)
  if (canvas.isDrawingMode) {
    if (drawOn) {
      canvas.isDrawingMode = false
    }
  } else {
    canvas.isDrawingMode = true
  }
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
  canvas.renderAll()
  cleanUpHandlers(canvas)
}
const isErasing = (canvas) => {
  eraseOn = !eraseOn
  console.log(eraseOn)
  if (canvas.isDrawingMode) {
    if (eraseOn) {
      canvas.isDrawingMode = false
    }
  } else {
    canvas.isDrawingMode = true
  }
  canvas.freeDrawingBrush = new fabric.EraserBrush(canvas)
  //  optional
  canvas.freeDrawingBrush.width = 10
  cleanUpHandlers(canvas)
}

const addImage = (event) => {
  console.log(fabric)
  // let image = document.getElementById('image')
  let src = URL.createObjectURL(event.target.files[0])
  // image.src = src
  fabric.Image.fromURL(src, function (oImg) {
    oImg.scale(0.5)
    canvas.add(oImg)
  })
  cleanUpHandlers(canvas)
}

let drawOn = true
let eraseOn = true

let drawButton = document.getElementById("draw-button")
let circleButton = document.getElementById("circle-button")
let rectButton = document.getElementById("rect-button")
let triangleButton = document.getElementById("triangle-button")
let eraseButton = document.getElementById("erase-button")
let imageButton = document.getElementById("image-button")
let lineButton = document.getElementById("line-button")

let canvas = createCanvas("canvas")
canvas.selection = false
canvas.setDimensions(
  { width: "95%", height: "100%", margin: "0 2%" },
  { cssOnly: true }
)

const setValue = (event, obj) => {
  if (event.type === "change" && obj._activeObject) {
    let value = event.target.value
    console.log(value)
    console.log(obj)
    let modalTitle = document.getElementById("modal-title").textContent
    console.log(modalTitle)
    switch (modalTitle) {
      case "skew X":
        obj._activeObject.skewX = parseFloat(value / 100) * 360
        break
      case "skew Y":
        obj._activeObject.skewY = parseFloat(value / 100) * 360
        break
      case "opacity":
        obj._activeObject.opacity = parseInt(value) / 100
        break
      case "stroke width":
        obj._activeObject.strokeWidth = parseInt(value) / 10
        canvas.renderAll()
        break
      case "fill color":
        obj._activeObject.fill = value
        break
      case "stroke color":
        obj._activeObject.stroke = value
        break
      default:
        console.log("boo")
    }
    obj.renderAll()
    // let isRange = event.target.type === "range" ? true : false
    // return event.target.value
  }
}
let modalValue = document.getElementById("modal-input")
modalValue.addEventListener("change", (event) => setValue(event, canvas))

rectButton.addEventListener("click", () => addRect(canvas))
circleButton.addEventListener("click", () => addCircle(canvas))
triangleButton.addEventListener("click", () => addTriangle(canvas))
drawButton.addEventListener("click", () => isDrawing(canvas))
eraseButton.addEventListener("click", () => isErasing(canvas))
lineButton.addEventListener("click", () => addLine(canvas))
imageButton.addEventListener("change", (event) => addImage(event))
