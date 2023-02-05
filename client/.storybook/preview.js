import { initialize, mswDecorator } from "msw-storybook-addon";
import { handlers } from "../.msw/handlers";

initialize();

export const decorators = [mswDecorator];

export const parameters = {
  msw: { handlers },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  options: {
    storySort: (a, b) => {
      if (a[1].kind.split("/").length > b[1].kind.split("/").length) {
        return 1;
      }

      return a[1].name.localeCompare(b[1].name);
    }
  }
};
