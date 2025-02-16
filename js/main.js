const run = document.getElementById('run');
const workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox")
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
