interface Env {
}

declare const nextOnPagesFetch: ExportedHandlerFetchHandler;

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext) {
        // any custom logic goes here
        console.log('My Custom Handler!');
        return nextOnPagesFetch(request, env, ctx);
    }
}