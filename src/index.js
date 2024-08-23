import 'blockly/blocks';
import { ObservableProcedureModel } from '@blockly/block-shareable-procedures'

/**
 * TODO:
 * - nombres de parametros cambian pero no actualiza el bloque
 * - parametros al crearlos aparecen con la flechita
 * - no aparecen en el toolbox los callers
 */

const PLUS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAQAAAD2e2DtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfhDAUCCjFLV0NqAAAC60lEQVR42u3dQW7aQABA0Wl7MMjJICeDnIwuqm4qVQrYjMH/Pa/jsfFnTJDwjAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBUP7Y+gClOY4zznX9zHmN8bn3gLHcYtwXbYevDZ5nLost/G7dx2foUeNzyyy+BN7Zs8ncjeHvrvP/NAW9qvff/rueAn1sfwNMcX3hvL2S/3wPcVt7fTl+p/c4AfIsA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4mYHcBinVRdz+v+2tjlHfdrv8lRjHFZcyG3P22VmBPOWQrrsd+WtJ7iOjzkDzQrA5b/XpATmBHAY1ynj7MtxfD1/kDkBrP+RrGHC1ZnxX8Bpwhj7NOGV8z1A3IxbgBvA455+fcwAcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcT9mjLKcevTfFPn5/860AwQ58ehr2wnPw51C3jMccYgcwL48nyAu11nPB3AI2Je1bRHxMz7EPgxjuaBb7mO46zLP3MG+OMwjuM8ecx3cp419f81O4B51v7PY6evlO8B4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQN2fp2G0cV9zXhEVct7HfGeD6wntjisu4rbRdtj4VHnFYLYDD1qfCY9aZA7z/39jyBFz+N7fsRrD7yX+n62H+4zTG3QvWnscYn1sfOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALvzG8Ijm7EmMQYoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTEyLTA1VDAyOjEwOjQ5LTA1OjAwJa2zowAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMi0wNVQwMjoxMDo0OS0wNTowMFTwCx8AAAAASUVORK5CYII="
const MINUS = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAQAAAD2e2DtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfhDAUCCi+xWH4JAAABcUlEQVR42u3c7ZGCMBSG0etuYcTKls7AyrSEVWd4+bjnUECMeSbhD6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBzu4XHm2rUvPekD2yutR57/4itTLXU0/Pvs9SUW5TcDrDUyE3r9Na6ZwZKBWD5PxVKIBPAVGtknGsZibeBTADPyCjXE1idn8A0/gJjXFPgn0sEwIEljgAHwPc2Xx87QHMCaE4AzQmgOQE0J4DmBNCcAJoTQHMCaE4AzQmgOQE0J4DmBNCcAJoTQHMCaE4AzQmgOQE0J4DmBNDcb2SUsfc0T2re/utAO0BzPg49sot8HOoI+M5IDJIJ4OF+gI+F7gpyRcwxxa6Iyb0E3mvYB96y1kgtv2vijubS18QBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAWXq7xrTQhKAi3AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTEyLTA1VDAyOjEwOjQ3LTA1OjAwdZLI/gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMi0wNVQwMjoxMDo0Ny0wNTowMATPcEIAAAAASUVORK5CYII="
const HAND = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfiBAUBKBeKSgeBAAABTElEQVQoz22QzyvDcRjHX5/vvrMyStI2uZgftdVCSpJCyW1y00oUF+Xg4OIkx5VyUyJOsgv/gnJw4YCSSFMyB5pGbLJ99/k8LltreB2f9+v50eOigoc5FvGTJF8pugCwaKaNaE98uf9zMBXwjtNpbvmuaH2B0+HXuuyMEbOlQ4U1M5ZVcYbowg02YfZW5cnE9JIROdI7jsiOacoMPLZdEYPR1ouQkxCRG+feESlIXkQOzLR+NhvCpc3UbPcHAoRsADcAQ0Twq0ZosQgEVY0SqvGpkAUCxkIUYRP4bZRRNi9pvaD+TwXyFseHuYzy/Kt8CWfQ5Ems6C/5y7uZyDEH0Nt8vq0dUx0XzaapPyIIoIi23+47+SrlTvrTjLhKy2wmO95OqiacS+QBH9gAFDlOZnYbrimWOixSZCwUlK+vZd7bXiPldyi0yqX1OtkfCBS/9XAtDKAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDQtMDVUMDQ6NDQ6NDItMDM6MDD+uUN1AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA0LTA1VDA0OjQwOjIzLTAzOjAw5hdZgAAAAABJRU5ErkJggg=="

