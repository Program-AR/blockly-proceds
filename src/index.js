import 'blockly/blocks';
import { makeProcedureInit, makeProcedureCustomMenu, makeProcedureDomToMutation, disableContextMenuOptions } from './procedures';

export const procedsBlocklyInit = (Blockly) => {

  Blockly.Blocks['procedures_defnoreturn'] = {
    init: function () {
      makeProcedureInit(Blockly, this,
        true,
        Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE,
        Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE,
        Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT,
        Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP,
        Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL
      )

    },
    updateParams_: () => { },
    customContextMenu: makeProcedureCustomMenu(),
    domToMutation: makeProcedureDomToMutation(),

    getProcedureDef: function () {
      return [this.getFieldValue('NAME'), this.arguments_, false];
    },

    isProcedureDef() {
      return true;
    },
    getVars() {
      return this.arguments_;
    }
  };

  disableContextMenuOptions(Blockly)

  let init_base_callnoreturn = Blockly.Blocks.procedures_callnoreturn.init;

  Blockly.Blocks.procedures_callnoreturn.init = function () {
    this.setInputsInline(true);
    init_base_callnoreturn.call(this);
  };

  Blockly.Blocks.procedures_callnoreturn.onchange = function () {
    // requiredAllInputs(this) // TODO: esto tiene que ver con los shadow blocks, hay un issue de esto
  };
}

export const setDefaultLocale = (Blockly) => {
  Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT = 'Describe el procedimiento...';
  Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE = "Hacer algo";
  Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = "Definir";
  Blockly.Msg.PROCEDURES_DEFNORETURN_NOPARAMS = "";
  Blockly.Msg.PROCEDURES_DEFRETURN_NOPARAMS = "";
  Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT = 'Describe la función...';
  Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE = "devolver algo";
  Blockly.Msg.PROCEDURES_DEFRETURN_TITLE = "Definir";
  Blockly.Msg.PROCEDURES_BEFORE_PARAMS = "con";
  Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP = "Crea un procedimiento.";
  Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP = "Crea una función.";
  Blockly.Msg.PROCEDURES_ADD_PARAMETER = "Agregar parámetro";
  Blockly.Msg.PROCEDURES_ADD_PARAMETER_PROMPT = "Ingresa el nombre del parámetro";
  Blockly.Msg.PROCEDURES_REMOVE_PARAMETER = "Quitar parámetro";
  Blockly.Msg.PROCEDURES_PARAMETER = "parámetro";
}