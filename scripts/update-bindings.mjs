import ts from 'typescript';
import { basename } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import Mustache from 'mustache';
import { camelCase, constantCase } from 'change-case';

const config = {
  sourceTypings: [
    {
      path: 'node_modules/gridjs/dist/src/config.d.ts',
      importPath: 'gridjs',
      bindingTypes: 'input',
    },
    {
      path: 'node_modules/gridjs/dist/src/events.d.ts',
      importPath: 'gridjs/dist/src/events',
      bindingTypes: 'output',
    },
  ],
  bindingClassTemplate: 'scripts/gridjs-binding-base.mustache',
  outputPath: 'packages/gridjs-angular/src/lib/gridjs-binding-base.ts',
};

const mustacheHelpers = {
  camelCase: () => (text, render) => camelCase(render(text)),
  constantCase: () => (text, render) => constantCase(render(text)),
  noTrailingComma: () => (text, render) => {
    const result = render(text);
    return result.endsWith(',') ? result.slice(0, -1) : result;
  },
};
const template = readFileSync(config.bindingClassTemplate, 'utf-8');

const types = extractTypeInformation(config.sourceTypings);

const contents = Mustache.render(template, {
  inputTypes: types.filter((t) => t.bindingTypes === 'input'),
  outputTypes: types.filter((t) => t.bindingTypes === 'output'),
  ...mustacheHelpers,
});
writeFileSync(config.outputPath, contents);

function extractTypeInformation(sourceTypings) {
  return sourceTypings.map(({ path, bindingTypes, importPath }) => {
    const program = ts.createProgram({
      rootNames: [path],
      options: {},
    });
    const checker = program.getTypeChecker();
    const sourceFile = program.getSourceFile(path);
    if (!sourceFile) {
      return;
    }

    return ts.forEachChild(sourceFile, (node) => {
      if (ts.isInterfaceDeclaration(node)) {
        const symbol = checker.getSymbolAtLocation(node.name);
        if (!symbol) {
          return;
        }

        const name = symbol.getName();
        const members = [...symbol.members.entries()]
          .map((m) => ({
            name: m[0],
            valueDeclaration: m[1].valueDeclaration,
          }))
          .filter(
            (m) => m.valueDeclaration?.kind === ts.SyntaxKind.PropertySignature,
          )
          .map((m) => m.name);
        return {
          typeName: name,
          bindingTypes,
          importPath,
          members,
        };
      } else if (ts.isTypeAliasDeclaration(node)) { // export type GridEvents = ContainerEvents & TableEvents;
        const srcType = checker.getTypeAtLocation(node);
        if (srcType.isIntersection()) {
          const members = [];
          srcType.types.forEach((t) => {
            const symbol = t.getSymbol();
            if (!symbol) {
              console.warn('No symbol found for type', t);
              return;
            }
            const declaration = symbol.getDeclarations()?.[0];
            if (ts.isInterfaceDeclaration(declaration)) { // ContainerEvents & TableEvents are both interfaces
              declaration.members.forEach(m => members.push(m.name?.getText()));
            }
          });

          return {
            typeName: node.name.getText(),
            bindingTypes,
            importPath,
            members,
          };
        }
        
        // const symbol = checker.getSymbolAtLocation(node.name);
        // if (!symbol) {
        //   return;
        // }

        // const name = symbol.getName();
        // const members = [...symbol.members.entries()]
        //   .map((m) => ({ name: m[0], valueDeclaration: m[1].valueDeclaration }))
        //   .filter(
        //     (m) => m.valueDeclaration?.kind === ts.SyntaxKind.PropertySignature,
        //   )
        //   .map((m) => m.name);
        // interfaces.push({
        //   interfaceName: name,
        //   members,
        // });
      }
    });
  });
}
