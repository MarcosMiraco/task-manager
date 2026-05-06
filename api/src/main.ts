import { app } from '@src/app.js';
import { connectDatabase } from '@database/connections.js';


function bootstrap() {
    try {
        connectDatabase()
    }
    catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }

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
