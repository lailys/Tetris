
var canvas = document.getElementById('tetris').getContext('2d')

var screenH=screen.height
var screenW=screen.width






document.getElementById("alert").style.visibility = "hidden";



var i = 0
var shapeL = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0]
    ]
]
var shapeT = [

    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 0, 1]
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
    ],


]
var shapeZ = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
]
var shapeI = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]

    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]
]

var shapeC = [
    [
        [1, 1],
        [1, 1],

    ],
    [
        [1, 1],
        [1, 1],

    ],
    [
        [1, 1],
        [1, 1],

    ],
    [
        [1, 1],
        [1, 1],

    ]
]
var shapes = [
    [shapeC, "#006856"],
    [shapeI, "#e63e00"],
    [shapeL, "#D223AA"],
    [shapeT, "#1f78df"],
    [shapeZ, "#FFF5F3"]
]
var begin
var myGamePiece = {}
var moveArea = [
    [],
    []
]
var stopGame
var clicked = true


document.getElementById("start").addEventListener("click", function () {
    if (clicked) {
       

        document.getElementById("start").className = "fa fa-refresh"
    start();
        clicked = false

    } else if (!clicked) {

        document.getElementById("start").className = "fa fa-play"

        document.location.reload(true)
        clicked = true
    }
});



function start() {
    document.getElementById("alert").style.visibility = "hidden";
    begin = new Date();

    for (var col = 0; col < 480; col += 1) {
        for (var row = 0; row < 240; row += 10) {

            moveArea[1].push([row, col].join(''))

        }
    }

    var i = Math.floor((Math.random() * 4) + 0);
    var x = Math.floor((Math.random() * 10) + 0);
    var shape = Math.floor((Math.random() * 5) + 0);
    myGamePiece = new component(shapes[shape][0], i, shapes[shape][1], 90, 0);
    myGamePiece.movement()
}

function component(arr, i, color, a, b) {


    this.pieceLoc = []
    this.shape = arr
    this.i = i
    this.color = color
    this.x = a
    this.y = b
    this.speed = 40
    this.crashed = true
    arr[i].map((arrX, y) => {
        arrX.map((arrY, x) => {
            if (arrY !== 0) {
                canvas.fillStyle = color;
                canvas.fillRect(a + (x * 10), b + (y * 10), 10, 10)
                this.pieceLoc.push([
                    [a + (x * 10), b + (y * 10)], this.color
                ])
            }
        })
    })

    this.movement = function () {
        stopGame = setInterval(update, 10)

    }
    this.gameover = function () {
        if (moveArea[0][moveArea[0].length - 1] !== undefined) {
            if (moveArea[0][moveArea[0].length - 1][0][1] < 40) {
                clearInterval(stopGame)
                document.getElementById("alert").style.visibility = "visible";
               
            }

        }
    }

    this.fillCanvas = function () {
        moveArea[0].map(each => {
            canvas.fillStyle = each[1]
            canvas.fillRect(each[0][0], each[0][1], 10, 10);
        })

    }
    this.keyMove = function () {
        document.onkeydown = controller
    }
    this.keyMove = function () {
        document.onkeydown = controller
    
    }

    this.filledLine = function () {
        for (var row = 470; row > 0; row -= 10) {
            var count = 0

            moveArea[0].map(each => {
                each[0][1] === row ? count++ : count += 0
            })
            if (count === 24) {
                var a = []
                moveArea[0].map(a1 => {
                    if (a1[0][1] === row) {
                        a.push(a1)
                    }
                })
                moveArea[0] = moveArea[0].filter(pix => pix[0][1] !== row)
                moveArea[0].map(loc => {
                    if (loc[0][1] < row) {
                        loc[0][1] = loc[0][1] + 10
                    }
                })
                for (var col = 0; col < 480; col += 1) {
                    for (var row = 0; row < 240; row += 10) {

                        a.push([row, col].join(''))

                    }
                }

                moveArea[0].map(loc => {
                    for (var i = 0; i < 10; i++) {
                        a = a.filter(pix => pix !== [loc[0][0], loc[0][1] + i].join(''))

                    }
                    for (var i = 0; i < 10; i++) {
                        a = a.filter(pix => pix !== [loc[0][0] + i, loc[0][1]].join(''))

                    }

                })
                moveArea[1] = a

            }







        }

    }


}




