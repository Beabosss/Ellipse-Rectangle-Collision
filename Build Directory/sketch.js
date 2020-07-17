function setup() {
  createCanvas(1792, 768);
}

function collidePointRect(px, py, rx1, ry1, rx2, ry2){
  if (px >= rx1 && px <= rx1 + Math.abs(rx1 - rx2) && py >= ry1 && py <= ry1 + Math.abs(ry1 - ry2)){
    return true
  }
  else {
    return false  
  }
}

function distanceCalc(p1x, p1y, p2x, p2y){
  let calculatedDistance = Math.sqrt((p1x - p2x) ** 2 + (p1y - p2y) ** 2)
  return calculatedDistance

}

function collidePointEllipse(px, py, cx, cy, upDiameter, rightDiameter){
  if ((((px - cx) ** 2)/(rightDiameter/2)**2) + (((py - cy) ** 2)/(upDiameter/2)**2) <= 1){
    return true
  }
  
  return false

}

function collideRectEllipse(cx, cy, upDiameter, rightDiameter, rx1, ry1, rx2, ry2, points){
  // print("Checkpoint")
  
  if (collidePointEllipse(rx1, ry1, cx, cy, upDiameter, rightDiameter)){
    return true
  }
  else if (collidePointEllipse(rx2, ry1, cx, cy, upDiameter, rightDiameter)){
    return true
  }
  else if (collidePointEllipse(rx2, ry2, cx, cy, upDiameter, rightDiameter)){
    return true
  }
  else if (collidePointEllipse(rx1, ry2, cx, cy, upDiameter, rightDiameter)){
    return true
  }
  let l = rightDiameter// 141.421356 
  let distance = Math.sqrt((0.5 * rightDiameter) ** 2 - (0.5 * upDiameter) ** 2)
  let c1x = cx + distance
  let c2x = cx - distance
  let c1y = cy
  let c2y = cy

  // circle(c1x, c1y, 10)
  // circle(c2x, c2y, 10)
  let centerX = (c1x + c2x)/2
  let centerY = (c1y + c2y)/2
  for (let i = -(points/8); i < points/8 + 1; i++){
  // for (let i = 0; i < 1; i++){
    let xVal = (l*2)/(points/2) * i + centerX
  
  let outputVal = 0
  let toBeHalfed = 0 // Max Val
  let minVal = upDiameter/2
  let yVal = 0
  let guessY = 0
  let inverseYVal = 0
  // stroke("black")
    for (let i = 0; i < 10; i++){
        // print(c1x, c1y, c2x, c2y)
 
      if (minVal >= toBeHalfed){
        // stroke("red")
      }
      // print(yVal)
      guessY = cy - ((minVal + toBeHalfed)/2)
      // print("guess", guessY)
      outputVal = distanceCalc(c1x, c1y, xVal, guessY) + distanceCalc(c2x, c2y, xVal, guessY)
      // print("output", outputVal)
      
      // let loss = l - outputVal
      // console.log("loss", loss)
      // print("cords", xVal, guessY, minVal, toBeHalfed)
      if (outputVal <= l && outputVal >= l){
        yVal = guessY
        inverseYVal = 2*cy + yVal
        // stroke("red")
        break
      }
      else if (outputVal > l){
        
       minVal = (minVal + toBeHalfed)/2 // + minVal/2
      }
      
      else{
        toBeHalfed = (minVal + toBeHalfed)/2 // + minVal/2
      
      }
        
        
      yVal = guessY
      inverseYVal = 2*cy - yVal
      
    
    }
      // print(yVal)
    
    if (collidePointRect(xVal, yVal, rx1, ry1, rx2, ry2)){
    
    return true
  }
    else if (collidePointRect(xVal, inverseYVal, rx1, ry1, rx2, ry2)){
      return true
  }
      // print(xVal, yVal)
     // circle(xVal, yVal, 10)
     // circle(xVal, inverseYVal, 10)
    }
    
    
    return false


}

let hit = false
function draw() {
  stroke("black")
  background(220);
  
  let r1x = mouseX
  let r1y = mouseY
  let r2x = mouseX + 100
  let r2y = mouseY + 100
  let cx = 350
  let cy = 300
  let rightDiameter = 200
  let upDiameter = 100
  
  
  hit = collideRectEllipse(cx, cy, upDiameter, rightDiameter, r1x, r1y, r2x, r2y, 300)
  
  if (hit){
    stroke("red")
  }
  ellipse(cx, cy, rightDiameter, upDiameter)
  
  rect(r1x, r1y, Math.abs(r1x-r2x), Math.abs(r1y-r2y))
  
  print(hit)
  
  
  
  
}