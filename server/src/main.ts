import helmet from "helmet";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  /* Protection */
  app.use(helmet());

  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: "http://localhost:3000" });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
}

bootstrap();
