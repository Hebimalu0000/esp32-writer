// Blocklyワークスペースの初期化
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    theme: Blockly.Themes.Classic
});

// 対応デバイスの選択
const boardSelect = document.getElementById('boardSelect');

// setup用初期化コード生成ヘルパー
let setupCode = new Set();
function addSetup(code) {
    setupCode.add(code);
}

// コード生成
function generateCode() {
    const target = boardSelect.value;
    const userCode = Blockly.JavaScript.workspaceToCode(workspace);

    // 共通ヘッダー
    let header = `
${target === 'esp32' ? '#include <WiFi.h>' : ''}
void setup() {
    Serial.begin(115200);
    ${Array.from(setupCode).join("\n    ")}
}
void loop() {
    ${userCode}
}
    `;

    document.getElementById("codeOutput").textContent = header;
    setupCode.clear(); // 初期化コードリセット
}
