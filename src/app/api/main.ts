
import v1ApiRouter from './v1/main';


export default (app) => {
    // mount apis
    app.use('/api/v1', v1ApiRouter);


}
