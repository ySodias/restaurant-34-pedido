"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePresenter = void 0;
const date_fns_1 = require("date-fns");
class BasePresenter {
    static formatEntity(entity) {
        const formattedEntity = Object.assign({}, entity);
        formattedEntity.createdAt = (0, date_fns_1.format)(new Date(entity.createdAt), "dd/MM/yyyy HH:mm:ss");
        formattedEntity.updatedAt = (0, date_fns_1.format)(new Date(entity.updatedAt), "dd/MM/yyyy HH:mm:ss");
        return formattedEntity;
    }
    static presenterEntityParaRespostaHttp(message, success, entity) {
        if (success) {
            return {
                success: true,
                message: message,
                data: BasePresenter.formatEntity(entity)
            };
        }
        else {
            return {
                success: false,
                message: message
            };
        }
    }
    static presenterEntitysParaRespostaHttp(message, success, entities) {
        if (success) {
            let data;
            if (Array.isArray(entities)) {
                data = entities.map(entity => BasePresenter.formatEntity(entity));
            }
            else {
                data = [];
            }
            return {
                success: true,
                message: message,
                data: data
            };
        }
        else {
            return {
                success: false,
                message: message
            };
        }
    }
    presenterMensagemParaRespostaHttp(message, sucess) {
        return {
            sucess: sucess,
            message: message,
        };
    }
}
exports.BasePresenter = BasePresenter;
