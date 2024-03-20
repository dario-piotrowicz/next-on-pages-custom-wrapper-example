export default {
    async fetch(request, env, ctx) {
        // any custom logic goes here
        console.log('My Custom Handler!');
        return nextOnPagesFetch(request, env, ctx);
    }
}