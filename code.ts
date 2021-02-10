const layers = figma.currentPage.findAll();
// figma.currentPage.selection = layers;
const { selection } = figma.currentPage;

function hasValidSelection(nodes) {
  return !(!nodes || nodes.length === 0);
}

const settings = [
  { format: "PNG", suffix: "@1x", constraint: { type: "SCALE", value: 1 } },
  { format: "PNG", suffix: "@2x", constraint: { type: "SCALE", value: 2 } },
  { format: "PNG", suffix: "@3x", constraint: { type: "SCALE", value: 3 } },
  { format: "SVG", suffix: "" },
];

async function main(nodes): Promise<string> {
  if (!hasValidSelection(nodes)) return Promise.resolve("No valid selection");

  for (let node of nodes) {
    node.exportSettings = settings;
  }

  return Promise.resolve("Done!");
}

main(selection).then((res) => figma.closePlugin(res));
