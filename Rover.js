const YON = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

const DIRECTION = {
  LEFT: 0,
  RIGHT: 1
};

class gezegen {
  constructor(maxx, maxy, name) {
    this.maxx = maxx;
    this.maxy = maxy;
    this.name = name;
  }
}

class rover {
  constructor(x, y, gezegenx, gezegeny) {
    this.x = x;
    this.y = y;
    this.maxx = gezegenx;
    this.maxy = gezegeny;
    this.YON = YON.UP;
  }

  Move(asd) {
    switch (asd) {
      case YON.UP:
        if (this.y == this.maxy) {
          alert("Rover Düşecek ..");
          break;
        }
        this.y++;
        break;
      case YON.RIGHT:
        if (this.x == this.maxx) {
          alert("Rover Düşecek ..");
          break;
        }
        this.x++;
        break;
      case YON.DOWN:
        if (this.y == 0) {
          alert("Rover Düşecek ..");
          break;
        }
        this.y--;
        break;
      case YON.LEFT:
        if (this.x == 0) {
          alert("Rover Düşecek ..");
          break;
        }
        this.x--;
        break;
      default:
        break;
    }
  }

  Turn(asd) {
    switch (asd) {
      case DIRECTION.RIGHT:
        if (this.YON == 3) {
          this.YON = 0;
        } else {
          ++this.YON;
        }
        break;
      case DIRECTION.LEFT:
        if (this.YON == 0) {
          this.YON = 3;
        } else {
          --this.YON;
        }
      default:
        break;
    }
  }
}

const squares = [];

function CreateGezegen(maxx, maxy) {
  let top = 0;
  let left = 0;
  for (let i = 0; i < maxy; i++) {
    for (let j = 0; j < maxx; j++) {
      let square = document.createElement("div");
      square.className = `square x-${j} y-${i}`;
      square.id = `x${j}y${i}`;
      square.style.top = `${top}px`;
      square.style.left = `${left}px`;
      squares.push(square);
      left += 50;
    }
    left = 0;
    top += 50;
  }
}

CreateGezegen(8, 8);

squares.forEach(element => {
  document.getElementById("container").appendChild(element);
});

var rover1 = new rover(4, 4, 7, 7);

function LocateRover(rover) {
  var sq = document.getElementById(`x${rover.x}y${rover.y}`);
  if (rover.YON == YON.DOWN) {
    sq.style.backgroundImage = "url(./images/Up.jpg)";
  }
  if (rover.YON == YON.LEFT) {
    sq.style.backgroundImage = "url(./images/Left.jpg)";
  }
  if (rover.YON == YON.UP) {
    sq.style.backgroundImage = "url(./images/Down.jpg)";
  }
  if (rover.YON == YON.RIGHT) {
    sq.style.backgroundImage = "url(./images/Right.jpg)";
  }
}
function reset(rover) {
  document.getElementById(`x${rover.x}y${rover.y}`).style.backgroundImage =
    "none";
}
LocateRover(rover1);

function UpKey(rover) {
  reset(rover);
  rover.Move(rover.YON);
  LocateRover(rover);
}

function LeftKey(rover) {
  reset(rover);
  rover.Turn(DIRECTION.LEFT);
  LocateRover(rover);
}

function RightKey(rover) {
  reset(rover);
  rover.Turn(DIRECTION.LEFT);
  LocateRover(rover);
}

document
  .getElementById("up")
  .addEventListener("click", UpKey.bind(null, rover1));

document
  .getElementById("left")
  .addEventListener("click", LeftKey.bind(null, rover1));

document
  .getElementById("right")
  .addEventListener("click", RightKey.bind(null, rover1));
