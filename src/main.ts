import PinoService from './core/logger/pino.service.js';
import RestApplication from './app/rest.js';

async function bootstrap() {
  const logger = new PinoService();

  const application = new RestApplication(logger);
  await application.init();
}

bootstrap();

