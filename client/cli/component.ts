/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");

const args = minimist(process.argv);
const componentFolderPath = path.resolve(__dirname, "..", "src", "components");

const componentName = args.name;
const componentInterface = componentName + "Props";
const componentPath = componentFolderPath + "\\" + componentName;

/* Creating directories for component (dir) */
if (fs.existsSync(componentPath))
  throw new Error("Can't create new component because component with that name already exists");
fs.mkdirSync(componentPath);

/* Creating component (tsx) */
const componentCode = `import React from "react";

interface ${componentInterface} {}

const ${componentName} = ({}: ${componentInterface}) => {
  return <></>;
};

export default ${componentName};
`;

fs.writeFileSync(path.resolve(componentPath, `${componentName}.tsx`), componentCode);

/* Creating story (stories) */
const storyCode = `import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ${componentName} from "./${componentName}";

export default {
  title: "Components/${componentName}",
  component: ${componentName}
} as ComponentMeta<typeof ${componentName}>;

const Template: ComponentStory<typeof ${componentName}> = () => <${componentName} />;

export const Default = Template.bind({});
Default.args = {};
`;

fs.writeFileSync(path.resolve(componentPath, `${componentName}.stories.tsx`), storyCode);

/* Creating unit test (jest) */
const unitTestCode = `import ${componentName} from "./${componentName}";
import { cleanup } from "@testing-library/react";
import { renderWithClient } from "../../../helpers/renderWithClient";

describe("${componentName}", () => {
  afterEach(cleanup);

  it("Renders successfully", async () => {
    renderWithClient(<${componentName} />);
  });
});
`;

fs.writeFileSync(path.resolve(componentPath, `${componentName}.test.tsx`), unitTestCode);

/* Make this file to be 'Module' */
export {};
