import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import { setLogger } from "react-query";
import { server } from ".msw/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => ({})
});
