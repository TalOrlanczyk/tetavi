import { inspect } from "util";
import { Sequelize } from "sequelize-typescript";

const replaceAt = (text: string, index, replacement) =>
    text.substr(0, index) + replacement + text.substr(index + replacement.length);

const privaci = (text: string): string => {
    if (text === undefined || text === null) { return null; }

    text = text.toString();
    if (text == '') { return ''; }
    if (text.length == 1) { return '*'; }

    let times = Math.floor(text.length / 2)
    return replaceAt(text, times, '*'.repeat(text.length - times));
}

export default class DatabaseConnection extends Sequelize {
    constructor(credentials: any, logger: Console) {
        const IGNORED_ARGS = []

        const SENSITIVE_ARGS = [];

        const FILTERED_ARGS = [];

        let filteredValues = new Set();
        let sensitivedValues = new Set();

        const logging = (queryString, queryObject) => {
            if (queryObject.instance != null)  {
                logger.debug(inspect(queryString));
            }

            if (queryObject.instance) {
                let boundedArgs = [];

                filteredValues.clear();
                sensitivedValues.clear();

                for (const key in queryObject.instance.dataValues) {
                    if (!IGNORED_ARGS.includes(key)) {
                        let value = queryObject.instance.dataValues[key]?.toString();

                        if (value) {
                            if (SENSITIVE_ARGS.includes(key) || value.includes("@")) {
                                sensitivedValues.add(value)
                            } else if (FILTERED_ARGS.includes(key)) {
                                filteredValues.add(value)
                            }
                        }
                    }
                }

                for (const key in queryObject.instance.dataValues) {
                    let value = queryObject.instance.dataValues[key]?.toString();

                    if (value) {
                        if (sensitivedValues.has(value)) {
                            boundedArgs.push([key, privaci(value)]);
                        } else if (filteredValues.has(value)) {
                            boundedArgs.push([key, 'FILTERED']);
                        } else if (key.includes("Id") || key.includes("_id") || key == "id") {
                            boundedArgs.push([key, value]);
                        }
                    }
                }

                logger.debug(boundedArgs);
            }
        };

        const config = {
            ...credentials,
            logging: logging,
            define: {
                underscored: true,
                freezeTableName: true,
            },
            models: [__dirname + "/../app/models/**"],
        };

        let connection;
        if (config.use_env_variable) {
            connection = super(process.env[config.use_env_variable], config);
        } else {
            connection = super(
                config.database,
                config.username,
                config.password,
                config
            );
        }

        return connection;
    }
}
