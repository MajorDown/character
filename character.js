export class Character {
  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("character");
    this.followMousePosition();
    this.speaking();
    this.element.addEventListener("click", () => {
      document.querySelectorAll(".selected").forEach((element) => {
        element.classList.remove("selected");
      });
      this.element.classList.toggle("selected");
    });
    this.move();
  }

  assignTo(selector) {
    const parentElement = document.querySelector(selector);
    if (parentElement) {
      parentElement.appendChild(this.element);
    } else {
      console.error(`'${selector}' not found.`);
    }
    return this;
  }

  setId(id) {
    this.element.id = id;
    return this;
  }

  followMousePosition() {
    window.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      const { top, left, width, height } = this.element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      this.element.classList.remove(
        "looking-down",
        "looking-up",
        "looking-left",
        "looking-right"
      );
      const angle = Math.atan2(clientY - centerY, clientX - centerX);
      const angleDeg = (angle * 180) / Math.PI;
      if (angleDeg >= -45 && angleDeg < 45) {
        this.element.classList.add("looking-right");
      } else if (angleDeg >= 45 && angleDeg < 135) {
        this.element.classList.add("looking-down");
      } else if (angleDeg >= -135 && angleDeg < -45) {
        this.element.classList.add("looking-up");
      } else {
        this.element.classList.add("looking-left");
      }
    });
  }

  speaking() {
    let speakTimeOut;
    window.addEventListener("click", (event) => {
      if (this.element.classList.contains("speaking")) {
        document.querySelector(".dial").remove();
        this.element.classList.remove("speaking");
        clearTimeout(speakTimeOut);
      }
      const { clientX, clientY } = event;
      const dial = document.createElement("div");
      dial.classList.add("dial");
      this.element.appendChild(dial);
      dial.textContent = `coordonnées : ${clientX}, ${clientY}`;
      this.element.classList.add("speaking");
      speakTimeOut = setTimeout(() => {
        dial.remove();
        this.element.classList.remove("speaking");
      }, 3000);
    });
  }

  move() {
    const { top, left } = this.element.getBoundingClientRect();
    let positionX = left;
    let positionY = top;
    const moveDistance = 1;
    const moveInterval = 10;
    let isMovingLeft = false;
    let isMovingRight = false;
    let isMovingUp = false;
    let isMovingDown = false;

    const moveLeft = () => {
      positionX -= moveDistance;
      this.element.style.left = `${positionX}px`;
    };

    const moveRight = () => {
      positionX += moveDistance;
      this.element.style.left = `${positionX}px`;
    };

    const moveUp = () => {
      positionY -= moveDistance;
      this.element.style.top = `${positionY}px`;
    };

    const moveDown = () => {
      positionY += moveDistance;
      this.element.style.top = `${positionY}px`;
    };

    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          if (!isMovingLeft) {
            isMovingLeft = true;
            const intervalL = setInterval(moveLeft, moveInterval);
            window.addEventListener("keyup", (event) => {
              if (event.key === "ArrowLeft") {
                isMovingLeft = false;
                clearInterval(intervalL);
              }
            });
          }
          break;
        case "ArrowRight":
          if (!isMovingRight) {
            isMovingRight = true;
            const intervalR = setInterval(moveRight, moveInterval);
            window.addEventListener("keyup", (event) => {
              if (event.key === "ArrowRight") {
                isMovingRight = false;
                clearInterval(intervalR);
              }
            });
          }
          break;
        case "ArrowUp":
          if (!isMovingUp) {
            isMovingUp = true;
            const intervalU = setInterval(moveUp, moveInterval);
            window.addEventListener("keyup", (event) => {
              if (event.key === "ArrowUp") {
                isMovingUp = false;
                clearInterval(intervalU);
              }
            });
          }
          break;
        case "ArrowDown":
          if (!isMovingDown) {
            isMovingDown = true;
            const intervalD = setInterval(moveDown, moveInterval);
            window.addEventListener("keyup", (event) => {
              if (event.key === "ArrowDown") {
                isMovingDown = false;
                clearInterval(intervalD);
              }
            });
          }
          break;
      }
    });
  }
}
