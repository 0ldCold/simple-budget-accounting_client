declare namespace Components {
    namespace Schemas {
        export interface FieldErrors {
            [name: string]: {
                value?: any;
                message: string;
            };
        }
        /**
         * Данные для создания или редактирования Transaction
         */
        export interface TransactionCreationParams {
            /**
             * example:
             * Яблоко
             */
            name: string;
            description?: string;
            /**
             * Доход. В копейках
             * example:
             * 100
             */
            income?: number; // int32
            /**
             * Расход. В копейках
             * example:
             * 100
             */
            expense?: number; // int32
            /**
             * example:
             * 2026-03-04T20:28:20.620Z
             */
            createdAt?: string;
        }
        /**
         * Стандартная DTO Transaction
         */
        export interface TransactionDTO {
            /**
             * example:
             * 1
             */
            id: number; // int32
            /**
             * example:
             * Яблоко
             */
            name: string;
            /**
             * Доход. В копейках
             * example:
             * 100
             */
            income: number; // int32
            /**
             * Расход. В копейках
             * example:
             * 100
             */
            expense: number; // int32
            /**
             * example:
             * 2026-03-04T20:28:20.620Z
             */
            createdAt: string;
            description?: string | null;
        }
        export interface ValidateErrorJSON {
            message: "Validation failed";
            details: FieldErrors;
        }
    }
}
declare namespace Paths {
    namespace CreateTransaction {
        /**
         * Данные для нового Transaction
         */
        export type RequestBody = /* Данные для создания или редактирования Transaction */ Components.Schemas.TransactionCreationParams;
        namespace Responses {
            export type $201 = /* Стандартная DTO Transaction */ Components.Schemas.TransactionDTO;
            export type $422 = Components.Schemas.ValidateErrorJSON;
        }
    }
    namespace ListTransaction {
        namespace Responses {
            export type $200 = /* Стандартная DTO Transaction */ Components.Schemas.TransactionDTO[];
        }
    }
}
