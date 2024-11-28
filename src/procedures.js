import { addParameter } from './parameters';
import { createParameterCaller, createCall } from './callers';

const PLUS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAQAAAD2e2DtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfhDAUCCjFLV0NqAAAC60lEQVR42u3dQW7aQABA0Wl7MMjJICeDnIwuqm4qVQrYjMH/Pa/jsfFnTJDwjAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBUP7Y+gClOY4zznX9zHmN8bn3gLHcYtwXbYevDZ5nLost/G7dx2foUeNzyyy+BN7Zs8ncjeHvrvP/NAW9qvff/rueAn1sfwNMcX3hvL2S/3wPcVt7fTl+p/c4AfIsA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4mYHcBinVRdz+v+2tjlHfdrv8lRjHFZcyG3P22VmBPOWQrrsd+WtJ7iOjzkDzQrA5b/XpATmBHAY1ynj7MtxfD1/kDkBrP+RrGHC1ZnxX8Bpwhj7NOGV8z1A3IxbgBvA455+fcwAcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcT9mjLKcevTfFPn5/860AwQ58ehr2wnPw51C3jMccYgcwL48nyAu11nPB3AI2Je1bRHxMz7EPgxjuaBb7mO46zLP3MG+OMwjuM8ecx3cp419f81O4B51v7PY6evlO8B4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQN2fp2G0cV9zXhEVct7HfGeD6wntjisu4rbRdtj4VHnFYLYDD1qfCY9aZA7z/39jyBFz+N7fsRrD7yX+n62H+4zTG3QvWnscYn1sfOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALvzG8Ijm7EmMQYoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTEyLTA1VDAyOjEwOjQ5LTA1OjAwJa2zowAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMi0wNVQwMjoxMDo0OS0wNTowMFTwCx8AAAAASUVORK5CYII="

export const HAND = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfiBAUBKBeKSgeBAAABTElEQVQoz22QzyvDcRjHX5/vvrMyStI2uZgftdVCSpJCyW1y00oUF+Xg4OIkx5VyUyJOsgv/gnJw4YCSSFMyB5pGbLJ99/k8LltreB2f9+v50eOigoc5FvGTJF8pugCwaKaNaE98uf9zMBXwjtNpbvmuaH2B0+HXuuyMEbOlQ4U1M5ZVcYbowg02YfZW5cnE9JIROdI7jsiOacoMPLZdEYPR1ouQkxCRG+feESlIXkQOzLR+NhvCpc3UbPcHAoRsADcAQ0Twq0ZosQgEVY0SqvGpkAUCxkIUYRP4bZRRNi9pvaD+TwXyFseHuYzy/Kt8CWfQ5Ems6C/5y7uZyDEH0Nt8vq0dUx0XzaapPyIIoIi23+47+SrlTvrTjLhKy2wmO95OqiacS+QBH9gAFDlOZnYbrimWOixSZCwUlK+vZd7bXiPldyi0yqX1OtkfCBS/9XAtDKAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDQtMDVUMDQ6NDQ6NDItMDM6MDD+uUN1AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA0LTA1VDA0OjQwOjIzLTAzOjAw5hdZgAAAAABJRU5ErkJggg=="

export const allProcedures = (workspace) => workspace.getAllBlocks().filter(isProcedure)

const getName = (procedureBlock) => procedureBlock.getFieldValue('NAME')

const isProcedure = (block) => block.type === 'procedures_defnoreturn'

export const allProcedureNames = (workspace) => allProcedures(workspace).map(getName)

export const findLegalName = (name, block, index, workspace) => {
    const newName = index === 0 ? name : (name + index)
    return allProcedureNames(workspace).includes(newName) ? findLegalName(name, block, index + 1, workspace) : newName;
}

export const getAvailableName = (block, name) => {
    const isTaken = block.arguments_.some(arg => arg === name);
    return isTaken ? getAvailableName(block, name + "_") : name
}

export const makeProcedureInit = (
    Blockly,
    block,
    withParameters = false,
    defaultName,
    title,
    comment,
    tooltip,
    helpUrl,
) => {
    var defaultLegalName = Blockly.Procedures.findLegalName(defaultName, block);
    var nameField = new Blockly.FieldTextInput(defaultLegalName, Blockly.Procedures.rename);
    nameField.setSpellcheck(false);

    // [!]
    var addParameterButton = new Blockly.FieldImage(
        PLUS,
        16,
        16,
        Blockly.Msg.PROCEDURES_ADD_PARAMETER,
        () => addParameter(block, Blockly, undefined)
    )

    var input = block.appendDummyInput()
        .appendField(title)
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS')

    block.appendStatementInput("STACK").setCheck(null)

    if (withParameters)
        input.appendField(addParameterButton);

    if ((block.workspace.options.comments ||
        (block.workspace.options.parentWorkspace &&
            block.workspace.options.parentWorkspace.options.comments)) &&
        comment) {
        block.setCommentText(comment);
    }
    block.setCommentText(null);
    block.setColour(290);
    block.setTooltip(tooltip);
    block.setHelpUrl(helpUrl);
    block.arguments_ = [];
    block.statementConnection_ = null;

    // [!] adding create call button
    var createCallButton = new Blockly.FieldImage(
        HAND,
        16,
        16,
        "",
        () => createCall(block, Blockly))

    input.appendField(createCallButton);
};

// -----------------------
// [!] Custom context menu
// -----------------------

export const makeProcedureCustomMenu = () => {
    return function (options) {
        // Add options to create getters for each parameter.
        if (!this.isCollapsed()) {
            for (var i = this.arguments_.length - 1; i >= 0; i--) {
                var option = { enabled: true };
                var name = this.arguments_[i];
                option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
                option.callback = createParameterCaller(this, name);

                options.unshift(option);
            }
        }

        // Add option to create caller.
        var option = { enabled: true };
        var name = this.getFieldValue('NAME');
        option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
        var xmlMutation = document.createElement('mutation');
        xmlMutation.setAttribute('name', name);
        for (var i = 0; i < this.arguments_.length; i++) {
            var xmlArg = document.createElement('arg');
            xmlArg.setAttribute('name', this.arguments_[i]);
            xmlMutation.appendChild(xmlArg);
        }
        var xmlBlock = document.createElement('block', null, xmlMutation);
        xmlBlock.setAttribute('type', this.callType_);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.unshift(option); // [!]

        options.pop(); // [!] Remove help
    };
};


export const makeProcedureDomToMutation = () => {
    return function (xmlElement) {
        this.arguments_ = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() == 'arg') {
                this.arguments_.push(childNode.getAttribute('name'));
            }
        }

        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);

        // Show or hide the statement input.
        this.setStatements_(xmlElement.getAttribute('statements') !== 'false');

        this.arguments_.forEach(function (name, i) { // [!]
            addParameter(this, i, name);
        }.bind(this));
    };
}

export const disableContextMenuOptions = (Blockly) => {
    const helpOption = Blockly.ContextMenuRegistry.registry.getItem('blockHelp')
    const duplicateOption = Blockly.ContextMenuRegistry.registry.getItem('blockDuplicate')
    const disableOption = Blockly.ContextMenuRegistry.registry.getItem('blockDisable')

    disableOption.preconditionFn = () => 'disable'
    duplicateOption.preconditionFn = () => 'disable'
    helpOption.preconditionFn = () => 'disabled'

}