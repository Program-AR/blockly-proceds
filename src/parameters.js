import { createParameterCaller } from "./callers";
import { HAND, getAvailableName} from "./procedures";

const MINUS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAQAAAD2e2DtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfhDAUCCi+xWH4JAAABcUlEQVR42u3c7ZGCMBSG0etuYcTKls7AyrSEVWd4+bjnUECMeSbhD6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBzu4XHm2rUvPekD2yutR57/4itTLXU0/Pvs9SUW5TcDrDUyE3r9Na6ZwZKBWD5PxVKIBPAVGtknGsZibeBTADPyCjXE1idn8A0/gJjXFPgn0sEwIEljgAHwPc2Xx87QHMCaE4AzQmgOQE0J4DmBNCcAJoTQHMCaE4AzQmgOQE0J4DmBNCcAJoTQHMCaE4AzQmgOQE0J4DmBNDcb2SUsfc0T2re/utAO0BzPg49sot8HOoI+M5IDJIJ4OF+gI+F7gpyRcwxxa6Iyb0E3mvYB96y1kgtv2vijubS18QBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAWXq7xrTQhKAi3AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTEyLTA1VDAyOjEwOjQ3LTA1OjAwdZLI/gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMi0wNVQwMjoxMDo0Ny0wNTowMATPcEIAAAAASUVORK5CYII="

export const addParameter = (self, Blockly, argName) => {

    const argsAmount = self.arguments_.length
    const defaultName = argName || Blockly.Msg.PROCEDURES_PARAMETER + " " + (argsAmount + 1);
    const name = getAvailableName(self, defaultName);
    const id = "INPUTARG" + argsAmount;

    self.arguments_.push(name);
    self.updateParams_();

    var blocks = self.workspace.getAllBlocks();
    blocks.forEach(block => {
        if (block.type === self.callType_ && block.getProcedureCall() === self.getProcedureDef()[0]) {
            block.arguments_.push(name);
            block.updateShape_();
        }
    })

    const callers = () => Blockly.Procedures.getCallers(self.getFieldValue('NAME'), self.workspace);

    callers().forEach(caller => {
        caller.arguments_.push(name);
        caller.updateShape_()
    })

    const createCallButton = new Blockly.FieldImage(
        HAND,
        16,
        16,
        Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name),
        () => createParameterCaller(self, self.arguments_[argsAmount], Blockly)
    )

    const removeParameterButton = new Blockly.FieldImage(
        MINUS,
        16,
        16,
        Blockly.Msg.PROCEDURES_REMOVE_PARAMETER,
        () => removeParameter(self, argsAmount, Blockly)
    )

    const nameField = new Blockly.FieldTextInput(name, function (newName) {
        if(!newName) newName = "_"
        
        const oldName = self.arguments_[argsAmount];

        if (oldName !== newName)
            newName = getAvailableName(self, newName);

        self.arguments_[argsAmount] = newName;

        callers().forEach(caller => {
            caller.arguments_ = caller.arguments_.map(argName => argName === oldName ? newName : argName)
            caller.updateShape_()
        })

        const varBlocks = self.workspace.getAllBlocks().filter(block => block.type === "variables_get" && block.$parent === self.id)

        varBlocks.forEach(varBlock => {
            var varField = varBlock.getField("VAR");
            if (varField.getValue() === oldName) {
                varField.setValue(newName)
            }
        })

        return newName;
    });

    self
        .appendDummyInput(id)
        .appendField(Blockly.Msg.PROCEDURES_BEFORE_PARAMS)
        .appendField(nameField, 'ARG' + argsAmount)
        .appendField(createCallButton)
        .appendField(removeParameterButton);

    self.moveInputBefore(id, 'STACK');

}

const removeParameter = (self, argsAmount, Blockly) => {

    let arguments_ = self.arguments_
    self.arguments_.forEach((_, i) => self.removeInput("INPUTARG" + i))
    self.arguments_ = []
    arguments_.splice(argsAmount, 1)

    const callers = Blockly.Procedures.getCallers(self.getFieldValue('NAME'), self.workspace);
    callers.forEach(block => {
        block.arguments_ = []
        block.updateShape_();
    })
    arguments_.forEach(arg => addParameter(self, Blockly, arg))
}
