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
    objectCaching: false,
    stroke: "green",
    strokeWidth: 10,
  })
  canvas.add(rect)
  rect.set("selectable", true)
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
}

const addLine = (e, canvas) => {
  let coords = []
  lineOn = !lineOn
  if (lineOn) {
    canvas.on("mouse:down", (e) => addCoordinate(e))
    canvas.on("mouse:down", createCoordList)
    canvas.on("mouse:down", createLine)
  } else {
    canvas.__eventListeners["mouse:down"] = []
  }

  function addCoordinate(e) {
    coords.push(e.pointer)
    console.log(e.pointer)
  }
  function createCoordList() {
    if (coords.length >= 2) {
      coords = coords.slice(coords.length - 2)
      let y = [coords[0].x, coords[0].y, coords[1].x, coords[1].y]
      return y
    }
    return null
  }
  function createLine() {
    let line = new fabric.Line(createCoordList(), {
      left: 10,
      top: 15,
      stroke: "red",
    })
    console.log(coords)
    canvas.add(line)
  }
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
}

let drawOn = true
let eraseOn = true
let lineOn = false

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
lineButton.addEventListener("click", (e) => addLine(e, canvas))
imageButton.addEventListener("change", (event) => addImage(event))
