¡Hola! :vulcan_salute: Este es un proyecto relacionado a [Pilas Bloques](https://pilasbloques.program.ar) :heart:. En el repositorio de ese proyecto encontrarás las guías sobre [cómo contribuir](https://github.com/Program-AR/pilas-bloques-app/blob/develop/CONTRIBUTING.md) y el [código de conducta](https://github.com/Program-AR/pilas-bloques-app/blob/develop/CODE_OF_CONDUCT.md), que son guías que aplican también a este proyecto.

Hi! :vulcan_salute: This is a project related to [Pilas Bloques](https://pilasbloques.program.ar) :heart:. In that project's repository you'll find the [contribution guidelines](https://github.com/Program-AR/pilas-bloques-app/blob/develop/CONTRIBUTING_en.md) and the [code of conduct](https://github.com/Program-AR/pilas-bloques-app/blob/develop/CODE_OF_CONDUCT_en.md) which also apply to this project.

# Blockly Proceds

This Blockly plugin installs new custom procedures for blockly, with custom modifications:
- The parameters now can be easily added and removed with buttons, replacing the mutator popup.
- The arguments (`variables_get`) are associated with the procedure. All this blocks now have a `$parent` field with the id of the procedure where they belong. **For this to work, you must save this `$parent` in the mutation of `variables_get`**.
- The 'help' option was removed from the context menu.
- Procedure descriptions are disabled by default.

## Usage

If you desire to use a different language than Spanish,  you can define your own translations for the needed blocks using `Blockly.Msg`, for example:

```javascript
Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT = 'your translation';
```

Then proceed to call `procedsBlocklyInit()` to load these new translations. Otherwise, you can use the default language by calling `setDefacultLocale()`: