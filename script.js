const canvasDom = document.querySelector("#myCanvas");
const ctx = canvasDom.getContext("2d");
function init() {
  ctx.strokeStyle = "#fff5";

  step({
    start: { x: 0, y: Math.random() * 720 },
    length: 5,
    theta: Math.PI / 2,
  });

  step({
    start: { x: 0, y: Math.random() * 720 },
    length: 5,
    theta: -(Math.PI / 8),
  });
}

let pendingTasks = [];

function step(b, depth = 0) {
  const end = getEndPoint(b);
  drawBranch(b);

  if (depth < 4 || Math.random() < 0.5) {
    pendingTasks.push(() =>
      step(
        {
          start: end,
          length: b.length + (Math.random() * 2 - 1),
          theta: b.theta - 0.2 * Math.random(),
        },
        depth + 1
      )
    );
  }
  if (depth < 4 || Math.random() < 0.3) {
    pendingTasks.push(() =>
      step(
        {
          start: end,
          length: b.length + (Math.random() * 2 - 1),
          theta: b.theta + 0.2 * Math.random(),
        },
        depth + 1
      )
    );
  }
  if (depth < 4 || Math.random() < 0.2) {
    pendingTasks.push(() =>
      step(
        {
          start: end,
          length: b.length + (Math.random() * 2 - 1),
          theta: b.theta + 0.2 * Math.random(),
        },
        depth + 1
      )
    );
  }
}

function frame() {
  const tasks = [];
  pendingTasks = pendingTasks.filter((i) => {
      tasks.push(i);
      return false;
  });
  tasks.forEach((fn) => fn());
}

function startFrame() {
  requestAnimationFrame(() => {
    frame();
    startFrame();
  });
}

startFrame();

function lineTo(p1, p2) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function getEndPoint(b) {
  return {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta),
  };
}

function drawBranch(b) {
  lineTo(b.start, getEndPoint(b));
}

init();
