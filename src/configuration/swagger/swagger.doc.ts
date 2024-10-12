import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
  .setTitle("Blog API")
  .setDescription("Descriptions")
  .setLicense("MIT", "http://localhost:3000")
  .setVersion("1.0")
  .build();
