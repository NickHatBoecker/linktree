module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/linktree/' : '/',
    css: {
        loaderOptions: {
            scss: {
                // You need an <style lang="scss"> block anywhere with at least one line of code (e.g. comment) for this to work
                prependData: '@import "~@/assets/css/variables.scss";',
            },
        },
    },
}
