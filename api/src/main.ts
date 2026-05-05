import { app } from '@src/app.js';


function bootstrap() {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
}

bootstrap();
