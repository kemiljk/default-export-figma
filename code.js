var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const layers = figma.currentPage.findAll();
const { selection } = figma.currentPage;
figma.parameters.on('input', ({ key, query, result }) => {
    switch (key) {
        case 'size':
            const sizes = ['1x', '2x', '3x', '4x'];
            result.setSuggestions(sizes.filter((s) => s.includes(query)));
            break;
        case 'format':
            const formats = ['PNG', 'SVG', 'PDF', 'JPG'];
            result.setSuggestions(formats.filter((s) => s.includes(query)));
            break;
        case 'preset':
            const presets = ['Min', 'Default', 'Max', 'iOS', 'Android'];
            result.setSuggestions(presets.filter((s) => s.includes(query)));
            break;
        default:
            return;
    }
});
figma.on('run', ({ parameters }) => {
    var _a, _b;
    const size = parameters.size ? Number(parameters.size.replaceAll('x', '')) : null;
    handleExport((_a = parameters.format) !== null && _a !== void 0 ? _a : null, size, (_b = parameters.preset) !== null && _b !== void 0 ? _b : null);
});
function hasValidSelection(nodes) {
    return !(!nodes || nodes.length === 0);
}
// if (figma.command === 'min') {
//   const settings = [
//     { format: 'PNG', suffix: '@1x', constraint: { type: 'SCALE', value: 1 } },
//     { format: 'PNG', suffix: '@2x', constraint: { type: 'SCALE', value: 2 } },
//     { format: 'SVG', suffix: '' },
//   ];
//   async function min(nodes): Promise<string> {
//     if (!hasValidSelection(nodes)) return Promise.resolve('No valid selection');
//     for (let node of nodes) {
//       node.exportSettings = settings;
//     }
//     return Promise.resolve('Done!');
//   }
//   if (selection.length === 0) {
//     min(layers).then((res) => figma.closePlugin(res));
//   } else if (selection.length > 0) {
//     min(selection).then((res) => figma.closePlugin(res));
//   }
// }
// if (figma.command === 'default') {
//   const settings = [
//     { format: 'PNG', suffix: '@2x', constraint: { type: 'SCALE', value: 2 } },
//     { format: 'PNG', suffix: '@3x', constraint: { type: 'SCALE', value: 3 } },
//     { format: 'SVG', suffix: '' },
//   ];
//   async function defaultExport(nodes): Promise<string> {
//     if (!hasValidSelection(nodes)) return Promise.resolve('No valid selection');
//     for (let node of nodes) {
//       node.exportSettings = settings;
//     }
//     return Promise.resolve('Done!');
//   }
//   if (selection.length === 0) {
//     defaultExport(layers).then((res) => figma.closePlugin(res));
//   } else if (selection.length > 0) {
//     defaultExport(selection).then((res) => figma.closePlugin(res));
//   }
// }
// if (figma.command === 'max') {
//   const settings = [
//     { format: 'PNG', suffix: '@1x', constraint: { type: 'SCALE', value: 1 } },
//     { format: 'PNG', suffix: '@2x', constraint: { type: 'SCALE', value: 2 } },
//     { format: 'PNG', suffix: '@3x', constraint: { type: 'SCALE', value: 3 } },
//     { format: 'SVG', suffix: '' },
//   ];
//   async function max(nodes): Promise<string> {
//     if (!hasValidSelection(nodes)) return Promise.resolve('No valid selection');
//     for (let node of nodes) {
//       node.exportSettings = settings;
//     }
//     return Promise.resolve('Done!');
//   }
//   if (selection.length === 0) {
//     max(layers).then((res) => figma.closePlugin(res));
//   } else if (selection.length > 0) {
//     max(selection).then((res) => figma.closePlugin(res));
//   }
// }
// if (figma.command === 'ios') {
//   const settings = [
//     { format: 'PNG', suffix: '@2x', constraint: { type: 'SCALE', value: 2 } },
//     { format: 'PNG', suffix: '@3x', constraint: { type: 'SCALE', value: 3 } },
//     { format: 'SVG', suffix: '' },
//   ];
//   async function iOS(nodes): Promise<string> {
//     if (!hasValidSelection(nodes)) return Promise.resolve('No valid selection');
//     for (let node of nodes) {
//       node.exportSettings = settings;
//     }
//     return Promise.resolve('Done!');
//   }
//   if (selection.length === 0) {
//     iOS(layers).then((res) => figma.closePlugin(res));
//   } else if (selection.length > 0) {
//     iOS(selection).then((res) => figma.closePlugin(res));
//   }
// }
// if (figma.command === 'android') {
//   const settings = [
//     { format: 'PNG', suffix: '@2x', constraint: { type: 'SCALE', value: 2 } },
//     { format: 'SVG', suffix: '' },
//   ];
//   async function android(nodes): Promise<string> {
//     if (!hasValidSelection(nodes)) return Promise.resolve('No valid selection');
//     for (let node of nodes) {
//       node.exportSettings = settings;
//     }
//     return Promise.resolve('Done!');
//   }
//   if (selection.length === 0) {
//     android(layers).then((res) => figma.closePlugin(res));
//   } else if (selection.length > 0) {
//     android(selection).then((res) => figma.closePlugin(res));
//   }
// }
function handleExport(format, size, preset) {
    let settings = [];
    if (preset === null) {
        settings = [{ format: format, suffix: `format !== 'SVG' || format !== 'PNG' ? @${String(size)}x : ''`, constraint: { type: 'SCALE', value: size } }];
    }
    if (preset.toLocaleLowerCase() === 'min') {
        settings = [
            { format: 'PNG', suffix: '@1x', constraint: { type: 'SCALE', value: 1 } },
            { format: 'PNG', suffix: '@2x', constraint: { type: 'SCALE', value: 2 } },
            { format: 'SVG', suffix: '' },
        ];
    }
    else if (preset.toLocaleLowerCase() === 'max') {
        settings = [
            { format: 'PNG', suffix: '@2x', constraint: { type: 'SCALE', value: 2 } },
            { format: 'PNG', suffix: '@3x', constraint: { type: 'SCALE', value: 3 } },
            { format: 'SVG', suffix: '' },
        ];
    }
    else if (preset.toLocaleLowerCase() === 'ios') {
        settings = [
            { format: 'PNG', suffix: '@2x', constraint: { type: 'SCALE', value: 2 } },
            { format: 'PNG', suffix: '@3x', constraint: { type: 'SCALE', value: 3 } },
            { format: 'SVG', suffix: '' },
        ];
    }
    else if (preset.toLocaleLowerCase() === 'android') {
        settings = [
            { format: 'PNG', suffix: '@2x', constraint: { type: 'SCALE', value: 2 } },
            { format: 'SVG', suffix: '' },
        ];
    }
    else if (preset.toLocaleLowerCase() === 'default') {
        settings = [
            { format: 'PNG', suffix: '@2x', constraint: { type: 'SCALE', value: 2 } },
            { format: 'SVG', suffix: '' },
        ];
    }
    console.log(format, size, preset, settings);
    function set(nodes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hasValidSelection(nodes))
                return Promise.resolve('No valid selection');
            for (let node of nodes) {
                node.exportSettings = preset !== null ? settings : [...node.exportSettings, ...settings];
            }
            return Promise.resolve('Done!');
        });
    }
    if (selection.length === 0) {
        set(layers).then((res) => figma.closePlugin(res));
    }
    else if (selection.length > 0) {
        set(selection).then((res) => figma.closePlugin(res));
    }
    return set;
}
