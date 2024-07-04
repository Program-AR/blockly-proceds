import 'blockly/blocks';
import * as Blockly from 'blockly/core'

export class BlocklyProceds {
  /**
   * Constructor for ...
   * @param {!Blockly.WorkspaceSvg} workspace The workspace that the plugin will
   *     be added to.
   */
  constructor(workspace) {
    /**
     * The workspace.
     * @type {!Blockly.WorkspaceSvg}
     * @protected
     */
    this.workspace = workspace;
  }

  /**
   * Initialize.
   */
  init() {

    Blockly.Blocks['procedures_defnoreturn'] = {
      init: function () {
        this.makeProcedureInit(this,
          true,
          Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE,
          Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE,
          Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT,
          Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP,
          Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL
        )
      },

      /*     customContextMenu: makeProcedureCustomMenu(),
          updateParams_: makeUpdateParams(),
          domToMutation: makeProcedureDomToMutation(), */
    };

  }


  makeProcedureInit = function (
    block,
    withParameters = false,
    defaultName,
    title,
    comment,
    tooltip,
    helpUrl,
  ) {

    var defaultLegalName = Blockly.Procedures.findLegalName(defaultName, block);
    var nameField = new Blockly.FieldTextInput(defaultLegalName, Blockly.Procedures.rename);
    nameField.setSpellcheck(false);

    // [!]
    var addParameterButton = new Blockly.FieldImage(
      PLUS,
      16,
      16,
      Blockly.Msg.PROCEDURES_ADD_PARAMETER,
      function () { this.addParameter(block) }
    )

    var input = block.appendDummyInput()
      .appendField(title)
      .appendField(nameField, 'NAME')
      .appendField('', 'PARAMS')

    block.appendStatementInput("DO").setCheck(null)

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
    //block.arguments_ = [];
    //block.statementConnection_ = null;

    // [!] adding create call button
    var createCallButton = new Blockly.FieldImage(
      HAND,
      16,
      16,
      "",
      function () {
      }
    );
    input.appendField(createCallButton);
  };

  getAvailableName = (block, name) => {
    const isTaken = block.getVars().some(arg => arg === name);
    return isTaken ? this.getAvailableName(name + "_") : name
  }


  addParameter = (self) => {
    const argsAmount = self.getVars()
    const defaultName = Blockly.Msg.PROCEDURES_PARAMETER + " " + (argsAmount + 1);
    const name = this.getAvailableName(self, defaultName);
    const id = "INPUTARG" + argsAmount;

    self.arguments_.push(name);
    self.updateParams_();

    const callers = Blockly.Procedures.getCallers(self.getProcedureDef()[0], self.workspace);
    callers.forEach(caller => {
      caller.arguments_.push(name);
      caller.updateShape_()
    })

    const createCallButton = new Blockly.FieldImage(
      ProcedsBlockly.HAND,
      16,
      16,
      Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name),
      function () {
        // createParameterCaller(self, self.getVars()[argsAmount])();
      }
    );

    const removeParameterButton = new Blockly.FieldImage(
      ProcedsBlockly.MINUS,
      16,
      16,
      Blockly.Msg.PROCEDURES_REMOVE_PARAMETER,
      function () {
        /*         for (var j = 0; j < self.arguments_.length; j++)
                  self.removeInput("INPUTARG" + j);
                self.arguments_.splice(i, 1);
                self.arguments_.forEach(function(name, i) {
                  addParameter(this, i, name, true);
                }.bind(self));
          
                var blocks = self.workspace.getAllBlocks();
                for (block of blocks)
                  if (block.type === self.callType_ && block.getProcedureCall() === self.getProcedureDef()[0]) {
                    block.arguments_.splice(i, 1);
                    block.updateShape_();
                  } */
      }
    );

    const nameField = new Blockly.FieldTextInput(name, function (newName) {
      const oldName = self.getVars()[argsAmount];

      if (oldName !== newName)
        newName = getAvailableName(self, newName);

      self.arguments_[argsAmount] = newName;

      callers.forEach(caller => {
        caller.arguments_ = caller.arguments_.map(argName => argName === oldName ? newName : argName)
        caller.updateShape_()
      })

      const varBlocks = self.workspace.getAllBlocks().filter(block.type === "variables_get" && block.$parent === self.id)
      varBlocks.forEach(varBlock => {
        var varField = varBlock.getField("VAR");
        if (varField.getValue() === oldName) {
          varField.setValue(newName);
        }
      })

      return newName;
    });

    self
      .appendDummyInput(id)
      .appendField(Blockly.Msg.PROCEDURES_BEFORE_PARAMS)
      .appendField(nameField, 'ARG' + i)
      .appendField(createCallButton)
      .appendField(removeParameterButton);

    self.moveInputBefore(id, 'STACK');
  };
}
