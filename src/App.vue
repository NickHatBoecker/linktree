<template>
    <div id="app" class="fullheight">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style lang="scss">
    * { box-sizing: border-box; }

    html, body {
        margin: 0;
        padding: 0;
        min-height: 100%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-weight: 500;
        -webkit-font-smoothing: antialiased;
    }

    body {
        background: $secondary;
        background-image: url('./assets/background.jpg');
        padding: $spacing-unit*4 $spacing-unit*2;

        @media (min-width: $breakpointLg) {
            padding-top: $spacing-unit*12;
        }
    }

    .u-text-center {
        text-align: center;
    }

    .u-text-white {
        color: #fff;
    }

    .u-text-primary {
        color: $primary;
    }

    .u-help {
        display: block;
        font-style: italic;
        color: #ddd;
        margin-bottom: $spacing-unit;
    }

    .fullheight {
        height: 100%;
    }

    .full-width {
        width: 100%;
    }

    .page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 48px;
    }

    .pb-0 {
        padding-bottom: 0 !important;
    }

    .mb-8 {
        margin-bottom: $spacing-unit * 8;
    }

    .mt-36 {
        margin-top: $spacing-unit-36;
    }

    form { color: $white; }

    label { display: block; }

    label + input, label + select, label + textarea {
        margin-top: 6px;
    }

    .form-group { margin-bottom: 24px; }

    .form-control { width: 100%; height: 40px; padding: 6px; }

    .btn {
        height: 40px;
        cursor: pointer;
        font-size: 16px;

        &:hover {
            background-color: darken(#fff, 20%);
        }
    }

    .btn-submit {
        background-color: orange;

        &:hover {
            background-color: darken(orange, 10%);
        }
    }

    .btn-danger {
        background-color: red;
        color: $white;

        &:hover {
            background-color: darken(red, 10%);
        }
    }

    .btn-link {
        background-color: orange;
        color: $black;
        text-decoration: none;
        padding: 6px;

        &:hover {
            background-color: darken(orange, 10%);
        }
    }

    .container {
        width: 50%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .u-flex {
        display: flex;

        &--column {
            flex-direction: column;
        }

        &--horizontal-center {
            align-items: center;
        }
    }

    .table--hover tbody tr { cursor: pointer; }
    th { text-align: left; background: $black; }
    th, td { border: 1px solid $white; }
    .table--hover tr:hover td { background-color: rgba(orange, 0.2); }

    input[readonly] { background-color: #a2a2a2; color: #444; }
</style>
