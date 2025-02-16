// LED制御ブロック
Blockly.Blocks['arduino_led'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("LED")
            .appendField(new Blockly.FieldDropdown([
                ["ON", "HIGH"],
                ["OFF", "LOW"]
            ]), "STATE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("LEDをONまたはOFFにする");
    }
};

Blockly.JavaScript['arduino_led'] = function (block) {
    const state = block.getFieldValue('STATE');
    addSetup('pinMode(LED_BUILTIN, OUTPUT);');
    return `digitalWrite(LED_BUILTIN, ${state});\n`;
};

// Wi-Fi接続ブロック (ESP32専用)
Blockly.Blocks['wifi_connect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Wi-Fi接続 SSID")
            .appendField(new Blockly.FieldTextInput("your_ssid"), "SSID")
            .appendField("パスワード")
            .appendField(new Blockly.FieldTextInput("your_password"), "PASSWORD");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
    }
};

Blockly.JavaScript['wifi_connect'] = function (block) {
    const ssid = block.getFieldValue('SSID');
    const password = block.getFieldValue('PASSWORD');
    addSetup(`WiFi.begin("${ssid}", "${password}");`);
    return `
while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
}
Serial.println("WiFi Connected! IP: " + WiFi.localIP());
`;
};

// Toolboxの設定
const toolbox = `
<xml id="toolbox" style="display: none">
    <category name="基本" colour="160">
        <block type="arduino_led"></block>
    </category>
    <category name="通信" colour="210">
        <block type="wifi_connect"></block>
    </category>
    <category name="変数" custom="VARIABLE" colour="330"></category>
</xml>
`;

document.body.insertAdjacentHTML('beforeend', toolbox);