function update() {
    var now = new Date();
 var mins = Math.round(((now - begin % 86400000) % 3600000) / 60000);
  var secs = Math.round((((now - begin % 86400000) % 3600000) % 60000) / 1000);
 

    startClock(mins,secs)
    myGamePiece.gameover()
    myGamePiece.crash
    if ((moveArea[1].includes([myGamePiece.pieceLoc[0][0][0], myGamePiece.pieceLoc[0][0][1] + 10].join('')) &&
            moveArea[1].includes([myGamePiece.pieceLoc[1][0][0], myGamePiece.pieceLoc[1][0][1] + 10].join('')) &&
            moveArea[1].includes([myGamePiece.pieceLoc[2][0][0], myGamePiece.pieceLoc[2][0][1] + 10].join('')) &&
            moveArea[1].includes([myGamePiece.pieceLoc[3][0][0], myGamePiece.pieceLoc[3][0][1] + 10].join('')) && myGamePiece.crashed) === true) {
            
            
        canvas.clearRect(0, 0, 240, 480);
        myGamePiece.y++
        myGamePiece = new component(myGamePiece.shape, myGamePiece.i, myGamePiece.color, myGamePiece.x, myGamePiece.y);


    } else {
        myGamePiece.pieceLoc.map(each => {
            moveArea[0].push([each[0], each[1]])



            for (var i = 0; i < 10; i++) {
                moveArea[1] = moveArea[1].filter(pix => pix !== [each[0][0], each[0][1] + i].join(''))


            }
            for (var i = 0; i < 10; i++) {
                moveArea[1] = moveArea[1].filter(pix => pix !== [each[0][0] + i, each[0][1]].join(''))


            }


        })


        var i = Math.floor((Math.random() * 4) + 0);
        var x = Math.floor((Math.random() * 10) + 0);
        var shape = Math.floor((Math.random() * 5) + 0);
        myGamePiece = new component(shapes[shape][0], i, shapes[shape][1], 90, 0);

    }
    myGamePiece.fillCanvas()
    myGamePiece.filledLine()
    myGamePiece.keyMove()


}

function controller(e) {
    e = e || window.event;
    if (e.keyCode == 39 && moveArea[1].includes([myGamePiece.pieceLoc[0][0][0] + 10, myGamePiece.pieceLoc[0][0][1]].join('')) &&
        moveArea[1].includes([myGamePiece.pieceLoc[1][0][0] + 10, myGamePiece.pieceLoc[1][0][1]].join('')) &&
        moveArea[1].includes([myGamePiece.pieceLoc[2][0][0] + 10, myGamePiece.pieceLoc[2][0][1]].join('')) &&
        moveArea[1].includes([myGamePiece.pieceLoc[3][0][0] + 10, myGamePiece.pieceLoc[3][0][1]].join(''))) {

        myGamePiece.x += 10


    } else if (e.keyCode == 37 && moveArea[1].includes([myGamePiece.pieceLoc[0][0][0] - 10, myGamePiece.pieceLoc[0][0][1]].join('')) &&
        moveArea[1].includes([myGamePiece.pieceLoc[1][0][0] - 10, myGamePiece.pieceLoc[1][0][1]].join('')) &&
        moveArea[1].includes([myGamePiece.pieceLoc[2][0][0] - 10, myGamePiece.pieceLoc[2][0][1]].join('')) &&
        moveArea[1].includes([myGamePiece.pieceLoc[3][0][0] - 10, myGamePiece.pieceLoc[3][0][1]].join(''))) {

        myGamePiece.x -= 10
    } else if (e.keyCode == 40 && moveArea[1].includes([myGamePiece.pieceLoc[0][0][0], myGamePiece.pieceLoc[0][0][1] + 20].join('')) &&
        moveArea[1].includes([myGamePiece.pieceLoc[1][0][0], myGamePiece.pieceLoc[1][0][1] + 20].join('')) &&
        moveArea[1].includes([myGamePiece.pieceLoc[2][0][0], myGamePiece.pieceLoc[2][0][1] + 20].join('')) &&
        moveArea[1].includes([myGamePiece.pieceLoc[3][0][0], myGamePiece.pieceLoc[3][0][1] + 20].join(''))) {

        myGamePiece.y += 10
    } else if (e.keyCode == 38 && myGamePiece.y < 430) {
        if (myGamePiece.i < 3) {

            if (myGamePiece.pieceLoc[0][0][0] === 230 && myGamePiece.shape.length === 4) {
                myGamePiece.x -= 20
                myGamePiece.i++
            } else if (myGamePiece.pieceLoc[0][0][0] === 0 && myGamePiece.shape[myGamePiece.i].length === 4) {
                myGamePiece.x += 10
                myGamePiece.i++
            } else {
                myGamePiece.i++
            }

        } else if (myGamePiece.i === 3) {
            if (myGamePiece.pieceLoc[0][0][0] >= 230 && myGamePiece.shape.length === 4) {
                myGamePiece.x -= 20
                myGamePiece.i = 0
            } else if (myGamePiece.pieceLoc[0][0][0] === 0 && myGamePiece.shape[myGamePiece.i].length === 4) {
                myGamePiece.x += 10
                myGamePiece.i = 0
            } else {
                myGamePiece.i = 0
            }

        }



    }
}

function startClock(mins,secs) {

    document.getElementById("clock").innerHTML=mins+":"+secs
}