import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeName } from 'swagger-themes';

export class Swagger {
  setup(app) {
    const defaultThemeSwagger = process.env.SWAGGER_THEME || 'dark';
    const theme = new SwaggerTheme();

    const config = new DocumentBuilder()
      .setTitle('api-agenda-inteligente-samel')
      .setDescription('The api-agenda-inteligente-samel API description')
      .setVersion('3.0')
      .addTag('api-agenda-inteligente-samel')
      .build();

    const optionsTheme = {
      explorer: true,
      customCss: theme.getBuffer(defaultThemeSwagger as SwaggerThemeName),
    };

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, optionsTheme);
  }
}
