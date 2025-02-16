const run = document.getElementById('run');
const workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
  grid: {
    spacing: 20,
    length: 1,
    colour: '#ccc',
    snap: true
  },
  move:{ 
    scrollbars: {
      horizontal: true,
      vertical: true
    },
    drag: true,
    wheel: false
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true
  },
  trashcan: true
});

run.addEventListener("click", updateBlocks);

function updateBlocks() {
  const codebox = document.getElementById("codebox");
  const code = Blockly.JavaScript.workspaceToCode(workspace);

  codebox.value = code;

  try {
    eval(code);
  } catch (error) {
    alert("Code ERROR: " + error);
  }
}

workspace.addChangeListener(function() {
  const codebox = document.getElementById("codebox");
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  
  codebox.value = code;
});
