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
figma.currentPage.selection = layers;
const { selection } = figma.currentPage;
function hasValidSelection(nodes) {
    return !(!nodes || nodes.length === 0);
}
const settings = [
    { format: "PNG", suffix: "@1x", constraint: { type: "SCALE", value: 1 } },
    { format: "PNG", suffix: "@2x", constraint: { type: "SCALE", value: 2 } },
    { format: "SVG", suffix: "" },
];
function main(nodes) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!hasValidSelection(nodes))
            return Promise.resolve("No valid selection");
        for (let node of nodes) {
            node.exportSettings = settings;
        }
        return Promise.resolve("Done!");
    });
}
main(selection).then((res) => figma.closePlugin(res));
