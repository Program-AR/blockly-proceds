const createCallerXml = (block) => {
    var name = block.getFieldValue('NAME');
    var xmlMutation = document.createElement('mutation');
    xmlMutation.setAttribute('name', name);

    block.arguments_.forEach((_, i) => {
        var xmlArg = document.createElement('arg');
        xmlArg.setAttribute('name', block.arguments_[i]);
        xmlMutation.appendChild(xmlArg);
    })

    var xmlBlock = document.createElement('block');
    xmlBlock.appendChild(xmlMutation);

    xmlBlock.setAttribute('type', 'procedures_callnoreturn');
    return xmlBlock
}

export const createCall = (self, Blockly) => {

    const block = callbackFactory(self, createCallerXml(self), Blockly)

    try {
        const procedureBlock = self;

        Blockly.Events.disabled_ = 1;
        const posParent = procedureBlock.getRelativeToSurfaceXY();
        const pos = block.getRelativeToSurfaceXY();
        let width = procedureBlock.width;

        block.moveBy(posParent.x - pos.x + width + 16, posParent.y - pos.y + 6);
    } finally {
        Blockly.Events.disabled_ = 0;
    }
}

const callbackFactory = (block, xml, Blockly) => {
    Blockly.Events.disable();
    try {
        var newBlock = Blockly.Xml.domToBlock(xml, block.workspace);
        // Move the new block next to the old block.
        var xy = block.getRelativeToSurfaceXY();
        if (block.RTL) {
            xy.x -= Blockly.SNAP_RADIUS;
        } else {
            xy.x += Blockly.SNAP_RADIUS;
        }
        xy.y += Blockly.SNAP_RADIUS * 2;
        newBlock.moveBy(xy.x, xy.y);
    } finally {
        Blockly.Events.enable();
    }

    newBlock.select();

    return newBlock;
};

export const createParameterCaller = (procedureBlock, name, Blockly) => {
    var xmlField = document.createElement('field')
    xmlField.textContent = name;

    xmlField.setAttribute('name', 'VAR')

    var xmlBlock = document.createElement('block')
    xmlBlock.appendChild(xmlField)
    xmlBlock.setAttribute('type', 'variables_get')

    var block = callbackFactory(procedureBlock, xmlBlock, Blockly);
    block.$parent = procedureBlock.id;

    try {
        Blockly.Events.disabled_ = 1;
        const posParent = procedureBlock.getRelativeToSurfaceXY();
        const pos = block.getRelativeToSurfaceXY();
        let width = procedureBlock.width;

        block.moveBy(posParent.x - pos.x + width + 16, posParent.y - pos.y + 6);
    } finally {
        Blockly.Events.disabled_ = 0;
    }

}