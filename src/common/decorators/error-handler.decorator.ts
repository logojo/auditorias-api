import { Inject, Logger } from "@nestjs/common";
import { CommonHelpers } from "../helpers/helpers";

export function HandleErrors () {

    const handleError = Inject( CommonHelpers );
    const injectLogger = Inject( Logger );

    return (
        target: any,
        propertyKey: string,
        propertyDescriptor : PropertyDescriptor
    ) => {
        handleError(target, 'handleError');
        injectLogger(target, 'logger');
        const orinalMethod = propertyDescriptor.value;

        propertyDescriptor.value = async function(...args: any[]) {
            try {
                return await orinalMethod.apply(this, args)
            } catch (error) {
                const errors : CommonHelpers = this.handleError;
                const logger : Logger = this.logger;

                logger.error(`${propertyKey}: ${error}`)
                errors.handleExceptions( error )                
            }
            
        }
        return propertyDescriptor;
    }
}