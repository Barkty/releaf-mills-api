import development from "./development";
import production from "./production";
import test from "./test";

export default {
    development,
    test,
    production
}[process.env.WERELEAF_NODE_ENV || 'development'];