// -----------------------
// [!] Custom context menu
// -----------------------

const makeProcedureCustomMenu = (withParametersOptions = true) => {
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


const makeProcedureDomToMutation = () => {
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

export const ProcedsBlocklyInit = (Blockly) => {
  Blockly.Blocks['procedures_defnoreturn'] = {
    init: function () {
      console.log('paso por aca init')
      makeProcedureInit(Blockly, this,
        true,
        Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE,
        Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE,
        Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT,
        Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP,
        Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL
      )

      this.model = new ObservableProcedureModel(this.workspace, Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE);
      this.workspace.getProcedureMap().add(this.model);
    },
    updateParams_: () => { },
    customContextMenu: makeProcedureCustomMenu(),
    //domToMutation: makeProcedureDomToMutation(),  // se quita el custom

    getProcedureDef: function () {
      console.log('paso por aca getProcedureDef')
      return [this.getFieldValue('NAME'), this.arguments_, false];
    },

    getProcedureModel() {
      console.log('paso por aca getProcedureModel')
      console.log(this.model)
      return this.model;
    },

    isProcedureDef() {
      console.log('paso por aca isproceduredef')
      return true;
    },
    getVarModels() {
      // If your procedure references variables
      // then you should return those models here.
      console.log('paso por aca var models')
      return ['a','b'];
    },
    doProcedureUpdate() {
      console.log('paso por aca doprocedureUpdate')
      console.log('getName', this.model.getName());
      this.setFieldValue(this.model.getName(), 'NAME');

      console.log('getParameters', this.model.getParameters());
      console.log('getArguments', this.arguments_);
      this.setFieldValue(
        this.model.getParameters()
          .map((p) => p.getName())
          .join(','), 'PARAMS');
    },
    

    // de la documentacion de blockly para la serializacion - saveextrastate y loadextrastate
    /*
        saveExtraState(doFullSerialization) {
          const state = Object.create(null);
          state['procedureId'] = this.model.getId();
      
          if (doFullSerialization) {
            state['name'] = this.model.getName();
            state['parameters'] = this.model.getParameters().map((p) => {
              return {name: p.getName(), id: p.getId()};
            });
            state['returnTypes'] = this.model.getReturnTypes();
      
            // Flag for deserialization.
            state['createNewModel'] = true;
          }
      
          return state;
        },
      
        loadExtraState(state) {
          const id = state['procedureId']
          const map = this.workspace.getProcedureMap();
      
          if (map.has(id) && !state['createNewModel']) {
            // Delete the existing model (created in init).
            map.delete(this.model.getId());
            // Grab a reference to the model we're supposed to reference.
            this.model = map.get(id);
            this.doProcedureUpdate();
            return;
          }
      
          // There is no existing procedure model (we are likely pasting), so
          // generate it from JSON.
          this.model
              .setName(state['name'])
              .setReturnTypes(state['returnTypes']);
          for (const [i, param] of state['parameters'].entries()) {
            this.model.insertParameter(
                new ObservableParameterModel(
                    this.workspace, param['name'], param['id']), i );
          }
          this.doProcedureUpdate();
        },
    
    */

    destroy: function () {
      console.log('paso por aca destroy')
      if (this.isInsertionMarker()) return;
      try {
        Blockly.getMainWorkspace().getProcedureMap().delete(this.model.getId());
      }
      catch (error) {
        console.log(error)
      }
      this.doProcedureUpdate()
    }
  };

/*
  Blockly.Blocks['procedures_callnoreturn'] = {
//      init: Blockly.Blocks['procedures_callreturn'].init,
      init: function () {
        makeProcedureInit(Blockly, this,
          true,
          Blockly.Msg.PROCEDURES_CALLNORETURN_PROCEDURE,
          Blockly.Msg.PROCEDURES_CALLNORETURN_TITLE,
          Blockly.Msg.PROCEDURES_CALLNORETURN_COMMENT,
          Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP,
          Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL
        )
  
        //this.model = new ObservableProcedureModel(this.workspace, Blockly.Msg.PROCEDURES_CALLNORETURN_PROCEDURE);
        //this.workspace.getProcedureMap().add(this.model);
      },
      updateParams_: () => { },
      customContextMenu: makeProcedureCustomMenu(),
      //domToMutation: makeProcedureDomToMutation(),  // se quita el custom
  
  
      getProcedureModel() {
        return this.model;
      },
  
      isProcedureDef() {
        return false;
      },
      getVarModels() {
        // If your procedure references variables
        // then you should return those models here.
        return [];
      },
      doProcedureUpdate() {
        
        this.setFieldValue(this.model.getName(), 'NAME');
  
  
        this.setFieldValue(
          this.model.getParameters()
            .map((p) => p.getName())
            .join(','), 'PARAMS');
      },
      destroy: function () {
        if (this.isInsertionMarker()) return;
        try {
          Blockly.getMainWorkspace().getProcedureMap().delete(this.model.getId());
        }
        catch (error) {
          console.log(error)
        }
        this.doProcedureUpdate()
      }
    };
*/
  disableContextMenuOptions(Blockly)

}

const disableContextMenuOptions = (Blockly) => {
  const helpOption = Blockly.ContextMenuRegistry.registry.getItem('blockHelp')
  const duplicateOption = Blockly.ContextMenuRegistry.registry.getItem('blockDuplicate')
  const disableOption = Blockly.ContextMenuRegistry.registry.getItem('blockDisable')

  disableOption.preconditionFn = () => 'disable'
  duplicateOption.preconditionFn = () => 'disable'
  helpOption.preconditionFn = () => 'disabled'

}

export const allProcedures = (workspace) => workspace.getAllBlocks().filter(isProcedure)

const getName = (procedureBlock) => procedureBlock.getFieldValue('NAME')

//const isProcedure = (block) => block.type === 'Procedimiento'
const isProcedure = (block) => block.type === 'procedures_defnoreturn'

export const allProcedureNames = (workspace) => allProcedures(workspace).map(getName)

export const findLegalName = (name, block, index, workspace) => {
  const newName = index === 0 ? name : (name + index)
  return allProcedureNames(workspace).includes(newName) ? findLegalName(name, block, index + 1, workspace) : newName;
}

const makeProcedureInit = (
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

const getAvailableName = (block, name) => {
  const isTaken = block.arguments_.some(arg => arg === name);
  return isTaken ? getAvailableName(block, name + "_") : name
}

const addParameter = (self, Blockly, argName) => {
  const argsAmount = self.arguments_.length
  const defaultName = argName || Blockly.Msg.PROCEDURES_PARAMETER + " " + (argsAmount + 1);
  const name = getAvailableName(self, defaultName);
  const id = "INPUTARG" + argsAmount;

  self.arguments_.push(name);
  self.updateParams_();

  var blocks = self.workspace.getAllBlocks();
  blocks.forEach(block => {
    console.log('block.type ', block.type, self.arguments_)
    //console.log('getprocedurecall', block.getProcedureCall());
    console.log('selfgetproceduredef', self.getProcedureDef()[0]);
    if (block.type === self.callType_ && block.getProcedureCall() === self.getProcedureDef()[0]) {
      block.arguments_.push(name);
      block.updateShape_();
    }
  })

  const callers = Blockly.Procedures.getCallers(self.getFieldValue('NAME'), self.workspace);

  callers.forEach(caller => {
    caller.arguments_.push(name);
    caller.updateShape_()
  })

  /// insertParameter from blockly documentation
  /*
    self.model.insertParameter(new ObservableParameterModel(
        self.workspace, name));
  */


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
    const oldName = self.arguments_[argsAmount];

    if (oldName !== newName)
      newName = getAvailableName(self, newName);

    self.arguments_[argsAmount] = newName;

    callers.forEach(caller => {
      caller.arguments_ = caller.arguments_.map(argName => argName === oldName ? newName : argName)
      caller.updateShape_()
    })

    const varBlocks = self.workspace.getAllBlocks().filter(block => { console.log('varBlocks'); return (block.type === "variables_get" && block.$parent === self.id) })

    varBlocks.forEach(varBlock => {
      console.log('varblocks ? ')
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


  /// deleteParameter from blockly documentation
  /*
  self.model.getParameters(); // toma todos los parametros del procedimiento
  self.model.deleteParameter(index); // borra el parametro de la posicion index
  */

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

const createCall = (self, Blockly) => {

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

const createParameterCaller = (procedureBlock, name, Blockly) => {
  console.log('createParameterCaller')
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