declare namespace Components {
    namespace Schemas {
        /**
         * Данные для создания Transaction
         */
        export interface TransactionCreateDto {
            /**
             * Доход. В копейках
             * example:
             * 100
             */
            income?: number;
            /**
             * Расход. В копейках
             * example:
             * 100
             */
            expense?: number;
            /**
             * Дата создания. Можно изменять, т.е. "создавать задним числом"
             * example:
             * 2026-03-04T20:28:20.620Z
             */
            createdAt?: string;
            /**
             * Комментарий к транзакции
             * example:
             */
            description?: string | null;
            /**
             * Название
             * example:
             * Пересвет приборки
             */
            name: string;
        }
        /**
         * Стандартная DTO Transaction
         */
        export interface TransactionDto {
            /**
             * ID
             * example:
             * 1
             */
            id: number;
            /**
             * Название
             * example:
             * Пересвет приборки
             */
            name: string;
            /**
             * Доход. В копейках
             * example:
             * 100
             */
            income: number;
            /**
             * Расход. В копейках
             * example:
             * 100
             */
            expense: number;
            /**
             * Дата создания. Можно изменять, т.е. "создавать задним числом"
             * example:
             * 2026-03-04T20:28:20.620Z
             */
            createdAt: string;
            /**
             * Комментарий к транзакции
             * example:
             */
            description: string | null;
        }
        /**
         * Данные для редактирования Transaction
         */
        export interface TransactionUpdateDto {
            /**
             * Название
             * example:
             * Пересвет приборки
             */
            name: string;
            /**
             * Доход. В копейках
             * example:
             * 100
             */
            income: number;
            /**
             * Расход. В копейках
             * example:
             * 100
             */
            expense: number;
            /**
             * Дата создания. Можно изменять, т.е. "создавать задним числом"
             * example:
             * 2026-03-04T20:28:20.620Z
             */
            createdAt: string;
            /**
             * Комментарий к транзакции
             * example:
             */
            description?: string | null;
        }
    }
}
declare namespace Paths {
    namespace TransactionControllerCreate {
        export type RequestBody = /* Данные для создания Transaction */ Components.Schemas.TransactionCreateDto;
        namespace Responses {
            export type $201 = /* Стандартная DTO Transaction */ Components.Schemas.TransactionDto;
        }
    }
    namespace TransactionControllerFindAll {
        namespace Responses {
            export type $200 = /* Стандартная DTO Transaction */ Components.Schemas.TransactionDto[];
        }
    }
    namespace TransactionControllerFindOne {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* Стандартная DTO Transaction */ Components.Schemas.TransactionDto;
        }
    }
    namespace TransactionControllerRemove {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace TransactionControllerUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = /* Данные для редактирования Transaction */ Components.Schemas.TransactionUpdateDto;
        namespace Responses {
            export type $200 = /* Стандартная DTO Transaction */ Components.Schemas.TransactionDto;
        }
    }
}
