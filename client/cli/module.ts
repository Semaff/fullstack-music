/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");

const args = minimist(process.argv);
const modulesPath = path.resolve(__dirname, "..", "src", "modules");

const moduleName = args.name;
const moduleProps = moduleName + "Props";
const modulePath = modulesPath + "\\" + moduleName;

const uiPath = path.resolve(modulePath, "ui");
const typesPath = path.resolve(modulePath, "types");
const apiPath = path.resolve(modulePath, "api");

/* Creating directories for module (dir) */
if (fs.existsSync(modulePath))
  throw new Error("Can't create new module because module with that name already exists");
fs.mkdirSync(modulePath);

fs.mkdirSync(uiPath);
fs.mkdirSync(typesPath);
fs.mkdirSync(apiPath);

/* Creating first module ui component (tsx) */
const moduleCode = `import React from "react";

interface ${moduleProps} {}

const ${moduleName} = ({}: ${moduleProps}) => {
  return <></>;
};

export default ${moduleName};
`;

fs.writeFileSync(uiPath + "\\" + `${moduleName}.tsx`, moduleCode);

/* Creating story (stories) */
const storyCode = `import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ${moduleName} from "./${moduleName}";

export default {
  title: "Components/${moduleName}",
  component: ${moduleName}
} as ComponentMeta<typeof ${moduleName}>;

const Template: ComponentStory<typeof ${moduleName}> = () => <${moduleName} />;

export const Default = Template.bind({});
Default.args = {};
`;

fs.writeFileSync(uiPath + "\\" + `${moduleName}.stories.tsx`, storyCode);

/* Creating unit test (jest) */
const unitTestCode = `import ${moduleName} from "./${moduleName}";
import { cleanup } from "@testing-library/react";
import { renderWithClient } from "../../../../helpers/renderWithClient";

describe("${moduleName}", () => {
  afterEach(cleanup);

  it("Renders successfully", async () => {
    renderWithClient(<${moduleName} />);
  });
});
`;

fs.writeFileSync(uiPath + "\\" + `${moduleName}.test.tsx`, unitTestCode);

/* Create Interface */
const interfaceCode = `export interface I${moduleName} {}
`;
fs.writeFileSync(typesPath + "\\" + `I${moduleName}.ts`, interfaceCode);

/* Create API */
const createModuleRequest = `import { request } from "api/requests";

export interface Create${moduleName}Body {}

export const create${moduleName} = async (body: Create${moduleName}Body) => {
  const response = await request.post("${moduleName.toLowerCase()}", body);
  return response.data;
};
`;

const updateModuleRequest = `import { request } from "api/requests";

export interface Update${moduleName}Body {}

export const update${moduleName} = async (body: Update${moduleName}Body) => {
  const response = await request.patch("${moduleName.toLowerCase()}", body);
  return response.data;
};
`;

const deleteModuleRequest = `import { request } from "api/requests";

export const delete${moduleName} = async () => {
  const response = await request.delete("${moduleName.toLowerCase()}");
  return response.data;
};
`;

fs.writeFileSync(apiPath + "\\" + `create${moduleName}.ts`, createModuleRequest);
fs.writeFileSync(apiPath + "\\" + `update${moduleName}.ts`, updateModuleRequest);
fs.writeFileSync(apiPath + "\\" + `delete${moduleName}.ts`, deleteModuleRequest);

/* Make this file to be 'Module' */
export {};
